# Movie Trailer Finder API

## Steps to get the app running

- Clone repo
- run command `npm install`
- Copy .env.example file and rename it to .env
- Enter your themoviedb.org api key in the .env file for the TMBD_API_KEY field
- run command `npm run start`

## How to use app

- You can use postman or curl to test this app

### For cURL

- Enter the following command in terminal/command prompt
- curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"url": "https://content.viaplay.se/pcdash-se/film/focus-2015"}' \
  http://localhost:5000/api/v1/trailers
- You should get a youtube url response
- If you dont get a youtube url response you should get an error message with some details as to what went wrong

### For Postman

- create a new post request - http://localhost:5000/api/v1/trailers
- Enter json body in the options
- { "url": "https://content.viaplay.se/pcdash-se/film/focus-2015" }
- You should get a response like https://www.youtube.com/watch?v=6vY9UPiI4eQ
- If you dont get a youtube url response you should get an error message with some details as to what went wrong

## How to tests

- run command `npm run test`
- If you want to watch test run command `npm run test-watch`

## To do

- Add test cases for all outcomes, right now I have written just two tests.
- Mock axios response so that we are not making unneccesary calls to API while testing
- Add some sort of logger like pino or morgan etc.
