import robot from "robotjs";

export const drawRectangle = (width: number, height: number) => {
  const mouse = robot.getMousePos();
  robot.mouseToggle("down");
  robot.moveMouseSmooth(mouse.x + width, mouse.y);
  robot.moveMouseSmooth(mouse.x + width, mouse.y + height);
  robot.moveMouseSmooth(mouse.x, mouse.y + height);
  robot.moveMouseSmooth(mouse.x, mouse.y);
  robot.mouseToggle("up");
};
