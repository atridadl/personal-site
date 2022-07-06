#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SPAStack } from "../lib/spa";
import { APIStack } from "../lib/api";

const app = new cdk.App();

// params
const stage = app.node.tryGetContext("stage");
const domain = app.node.tryGetContext("domain");
const prefix = app.node.tryGetContext("prefix");

if (!stage) {
	throw new Error(
		"context must include stage argument, eg. yarn deploy * -c ... stage=dev"
	);
}

if (!domain) {
	throw new Error(
		"context must include domain argument, eg. yarn deploy * -c ... domain=cool.site"
	);
}

if (!prefix) {
	throw new Error(
		"context must include prefix argument, eg. yarn deploy * -c ... prefix=coolio"
	);
}

const spaStack = new SPAStack(app, `${ stage }-SPAStack`, {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  stage,
  domain,
  prefix
});

const apiStack = new APIStack(app, `${ stage }-APIStack`, {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  stage,
  domain,
  prefix
});
