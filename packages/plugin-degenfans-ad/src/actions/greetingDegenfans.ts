import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    type ActionExample,
} from "@moxie-protocol/core";

export const greetingsDegenFans: Action = {
    name: "SHOW_DEGENFANS_GREETINGS",
    similes: [
        "CHECK_DEGENFANS_GREETINGS",
        "GET_DEGENFANS_GREETINGS",
        "VIEW_DEGENFANS_GREETINGS",
    ],
    description: "greetings from degenfans",
    suppressInitialMessage: true,
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
      
        await callback?.({
            text: `Greetings from @[degenfans|M155] ❤️Ⓜ️`,
        });
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "is degenfans there?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Greetings from @[degenfans|M155] ❤️Ⓜ️",
                    action: "SHOW_DEGENFANS_GREETINGS",
                },
            },
        ],
    ] as ActionExample[][],
};
