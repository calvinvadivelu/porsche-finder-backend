import fetchKijiji from "./src/services/kijiji/fetch";

import { Ad } from './types'
const ads:Ad[] = [];


async function getAds(){
    const kijijiAds = await fetchKijiji();
    ads.push(...kijijiAds);
    console.log('ads', ads)
}

getAds();