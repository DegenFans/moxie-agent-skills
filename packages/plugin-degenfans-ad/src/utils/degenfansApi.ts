

export interface DegenFansResponse<T>{
    status:number,
    message:string,
    data?:T
}

export interface FeaturedCoin{
    url:string,
    name:string,
    image:string
}

export interface AdCampaign{
  id:string,
  text:string,
  locked:boolean,
  minamount:number,
  name:string,
  symbol:string,
  moxieId:string,

}


const degenfansApiBaseUrl="https://degenfans.xyz/servlet/rest-services/main/af/v1";


export function getAdvertisementsCampaigns(): Promise<DegenFansResponse<AdCampaign[]>> {
  // For now, consider the data is stored on a static `users.json` file
  return fetch(degenfansApiBaseUrl+'/moxie-ai-ads/')
    // the JSON body is taken from the response
    .then(res => res.json())
    .then(res => {
      // The response has an `any` type, so we need to cast
      // it to the `User` type, and return it from the promise
      return res as DegenFansResponse<AdCampaign[]>
    })
}



export function getFeaturedCoin(): Promise<DegenFansResponse<FeaturedCoin>> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch(degenfansApiBaseUrl+'/moxie-ai-ad/')
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as DegenFansResponse<FeaturedCoin>
      })
  }

  export function getFeaturedCoins(): Promise<DegenFansResponse<FeaturedCoin[]>> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch(degenfansApiBaseUrl+'/moxie-ai-ad/?result=l')
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as DegenFansResponse<FeaturedCoin[]>
      })
  }

  export function addFeaturedCoin(moxieId:string, wallets:string[]): Promise<DegenFansResponse<FeaturedCoin>> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch(degenfansApiBaseUrl+'/moxie-ai-ad/?token='+process.env.DEGENFANS_API, {
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
        return res as DegenFansResponse<FeaturedCoin>
      })
  }