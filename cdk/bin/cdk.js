#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const site_1 = require("../lib/site");
const app = new cdk.App();
new site_1.SiteStack(app, 'PersonalSiteStack', {
    env: {
        region: "ca-central-1",
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsc0NBQXdDO0FBRXhDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQUksZ0JBQVMsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLEVBQUU7SUFDdEMsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLGNBQWM7S0FDdkI7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgU2l0ZVN0YWNrIH0gZnJvbSAnLi4vbGliL3NpdGUnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5uZXcgU2l0ZVN0YWNrKGFwcCwgJ1BlcnNvbmFsU2l0ZVN0YWNrJywge1xuICBlbnY6IHtcbiAgICByZWdpb246IFwiY2EtY2VudHJhbC0xXCIsXG4gIH1cbn0pOyJdfQ==