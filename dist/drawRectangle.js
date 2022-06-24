"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRectangle = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const drawRectangle = (width, height) => {
    const mouse = robotjs_1.default.getMousePos();
    robotjs_1.default.mouseToggle("down");
    robotjs_1.default.moveMouseSmooth(mouse.x + width, mouse.y);
    robotjs_1.default.moveMouseSmooth(mouse.x + width, mouse.y + height);
    robotjs_1.default.moveMouseSmooth(mouse.x, mouse.y + height);
    robotjs_1.default.moveMouseSmooth(mouse.x, mouse.y);
    robotjs_1.default.mouseToggle("up");
};
exports.drawRectangle = drawRectangle;
