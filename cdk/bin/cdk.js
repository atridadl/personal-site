#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const cdk_stack_1 = require("../lib/cdk-stack");
const app = new cdk.App();
new cdk_stack_1.CdkStack(app, 'PersonalSiteStack', {
    env: {
        region: "ca-central-1",
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsZ0RBQTRDO0FBRTVDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQUksb0JBQVEsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLEVBQUU7SUFDckMsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLGNBQWM7S0FDdkI7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2RrU3RhY2sgfSBmcm9tICcuLi9saWIvY2RrLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcblxubmV3IENka1N0YWNrKGFwcCwgJ1BlcnNvbmFsU2l0ZVN0YWNrJywge1xuICBlbnY6IHtcbiAgICByZWdpb246IFwiY2EtY2VudHJhbC0xXCIsXG4gIH1cbn0pOyJdfQ==