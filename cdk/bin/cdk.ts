#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SiteStack } from '../lib/site';

const app = new cdk.App();

const region = app.node.tryGetContext("region");
const domain = app.node.tryGetContext("domain");
const hostedZoneID = app.node.tryGetContext("hostedzoneid");

new SiteStack(app, 'PersonalSiteStack', {
  env: {
    region: region,
  },
  domain,
  hostedZoneID
});
