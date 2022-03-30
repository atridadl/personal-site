#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SPAStack } from "../lib/spa";
import { APIStack } from "../lib/api";
import { CFAStack } from "../lib/cloudfront";

const app = new cdk.App();

// params
const stage = app.node.tryGetContext("stage");
const domain = app.node.tryGetContext("domain");

if (!stage) {
	throw new Error(
		"context must include stage argument, eg. yarn deploy * -c ... stage=dev"
	);
}

if (!domain) {
	throw new Error(
		"context must include domain argument, eg. yarn deploy * -c ... domain=nice.caulk"
	);
}

const spaStack = new SPAStack(app, `${ stage }-SPAStack`, {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  stage,
  domain,
});

const apiStack = new APIStack(app, `${ stage }-APIStack`, {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  stage
});

const cfStack = new CFAStack(app, `${ stage }-CFStack`, {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  stage,
  domain,
  bucket: spaStack.bucket
});
