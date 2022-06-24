import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { createWebSocketStream, WebSocketServer } from "ws";
import { drawCircle } from "./drawCircle";
import { drawRectangle } from "./drawRectangle";
import { getCapture } from "./getCapture";
import { Duplex } from "stream";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 8080;

const server = new WebSocketServer({ port: WS_PORT });

server.on("connection", (socket) => {
  socket.send(`connection_on_prot: ${WS_PORT}`);

  const duplex: Duplex = createWebSocketStream(socket, {
    encoding: "utf8",
    decodeStrings: false,
  });

  socket.on("message", async (data: string) => {
    try {
      const [command, step, length] = data.toString().split(" ");
      const mouse = robot.getMousePos();

      switch (command) {
        case "mouse_left":
          console.log(`Received: ${command}`, +step);
          socket.send(command);
          robot.moveMouse(mouse.x - Number(step), mouse.y);
          console.log("command completed successfully");
          break;
        case "mouse_right":
          console.log(`Received: ${command}`, +step);
          socket.send(command);
          robot.moveMouse(mouse.x + Number(step), mouse.y);
          console.log("command completed successfully");
          break;
        case "mouse_up":
          console.log(`Received: ${command}`, +step);
          socket.send(command);
          robot.moveMouse(mouse.x, mouse.y - Number(step));
          console.log("command completed successfully");
          break;
        case "mouse_down":
          console.log(`Received: ${command}`, +step);
          socket.send(command);
          robot.moveMouse(mouse.x, mouse.y + Number(step));
          console.log("command completed successfully");
          break;
        case "mouse_position":
          console.log(`Received: ${command}`);
          console.log("command completed successfully");

          duplex.write(`mouse_position ${mouse.x},${mouse.y}`, (err) => {
            if (err) {
              console.log(err);
            }
          });

          break;
        case "draw_circle":
          console.log(`Received: ${command} radius`, +step);
          socket.send(command);
          drawCircle(+step);
          console.log("command completed successfully");
          break;
        case "draw_rectangle":
          console.log(`Received: ${command} width:`, +step, `height:`, +length);
          socket.send(command);
          drawRectangle(+step, +length);
          console.log("command completed successfully");
          break;
        case "draw_square":
          console.log(`Received: ${command} side:`, +step);
          socket.send(command);
          drawRectangle(+step, +step);
          console.log("command completed successfully");
          break;
        case "prnt_scrn":
          console.log(`Received: ${command}`);
          const capture = await getCapture();
          duplex.write(capture.data, (err) => {
            if (err) {
              console.log(err);
            }
          });
          console.log("command completed successfully");
          break;
        default: {
          console.log(command, " ", step);
        }
      }
    } catch {
      socket.send(`internal_server_error`);
    }
  });
});
