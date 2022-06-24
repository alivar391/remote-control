"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
const robotjs_1 = __importDefault(require("robotjs"));
const ws_1 = require("ws");
const drawCircle_1 = require("./drawCircle");
const drawRectangle_1 = require("./drawRectangle");
const getCapture_1 = require("./getCapture");
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
const server = new ws_1.WebSocketServer({ port: 8080 });
server.on("connection", (socket) => {
    socket.send(JSON.stringify({
        type: "hello from server",
        content: [1, "2", "hello from server"],
    }));
    socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [command, step, length] = data.toString().split(" ");
            const mouse = robotjs_1.default.getMousePos();
            switch (command) {
                case "mouse_left":
                    console.log(command, +step);
                    robotjs_1.default.moveMouse(mouse.x - Number(step), mouse.y);
                    break;
                case "mouse_right":
                    console.log(command, +step);
                    robotjs_1.default.moveMouse(mouse.x + Number(step), mouse.y);
                    break;
                case "mouse_up":
                    console.log(command, +step);
                    robotjs_1.default.moveMouse(mouse.x, mouse.y - Number(step));
                    break;
                case "mouse_down":
                    console.log(command, +step);
                    robotjs_1.default.moveMouse(mouse.x, mouse.y + Number(step));
                    break;
                case "mouse_position":
                    console.log(command);
                    socket.send(`mouse_position ${mouse.x},${mouse.y}`);
                    break;
                case "draw_circle":
                    console.log(command, +step);
                    (0, drawCircle_1.drawCircle)(+step);
                    break;
                case "draw_rectangle":
                    console.log(command, +step, +length);
                    (0, drawRectangle_1.drawRectangle)(+step, +length);
                    break;
                case "draw_square":
                    console.log(command, +step);
                    (0, drawRectangle_1.drawRectangle)(+step, +step);
                    break;
                case "prnt_scrn":
                    console.log(command);
                    const capture = yield (0, getCapture_1.getCapture)();
                    socket.send(capture.data);
                    break;
                default: {
                    console.log(command, " ", step);
                }
            }
        }
        catch (_a) {
            socket.send(`internal_server_error`);
        }
    }));
});
server.on("close", (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connection close");
}));
