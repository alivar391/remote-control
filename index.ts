import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { createWebSocketStream, WebSocketServer } from "ws";
import { drawCircle } from "./drawCircle";
import { drawRectangle } from "./drawRectangle";
import { getCapture } from "./getCapture";
import { Duplex } from "stream";
import { printSuccessMessage } from "./printSuccessMessage";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 8080;

const server = new WebSocketServer({ port: WS_PORT });

server.on("connection", (socket) => {
  const duplex: Duplex = createWebSocketStream(socket, {
    encoding: "utf8",
    decodeStrings: false,
  });

  console.log(`connection_on_port:_${WS_PORT}`);
  duplex.write(`connection_on_port:_${WS_PORT}`);

  duplex.on("data", async (chunk: Buffer) => {
    try {
      const [command, step, length] = chunk.toString().split(" ");
      const mouse = robot.getMousePos();

      switch (command) {
        case "mouse_left":
          console.log(`Received: ${command}`, +step);
          duplex.write(command);
          robot.moveMouse(mouse.x - Number(step), mouse.y);
          printSuccessMessage(command);
          break;
        case "mouse_right":
          console.log(`Received: ${command}`, +step);
          duplex.write(command);
          robot.moveMouse(mouse.x + Number(step), mouse.y);
          printSuccessMessage(command);
          break;
        case "mouse_up":
          console.log(`Received: ${command}`, +step);
          duplex.write(command);
          robot.moveMouse(mouse.x, mouse.y - Number(step));
          printSuccessMessage(command);
          break;
        case "mouse_down":
          console.log(`Received: ${command}`, +step);
          duplex.write(command);
          robot.moveMouse(mouse.x, mouse.y + Number(step));
          printSuccessMessage(command);
          break;
        case "mouse_position":
          console.log(`Received: ${command}`);
          duplex.write(`mouse_position ${mouse.x},${mouse.y}`);
          printSuccessMessage(command);
          break;
        case "draw_circle":
          console.log(`Received: ${command} radius`, +step);
          duplex.write(command);
          drawCircle(+step);
          printSuccessMessage(command);
          break;
        case "draw_rectangle":
          console.log(`Received: ${command} width:`, +step, `height:`, +length);
          duplex.write(command);
          drawRectangle(+step, +length);
          printSuccessMessage(command);
          break;
        case "draw_square":
          console.log(`Received: ${command} side:`, +step);
          duplex.write(command);
          drawRectangle(+step, +step);
          printSuccessMessage(command);
          break;
        case "prnt_scrn":
          console.log(`Received: ${command}`);
          const capture = await getCapture();
          duplex.write(capture.data);
          printSuccessMessage(command);
          break;
        default: {
          console.log(`Unknown command: ${command}`);
        }
      }
    } catch {
      console.log(`command complete with error`);
      duplex.write(`internal_server_error`);
    }
  });

  socket.on("close", () => {
    console.log("Websocket close successfully");
  });

  process.on("SIGINT", () => {
    duplex.write("connection_close_on_server_side");
    socket.close();
    console.log("Websocket close successfully");
    process.exit(0);
  });
});
