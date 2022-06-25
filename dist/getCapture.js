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
exports.getCapture = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const jimp_1 = __importDefault(require("jimp"));
const getCapture = () => __awaiter(void 0, void 0, void 0, function* () {
    const mouse = robotjs_1.default.getMousePos();
    const bitMap = robotjs_1.default.screen.capture(mouse.x - 100, mouse.y - 100, 200, 200);
    const img = new jimp_1.default(200, 200);
    let red, green, blue;
    bitMap.image.forEach((byte, i) => {
        switch (i % 4) {
            case 0:
                return (blue = byte);
            case 1:
                return (green = byte);
            case 2:
                return (red = byte);
            case 3:
                img.bitmap.data[i - 3] = red;
                img.bitmap.data[i - 2] = green;
                img.bitmap.data[i - 1] = blue;
                img.bitmap.data[i] = 255;
        }
    });
    const base64 = yield img.getBufferAsync(jimp_1.default.MIME_PNG);
    return { data: `prnt_scrn ${base64.toString("base64")}\0` };
});
exports.getCapture = getCapture;
