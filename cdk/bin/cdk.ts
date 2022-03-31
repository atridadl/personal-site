#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppStack } from "../lib/app";

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

const appStack = new AppStack(app, `${ stage }-AppStack`, {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  stage,
  domain,
});
