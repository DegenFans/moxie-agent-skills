import { FarcasterMetadata, MoxieUser, TwitterMetadata } from "@moxie-protocol/moxie-agent-lib/src";
import { callGetDfApi, callPostDfApi, DegenFansResponse } from "./degenfansUtil";



export interface YoinkLeaderboard{
  rank:number,
  name:string,
  url:string,
  seconds:number,
  cnt:number,
}


export async function getMoxieYoinkLeaderboard(): Promise<DegenFansResponse<YoinkLeaderboard[] | null>> {
  return callGetDfApi<YoinkLeaderboard[]>('/moxie-ai-ad-get-yoink-leaderboard/?token=' + process.env.DEGENFANS_API);
}

export async function yoinkTheFlag(subjectAddress:string, wallets:string[]): Promise<DegenFansResponse<YoinkLeaderboard | null>> {
  return callPostDfApi<YoinkLeaderboard>('/moxie-ai-ad-get-yoink-leaderboard/?token=' + process.env.DEGENFANS_API,JSON.stringify({subjectAddress, wallets}));
}

 