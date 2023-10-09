import { invoke } from "@tauri-apps/api";
import { Settings } from "../types";
import { withOBSHandling } from "../utils/errorHandler";

export function useSettings() {
  // Function for color reformatting
  const reformatColorForOBS = (hex: string) => {
    const convertedHex = hex.slice(1);
    const obsBlue = convertedHex.substring(0, 2);
    const obsGreen = convertedHex.substring(2, 4);
    const obsRed = convertedHex.substring(4, 6);
    const obsColor = `${obsRed}${obsGreen}${obsBlue}`;
    return parseInt(obsColor, 16);
  };

  async function updateSettings(settings: Settings) {
    const result = await withOBSHandling(
      invoke("update_settings_to_obs", {
        settings: {
          scene_name: settings.sceneName,
          text_name: settings.textName,
          font_family: settings.fontFamily,
          font_color: reformatColorForOBS(settings.fontColor),
          outline: settings.outline,
          outline_width: settings.outlineWidth,
          outline_color: reformatColorForOBS(settings.outlineColor),
          line_breaks: settings.lineBreaks,
        },
      }),
      "Failed to update settings"
    );

    if (result) {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }

  async function getSettings(): Promise<Settings | undefined> {
    const localSettings = await withOBSHandling(
      Promise.resolve(localStorage.getItem("settings")),
      "Failed to get settings"
    );

    if (localSettings) {
      return JSON.parse(localSettings) as Settings;
    }
    return {} as Settings;
  }

  async function getFonts(): Promise<string[]> {
    return (
      (await withOBSHandling(invoke("get_fonts"), "Failed to get fonts")) || []
    );
  }

  return { updateSettings, getSettings, getFonts };
}
