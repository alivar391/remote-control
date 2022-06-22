import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";

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
    console.log(data.toString());
    const packet = data.toString();

    // switch (packet) {
    //   case "hello from client":
    //     console.log(packet.content);
    //     break;
    //   default: {
    //     console.log(packet.content);
    //   }
    // }
  });
});
