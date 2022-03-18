#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const site_1 = require("../lib/site");
const app = new cdk.App();
new site_1.SiteStack(app, 'SiteStack', {
    env: {
        region: "ca-central-1",
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsc0NBQXdDO0FBRXhDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQUksZ0JBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFO0lBQzlCLEdBQUcsRUFBRTtRQUNILE1BQU0sRUFBRSxjQUFjO0tBQ3ZCO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFNpdGVTdGFjayB9IGZyb20gJy4uL2xpYi9zaXRlJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcblxubmV3IFNpdGVTdGFjayhhcHAsICdTaXRlU3RhY2snLCB7XG4gIGVudjoge1xuICAgIHJlZ2lvbjogXCJjYS1jZW50cmFsLTFcIixcbiAgfSxcbn0pO1xuIl19