import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { tags } from "./global";

const stack = pulumi.getStack(); // returns the stack name (development)

// Create an AWS resource (S3 Bucket)
const mybucket = new aws.s3.Bucket(`${stack}-nymanio-my-bucket`, {
  website: {
    indexDocument: "index.html",
  },
  tags, // Added tags
});

// Upload a cool website here
const coolWebsite = new aws.s3.BucketObject(`${stack}-cool-website`, {
  bucket: mybucket,
  acl: "public-read",
  key: "index.html",
  contentType: "text/html; charset=UTF-8",
  // This could easily be a file location or even a folder
  content: `
              <html>
                <h1>This is my cool website running in ${stack}</h1>
              </html>
          `,
  tags, // Added tags
});

// Setup resource groups
const envResourceGroup = new aws.resourcegroups.Group(`${stack}-env-rg`, {
  resourceQuery: {
    query: JSON.stringify({
      ResourceTypeFilters: ["AWS::AllSupported"],
      TagFilters: [
        {
          Key: "stack",
          Values: [tags.stack],
        },
      ],
    }),
  },
});

// This resource group contains ALL our resources - only update this when we roll to production
if (stack == "production") {
  const projectResourceGroup = new aws.resourcegroups.Group(`project-rg`, {
    resourceQuery: {
      query: JSON.stringify({
        ResourceTypeFilters: ["AWS::AllSupported"],
        TagFilters: [
          {
            Key: "project",
            Values: [tags.project],
          },
        ],
      }),
    },
  });
}

// Export name - this becomes available to other projects
export const bucketName = mybucket.bucket;
export const websiteUrl = pulumi.interpolate`http://${mybucket.bucket}.${mybucket.websiteDomain}`;
