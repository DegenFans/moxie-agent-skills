import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

import { DegenFansResponse, FeaturedCoin, getFeaturedCoin } from "../utils/degenfansApi";
import { MoxieUser ,MoxieWallet} from "@moxie-protocol/moxie-agent-lib";


export const showFaeaturedTokenAction: Action = {
    name: "SHOW_FEATURED_COIN",
    similes: [
        "CHECK_FEATURED_COIN",
        "GET_FEATURED_COIN",
        "VIEW_FEATURED_COIN",
    ],
    description: "Check the current featured moxie coin",
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
     

        let featuredToken:DegenFansResponse<FeaturedCoin>=await getFeaturedCoin();
        if(featuredToken.status==200){
        await callback?.({
            text: `The current featured Token is: ${featuredToken.data.name}`,
        });
        }else 
        { 
        await callback?.({
        text: `no featured coin found`,
        });
    }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can you show me the featured coin?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "The current featured Token is: DegenFans",
                    action: "SHOW_FEATURED_COIN",
                },
            },
        ],
    ] as ActionExample[][],
};
