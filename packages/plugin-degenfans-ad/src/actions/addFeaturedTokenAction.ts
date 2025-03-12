import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

import { addFeaturedCoin, DegenFansResponse, FeaturedCoin } from "../utils/degenfansApi";
import { MoxieUser ,MoxieWallet} from "@moxie-protocol/moxie-lib";


export const addFeatureCoinAction: Action = {
    name: "ADD_FEATURED_COIN",
    similes: [
        "SAVE_FEATURED_COIN",
    ],
    description: "add me to the list of featured coins",
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
       const jaWallets:string[]=[];
       wallets.forEach(element => {
        jaWallets.push(element.walletAddress);
       });
     

        let featuredToken:DegenFansResponse<FeaturedCoin>=await addFeaturedCoin(moxieUserInfo.id,jaWallets);
        if(featuredToken.status==200){
        await callback?.({
            text: featuredToken.message,
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
                    text: "add me as a featured coin",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "advertisement is added and frame user go notfied (123)",
                    action: "ADD_FEATURED_COIN",
                },
            },
        ],
    ] as ActionExample[][],
};
