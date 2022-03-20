import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
interface SPAStackProps extends StackProps {
    domain: string;
    hostedZoneID: string;
}
export declare class SPAStack extends Stack {
    constructor(scope: Construct, id: string, props: SPAStackProps);
}
export {};
