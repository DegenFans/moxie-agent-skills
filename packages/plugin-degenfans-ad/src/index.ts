import type { Plugin } from "@moxie-protocol/core";
import { addFeatureCoinAction } from "./actions/addFeaturedTokenAction";
import { showAdCampaignsAction } from "./actions/showAdCampaigns";
import { showFaeaturedTokenAction } from "./actions/showFeaturedTokenAction";

const degenfansAdPlugin: Plugin = {
    name: "DegenFans AD",
    description: "Advertisment for your creator coin",
    actions: [addFeatureCoinAction, showAdCampaignsAction,showFaeaturedTokenAction],
    providers: [],
    evaluators: [],
    services: [],
    clients: [],
};

export default degenfansAdPlugin;
