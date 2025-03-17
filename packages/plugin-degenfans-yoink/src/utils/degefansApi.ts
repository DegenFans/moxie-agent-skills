

export interface DegenFansResponse<T>{
    status:number,
    message:string,
    data?:T
}

export interface YoinkLeaderboard{
  rank:number,
  moxieId:string,
  name:string,
  seconds:number,
  cnt:number,
}

const degenfansApiBaseUrl="https://degenfans.xyz/servlet/rest-services/main/af/v1";


export function getMoxieYoinkLeaderboard(): Promise<DegenFansResponse<YoinkLeaderboard[]>> {
  // For now, consider the data is stored on a static `users.json` file
  return fetch(degenfansApiBaseUrl+'/moxie-ai-ad-get-yoink-leaderboard/')
    // the JSON body is taken from the response
    .then(res => res.json())
    .then(res => {
      // The response has an `any` type, so we need to cast
      // it to the `User` type, and return it from the promise
      return res as DegenFansResponse<YoinkLeaderboard[]>
    })
}
 
  export function yoinkTheFlag(moxieId:string, wallets:string[]): Promise<DegenFansResponse<YoinkLeaderboard>> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch(degenfansApiBaseUrl+'/moxie-ai-ad-add-yoink/?token='+process.env.DEGENFANS_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({moxieId, wallets})
    } )
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as DegenFansResponse<YoinkLeaderboard>
      })
  }