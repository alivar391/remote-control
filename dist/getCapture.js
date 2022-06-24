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
    const bitMap = robotjs_1.default.screen.capture(mouse.x - 200, mouse.y - 200, 200 * 2, 200 * 2);
    const img = new jimp_1.default(200 * 2, 200 * 2);
    img.bitmap.data = bitMap.image;
    const base64 = yield img.getBufferAsync(jimp_1.default.MIME_PNG);
    return { data: `prnt_scrn ${base64.toString("base64")}` };
});
exports.getCapture = getCapture;
