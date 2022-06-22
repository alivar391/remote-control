import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import { drawCircle } from "./drawCircle";
import { drawRectangle } from "./drawRectangle";
import { buffer } from "stream/consumers";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket) => {
  socket.send(
    JSON.stringify({
      type: "hello from server",
      content: [1, "2", "hello from server"],
    }),
  );

  socket.on("message", (data: string) => {
    const [command, step, length] = data.toString().split(" ");
    const mouse = robot.getMousePos();

    switch (command) {
      case "mouse_left":
        console.log(command, +step);
        robot.moveMouse(mouse.x - Number(step), mouse.y);
        break;
      case "mouse_right":
        console.log(command, +step);
        robot.moveMouse(mouse.x + Number(step), mouse.y);
        break;
      case "mouse_up":
        console.log(command, +step);
        robot.moveMouse(mouse.x, mouse.y - Number(step));
        break;
      case "mouse_down":
        console.log(command, +step);
        robot.moveMouse(mouse.x, mouse.y + Number(step));
        break;
      case "mouse_position":
        console.log(command);
        socket.send(`mouse_position ${mouse.x},${mouse.y}`);
        break;
      case "draw_circle":
        console.log(command, +step);
        drawCircle(+step);
        break;
      case "draw_rectangle":
        console.log(command, +step, +length);
        drawRectangle(+step, +length);
        break;
      case "draw_square":
        console.log(command, +step);
        drawRectangle(+step, +step);
        break;
      case "prnt_scrn":
        console.log(command);
        const screenShot = robot.screen.capture(mouse.x, mouse.y, 200, 200);
        const jimp = new Jimp(
          { screenShot, width: 200, height: 200 },
          () => {},
        );
        socket.send(`prnt_scrn ${jimp}`);
        // console.log(jimp.getBase64);
        break;
      default: {
        console.log(command, " ", step);
      }
    }
  });
});
