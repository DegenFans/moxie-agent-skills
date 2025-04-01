import { FarcasterMetadata, MoxieUser, TwitterMetadata } from "@moxie-protocol/moxie-agent-lib/src";

export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600); // Calculate hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
    const remainingSeconds = seconds % 60; // Calculate remaining seconds
  
    // Format the time as HH:MM:SS
    const formattedTime = [
      hours > 0 ? String(hours).padStart(2, '0') : null, // Add hours if greater than 0
      String(minutes).padStart(2, '0'), // Format minutes
      String(remainingSeconds).padStart(2, '0'), // Format seconds
    ]
      .filter(Boolean) // Remove null values (for hours if they are 0)
      .join(':'); // Join with colon separator
  
    return formattedTime;
  }


  enum Method {
    GET = "GET",
    POST = "POST",
  }
  export interface DegenFansResponse<T>{
    status:number,
    message:string,
    data?:T
}

  const degenfansApiBaseUrl = "https://degenfans.xyz/servlet/rest-services/main/af/v1";
  
  async function callDfApi<T>(url: string, method: Method, body: string) {
    try {
      // Make the HTTP request using fetch
      let headers;
      if (Method.POST === method) {
        headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
      } else {
        headers = {
          'Accept': 'application/json'
        };
      }
      const response = await fetch(degenfansApiBaseUrl + url, {
        method,
        headers,
        body
      });
  
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const apiData = await response.json() as DegenFansResponse<T>;
  
      return apiData;  // Return the parsed data
    } catch (error) {
  
      if (error instanceof Error) {
        return { message: error.message, status: 500 } as DegenFansResponse<null>;
      } else {
        return { message: 'Unexpected error:', status: 500 } as DegenFansResponse<null>;
      }
      // You can also return null or a default value in case of an error
  
    }
  }
  export function callPostDfApi<T>(url: string, body: string) {
    return callDfApi<T>(url, Method.POST, body);
  }
  export function callGetDfApi<T>(url: string) {
    return callDfApi<T>(url, Method.GET, null);
  }
  
  export function getHelpText(): string {
    let tbl = "";
   
    return tbl
  }
  export function getHelpTextUserNotFound():string{
    let tbl="";
    tbl += "I was not able to find your AlfaFrens profile. To get a personalized staking recommendations, make sure that you have:";
    tbl += "\n  * AlfaFrens profile connected to your Farcaster and X account";
    tbl += "\n  * Conected Farcaster Account from your Moxie profile";
    tbl += "\n  * Conected X Account from your Moxie profile";
    tbl += "\n";
    tbl += "\nIf you don't have an account on AlfaFrens, you can create one on:";
    tbl += "\n[https://alfafrens.com](https://alfafrens.com)";
    tbl += "\n\nElse, you can get in touch with @[degenfans|M155] to resolve the issue.\n";
    return tbl;
  }
  
  export interface UserData {
    fid: string, xhandle: string
  }
  
  export function getUserData(moxieUserInfo: MoxieUser): UserData {
    let fid: string = null;
    let xhandle: string = null;
    const fcId = moxieUserInfo.identities.find(o => o.type === 'FARCASTER');
    if (fcId) {
      fid = (fcId.metadata as FarcasterMetadata).profileTokenId;
    }
  
    const xId = moxieUserInfo.identities.find(o => o.type === 'TWITTER');
    if (xId) {
      xhandle = (fcId.metadata as TwitterMetadata).username;
    }
  
    return { fid, xhandle };
  }