import robot from "robotjs";
import Jimp from "jimp";

export const getCapture = async () => {
  const mouse = robot.getMousePos();
  const bitMap = robot.screen.capture(
    mouse.x - 200,
    mouse.y - 200,
    200 * 2,
    200 * 2,
  );
  const img = new Jimp(200 * 2, 200 * 2);

  img.bitmap.data = bitMap.image;

  const base64 = await img.getBufferAsync(Jimp.MIME_PNG);

  return { data: `prnt_scrn ${base64.toString("base64")}` };
};
