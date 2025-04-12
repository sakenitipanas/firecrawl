const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const filePath = __dirname + '/data.txt';
const BASE_URL = 'http://localhost:3002'; //Firecrawl server
const API_URL = `${BASE_URL}/v0/scrape`;   // scrape endpoint

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

const input = process.argv[2];

const sendCrawlRequest = async (input)=>{
   try {
         const response = await axios.post(API_URL, { url: input });
         
         console.log(response.data.data.markdown);
         
         fs.appendFileSync(filePath,JSON.stringify(response.data.data.markdown));
         
   } catch (error) {
         console.error('Error calling the API:', error.response ? error.response.data : error.message);
   } finally {
         rl.close();
   }
}

if (input) {
   if (!input.startsWith('http')) {
      console.log('Invalid URL. Please enter a valid URL.');
  } else {
      sendCrawlRequest(input);
  }
} else {
   rl.question('Enter the website URL to crawl: ', (input) => {
       if (!input.startsWith('http')) {
           console.log('Invalid URL. Please enter a valid URL.');
           rl.close();
       } else {
           sendCrawlRequest(input);
       }
   });
}