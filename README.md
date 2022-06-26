### RSSchool NodeJS _Websocket Remote Control_ task implementation

## Description

This app has backend and frontend parts. To start app you should read installation and usage sections, complete all instructions. After it, to run app you should run one of the scripts, and open browser on localhost:3000. You will see page with some information about available commands. You should check status of connection with websocket server in the left bottom corner of page. If connection is `close` you need to refresh page. If connection is `open` you can check commands.
You can press arrows up, down, left, right and mouse cursor should change its position. When you press `p` key mouse cursor coordinates will be printed. When you press `LCtrl + p` screenshot with size 200px\*200px around the mouse wil be printed on the page.
To check robot drawing you need to open some graph redactor like paint for example. Place your redactor near the browser on your screen. To draw circle, click on browser, then move cursor to pain and press key `c`. Cursor will start drawing circle! Magic!
To draw rectangle or square you need click on page with front (to get control), then move cursor to redactor and press key `r` - for drawing rectangle, `s` - for drawing square.
Have fun!

## Installation

1. Clone/download repo
2. Go to the `develop` branch
3. `npm install`

#### if you have errors in terminal, you should do next:

1. install python 2.7.0 https://www.python.org/downloads/release/python-3105/
2. install visual studio https://docs.microsoft.com/en-us/visualstudio/releases/2022/release-notes
3. in terminal run `npm install -g node-gyp`
4. in terminal run `node-gyp rebuild`
5. in terminal run `npm i`

## Usage

**Development**

`npm run start:dev`

- App served @ `http://localhost:8080` with nodemon

**Production**

`npm run start`

- App served @ `http://localhost:8080` without nodemon

---

**All commands**

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | App served @ `http://localhost:8080` with nodemon    |
| `npm run start` | App served @ `http://localhost:8080` without nodemon |

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
