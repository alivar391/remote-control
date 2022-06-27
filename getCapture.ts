import robot from "robotjs";
import Jimp from "jimp";

export const getCapture = async () => {
  const mouse = robot.getMousePos();
  const bitMap = robot.screen.capture(mouse.x - 100, mouse.y - 100, 200, 200);
  const img = new Jimp(200, 200);

  let red: number, green: number, blue: number;
  bitMap.image.forEach((byte: number, i: number) => {
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

  const base64 = await img.getBufferAsync(Jimp.MIME_PNG);

  return { data: `prnt_scrn ${base64.toString("base64")}\0` };
};
