import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

import { AdCampaign, DegenFansResponse, FeaturedCoin, getAdvertisementsCampaigns, getFeaturedCoin } from "../utils/degenfansApi";
import { MoxieUser ,MoxieWallet} from "@moxie-protocol/moxie-agent-lib";


export const showAdCampaignsAction: Action = {
    name: "SHOW_MOXIE_AD_CAMPAIGN",
    similes: [
        "CHECK_MOXIE_AD_CAMPAIGN",
        "GET_MOXIE_AD_CAMPAIGN",
        "VIEW_MOXIE_AD_CAMPAIGN",
    ],
    description: "Check the available moxie ad campaigns",
    suppressInitialMessage: true,
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
       const moxieUserInfo: MoxieUser = state.moxieUserInfo as MoxieUser;
       const wallets:MoxieWallet[]=   moxieUserInfo.wallets;
     

        let featuredToken:DegenFansResponse<AdCampaign[]>=await getAdvertisementsCampaigns();
        if(featuredToken.status==200){
            let tblCampaings:string='<br>';
            tblCampaings+="|Creator Coin|min Amount|locked||info|\n";
            tblCampaings+="|:--------|----:|------|:------------------|\n";
            if(featuredToken.data){
                featuredToken.data.forEach(e=>{
                    tblCampaings+="|@["+e.name+"|"+e.moxieId+"]|"+e.minamount+"|"+e.locked+"|"+e.text+"|\n";
                });
            }
        await callback?.({
            text: 'available Advertisement Campaings:'+tblCampaings,
        });
        }else 
        { 
        await callback?.({
        text: featuredToken.message,
        });
    }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "show me the available moxie ad campaigns",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "available Advertisement Campaings:<br>"
                    +"|Creator Coin|min Amount|locked||info|\n"
                    +"|:--------|----:|------|:------------------|\n"
                    +"|@[degenfans|M155]|10|false|get added to the DegenFans Moxie Portal|\n",
                    action: "SHOW_MOXIE_AD_CAMPAIGN",
                },
            },
        ],
    ] as ActionExample[][],
};
