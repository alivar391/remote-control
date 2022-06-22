import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import WebSocket from "ws";

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const file_path =
    __dirname + (req.url === "/" ? "/front/index.html" : "/front" + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", () => {
  // send a message to the server
  socket.send(
    JSON.stringify({
      type: "hello from client",
      content: [3, "4", "hello from client"],
    }),
  );
});

// receive a message from the server
socket.addEventListener("message", ({ data }) => {
  console.log(data.toString());
});
