# firecrawl
Building FireCrawl API 

#use this curl to hit the API
curl --location 'http://localhost:3002/v0/scrape' \
--header 'Content-Type: application/json' \
--data '{
      "url": "https://reqres.in/"
    }'
