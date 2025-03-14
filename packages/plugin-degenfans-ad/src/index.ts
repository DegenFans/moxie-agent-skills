import type { Plugin } from "@moxie-protocol/core";
import { addFeatureCoinAction } from "./actions/addFeaturedTokenAction";
import { showAdCampaignsAction } from "./actions/showAdCampaigns";
import { showFaeaturedTokenAction } from "./actions/showFeaturedTokenAction";
import { greetingsDegenFans } from "./actions/greetingDegenfans";

const degenfansAdPlugin: Plugin = {
    name: "DegenFans AD",
    description: "Advertisment for your creator coin",
    actions: [addFeatureCoinAction, showAdCampaignsAction,showFaeaturedTokenAction,greetingsDegenFans],
    providers: [],
    evaluators: [],
    services: [],
    clients: [],
};

export default degenfansAdPlugin;
