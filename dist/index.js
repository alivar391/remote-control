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
const printSuccessMessage_1 = require("./printSuccessMessage");
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
const WS_PORT = 8080;
const server = new ws_1.WebSocketServer({ port: WS_PORT });
server.on("connection", (socket) => {
    const duplex = (0, ws_1.createWebSocketStream)(socket, {
        encoding: "utf8",
        decodeStrings: false,
    });
    console.log(`connection_on_port:_${WS_PORT}`);
    duplex.write(`connection_on_port:_${WS_PORT}`);
    duplex.on("data", (chunk) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [command, step, length] = chunk.toString().split(" ");
            const mouse = robotjs_1.default.getMousePos();
            switch (command) {
                case "mouse_left":
                    console.log(`Received: ${command}`, +step);
                    duplex.write(command);
                    robotjs_1.default.moveMouse(mouse.x - Number(step), mouse.y);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "mouse_right":
                    console.log(`Received: ${command}`, +step);
                    duplex.write(command);
                    robotjs_1.default.moveMouse(mouse.x + Number(step), mouse.y);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "mouse_up":
                    console.log(`Received: ${command}`, +step);
                    duplex.write(command);
                    robotjs_1.default.moveMouse(mouse.x, mouse.y - Number(step));
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "mouse_down":
                    console.log(`Received: ${command}`, +step);
                    duplex.write(command);
                    robotjs_1.default.moveMouse(mouse.x, mouse.y + Number(step));
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "mouse_position":
                    console.log(`Received: ${command}`);
                    duplex.write(`mouse_position ${mouse.x},${mouse.y}`);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "draw_circle":
                    console.log(`Received: ${command} radius`, +step);
                    duplex.write(command);
                    (0, drawCircle_1.drawCircle)(+step);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "draw_rectangle":
                    console.log(`Received: ${command} width:`, +step, `height:`, +length);
                    duplex.write(command);
                    (0, drawRectangle_1.drawRectangle)(+step, +length);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "draw_square":
                    console.log(`Received: ${command} side:`, +step);
                    duplex.write(command);
                    (0, drawRectangle_1.drawRectangle)(+step, +step);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                case "prnt_scrn":
                    console.log(`Received: ${command}`);
                    const capture = yield (0, getCapture_1.getCapture)();
                    duplex.write(capture.data);
                    (0, printSuccessMessage_1.printSuccessMessage)(command);
                    break;
                default: {
                    console.log(`Unknown command: ${command}`);
                }
            }
        }
        catch (_a) {
            console.log(`command complete with error`);
            duplex.write(`internal_server_error`);
        }
    }));
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
