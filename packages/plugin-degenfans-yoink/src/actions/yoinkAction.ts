import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

import {  YoinkLeaderboard, yoinkTheFlag } from "../utils/degefansApi";
import { MoxieUser } from "@moxie-protocol/moxie-agent-lib/src/services/types";
import { ftaService } from "@moxie-protocol/moxie-agent-lib/src";

export const yoinkAction: Action = {
    name: "YOINK_THE_FLAG",
    similes: [
        "GRAB_THE_FLAG",
        "PICK_THE_FLAG",
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
        try {
            const { id, wallets, } = state.moxieUserInfo as MoxieUser;
            const fta = await ftaService.getUserFtaData(id);
            if (!fta) {
                await callback?.({
                    text: "only user with a creator coin can join the game!\nbe smart, generate a coin!",
                });
                return;
            }
            const jaWallets: string[] = [];
            wallets.forEach(element => {
                jaWallets.push(element.walletAddress);
            });

            let resp = await yoinkTheFlag(fta.subjectAddress, jaWallets);
            if (resp.status == 200) {

                await callback?.({
                    text: resp.message,
                });
            } else {
                await callback?.({
                    text: "degenfans server is not reachable, try again later!",
                });

            }
        } catch (err) {
            await callback?.({
                text: "error occured -> try again and if it still not work, please contact @[degenfans|M155]",
            });
        }
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
