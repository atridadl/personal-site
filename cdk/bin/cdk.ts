#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SiteStack } from '../lib/site';

const app = new cdk.App();

new SiteStack(app, 'PersonalSiteStack', {
  env: {
    region: "ca-central-1",
  }
});
