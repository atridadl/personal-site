#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SPAStack } from '../lib/spa';
import { APIStack } from '../lib/api'

const app = new cdk.App();

// params
const region = app.node.tryGetContext("region");
const domain = app.node.tryGetContext("domain");
const hostedZoneID = app.node.tryGetContext("hostedZoneID")

new SPAStack(app, 'SPAStack', {
  env: {
    region,
  },
  domain,
  hostedZoneID
});

new APIStack(app, 'APIStack', {
  env: {
    region,
  },
});
