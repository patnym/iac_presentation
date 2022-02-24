import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const mybucket = new aws.s3.Bucket(
  "nymanio-my-bucket",
  {},
  {
    protect: false,
  }
);

// Export name - this becomes available to other projects
export const bucketName = mybucket.bucket;
