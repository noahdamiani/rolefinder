import { ElementHandle } from "puppeteer";

export const evaluate = async (
  element: ElementHandle,
  selector: string,
  type: keyof Element | keyof HTMLHyperlinkElementUtils = "textContent"
) => {
  const item = await element.$(selector);
  let text = "";

  try {
    if (type === "textContent") {
      text = await item.evaluate((el) => el.textContent);
    } else if (type === "href") {
      text = await item.evaluate((el) => el.getAttribute("href"));
    }
  } catch (error) {}

  return text.trim();
};
