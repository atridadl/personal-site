#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const spa_1 = require("../lib/spa");
const api_1 = require("../lib/api");
const app = new cdk.App();
// params
const region = app.node.tryGetContext("region");
const domain = app.node.tryGetContext("domain");
const hostedZoneID = app.node.tryGetContext("hostedZoneID");
new spa_1.SPAStack(app, 'SPAStack', {
    env: {
        region,
    },
    domain,
    hostedZoneID
});
new api_1.APIStack(app, 'APIStack', {
    env: {
        region,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsb0NBQXNDO0FBQ3RDLG9DQUFxQztBQUVyQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixTQUFTO0FBQ1QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7QUFFM0QsSUFBSSxjQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUM1QixHQUFHLEVBQUU7UUFDSCxNQUFNO0tBQ1A7SUFDRCxNQUFNO0lBQ04sWUFBWTtDQUNiLENBQUMsQ0FBQztBQUVILElBQUksY0FBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDNUIsR0FBRyxFQUFFO1FBQ0gsTUFBTTtLQUNQO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFNQQVN0YWNrIH0gZnJvbSAnLi4vbGliL3NwYSc7XG5pbXBvcnQgeyBBUElTdGFjayB9IGZyb20gJy4uL2xpYi9hcGknXG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbi8vIHBhcmFtc1xuY29uc3QgcmVnaW9uID0gYXBwLm5vZGUudHJ5R2V0Q29udGV4dChcInJlZ2lvblwiKTtcbmNvbnN0IGRvbWFpbiA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoXCJkb21haW5cIik7XG5jb25zdCBob3N0ZWRab25lSUQgPSBhcHAubm9kZS50cnlHZXRDb250ZXh0KFwiaG9zdGVkWm9uZUlEXCIpXG5cbm5ldyBTUEFTdGFjayhhcHAsICdTUEFTdGFjaycsIHtcbiAgZW52OiB7XG4gICAgcmVnaW9uLFxuICB9LFxuICBkb21haW4sXG4gIGhvc3RlZFpvbmVJRFxufSk7XG5cbm5ldyBBUElTdGFjayhhcHAsICdBUElTdGFjaycsIHtcbiAgZW52OiB7XG4gICAgcmVnaW9uLFxuICB9LFxufSk7XG4iXX0=