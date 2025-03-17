import type { Plugin } from "@moxie-protocol/core";

import {  yoinkAction } from "./actions/yoinkAction";

const degenFansYoinkPlugin: Plugin = {
    name: "DegenFans Yoink ",
    description: "yoink the flag",
    actions: [yoinkAction],
    providers: [],
    evaluators: [],
    services: [],
    clients: [],
};

export default degenFansYoinkPlugin;
