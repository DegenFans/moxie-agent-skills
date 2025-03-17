import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

import { DegenFansResponse, YoinkLeaderboard, yoinkTheFlag } from "../utils/degefansApi";
import { MoxieUser } from "@moxie-protocol/moxie-agent-lib/src/services/types";

export const yoinkAction: Action = {
    name: "YOINK_THE_FLAG",
    similes: [
        "GRAB_THE_FLAG",
    ],
    description: "yoink the flag and get shown on the leaderboard!",
    suppressInitialMessage: true,
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const {id,wallets} = state.moxieUserInfo as MoxieUser;

        const jaWallets:string[]=[];
        wallets.forEach(element => {
         jaWallets.push(element.walletAddress);
        });

        let featuredToken:DegenFansResponse<YoinkLeaderboard> = await yoinkTheFlag(id,jaWallets);
        await callback?.({
            text: featuredToken.message,
        });
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "yoink the flag?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "yoinked the flag!",
                    action: "YOINK_THE_FLAG",
                },
            },
        ],
    ] as ActionExample[][],
};
