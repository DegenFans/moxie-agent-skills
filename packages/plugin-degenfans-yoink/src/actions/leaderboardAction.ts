import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

import {  getMoxieYoinkLeaderboard } from "../utils/degefansApi";

import { formatTime } from "../utils/degenfansUtil";

export const showLeaderboardAction: Action = {
    name: "SHOW_YOINK_LEADERBOARD",
    similes: [
        "VIEW_YOINK_LEADERBOARD",
        "DISPLAY_YOINK_LEADERBOARD",
    ],
    description: "show the yoink leaderboard!",
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
             
            let resp = await getMoxieYoinkLeaderboard();
            if (resp.status == 200) {
                let tbl="";
                if(resp.data){
                    tbl+="\n";
                    tbl += "|Rank|Creator Coin|time hold|yoink count|\n";
                    tbl += "|------:|:--------|----:|------:|\n";
                    resp.data.forEach(e => {
                        tbl += "|#" + e.rank + "|[" + e.name + "](" + e.url + ")|" + formatTime(e.seconds) + "|" + e.cnt + "|\n";
                    });
                }
  
                await callback?.({
                    text: resp.message+tbl,
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
                    text: "show the yoink leaderboard",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "yoinked the flag!",
                    action: "SHOW_YOINK_LEADERBOARD",
                },
            },
        ],
    ] as ActionExample[][],
};
