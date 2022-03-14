#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const site_1 = require("../lib/site");
const app = new cdk.App();
new site_1.SiteStack(app, 'PersonalSiteStack', {
    env: {
        region: app.node.tryGetContext("region"),
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsc0NBQXdDO0FBRXhDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQUksZ0JBQVMsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLEVBQUU7SUFDdEMsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztLQUN6QztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBTaXRlU3RhY2sgfSBmcm9tICcuLi9saWIvc2l0ZSc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbm5ldyBTaXRlU3RhY2soYXBwLCAnUGVyc29uYWxTaXRlU3RhY2snLCB7XG4gIGVudjoge1xuICAgIHJlZ2lvbjogYXBwLm5vZGUudHJ5R2V0Q29udGV4dChcInJlZ2lvblwiKSxcbiAgfVxufSk7XG4iXX0=