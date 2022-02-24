import * as pulumi from "@pulumi/pulumi";

const stack = pulumi.getStack();
const project = pulumi.getProject();

const tags = {
  stack,
  project,
};

export { tags };
