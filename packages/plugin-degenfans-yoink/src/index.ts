import type { Plugin } from "@moxie-protocol/core";

import {  yoinkAction } from "./actions/yoinkAction";
import { showLeaderboardAction } from "./actions/leaderboardAction";

const degenFansYoinkPlugin: Plugin = {
    name: "DegenFans Yoink ",
    description: "yoink the flag",
    actions: [yoinkAction,showLeaderboardAction],
    providers: [],
    evaluators: [],
    services: [],
    clients: [],
};

export default degenFansYoinkPlugin;
