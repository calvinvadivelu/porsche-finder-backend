import fetch from 'node-fetch';
import { load } from 'cheerio';

import { Ad } from '../../../types';
import { formatPrices } from '../../helper/formatPrices';

export default async function fetchKijiji() :Promise<Ad[]> {
    const response = await fetch('https://www.kijiji.ca/b-classic-cars/ontario/porsche-944/porsche/k0c122l9004a142?price=1500__', {
        redirect: "follow"
    });
    const body = await response.text();
    const $ = load(body);

    const adContainers = $('.info-container');
    const kijijiAds:Ad[] = [];
    adContainers.each((i, adContainer) => {
        const title:string = $(adContainer).children('.title').text().trim();
        const price:number = formatPrices($(adContainer).children('.price').text());
        const location:string = $(adContainer).children('.location').text().trim().split('     ')[0].trim();
        const date:string = $(adContainer).children('.location').text().trim().split('   ').pop().trim();
        let description:string = $(adContainer).children('.description').text().trim();
        description = description.substring(0, description.indexOf('...'));
        const adUrl:string = `https://www.kijiji.ca${$(adContainer).parent().parent().parent().attr('data-vip-url')}`;
        const imgUrl:string = $(adContainer).parent().parent().parent().find('img').attr('data-src');
        console.log('imgUrl', imgUrl)
        const ad: Ad = {
            title,
            price,
            location,
            date,
            description,
            adUrl,
            imgUrl
        }
        kijijiAds.push(ad);
    });

    console.log('kijijiAds', kijijiAds)
    return kijijiAds;
}
