import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styles from "./SettingsPanel.module.css";
import { useSettings } from "../hooks/useSettings";
import { Settings } from "../types";

const defaultSettings: Settings = {
  sceneName: "シーン",
  textName: "setli",
  fontColor: "#ffffff",
  fontFamily: "Arial",
  outline: false,
  outlineWidth: 1,
  outlineColor: "#ffffff",
  lineBreaks: 1,
};

const SettingsPanel: React.FC = (props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [fontList, setFontList] = useState<string[]>([]);

  const { updateSettings, getSettings, getFonts } = useSettings();

  useEffect(() => {
    const fetchData = async () => {
      const fonts: string[] = await getFonts();
      setFontList(fonts);
      const fetchedSettings: Settings | undefined = await getSettings();
      if (fetchedSettings) {
        setSettings(fetchedSettings);
      }
    };
    fetchData();
  }, []);

  const handleChange =
    (key: keyof Settings) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setSettings((prev) => ({ ...prev, [key]: event.target.value }));
    };

  function handleCheckboxChange(key: keyof Settings) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setSettings((prevSettings) => ({
        ...prevSettings,
        [key]: checked,
      }));
    };
  }

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Scene Name</label>
        <div className={styles.settingsInput}>
          <input
            type="text"
            value={settings.sceneName}
            onChange={handleChange("sceneName")}
          />
        </div>
      </div>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Font Color</label>
        <div className={styles.settingsInput}>
          <span>{settings.fontColor.toUpperCase()}</span>
          <input
            type="color"
            value={settings.fontColor}
            onChange={handleChange("fontColor")}
          />
        </div>
      </div>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Font Familiy</label>
        <div className={styles.settingsInput}>
          <select onChange={handleChange("fontFamily")}>
            {fontList.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Outline</label>
        <div className={styles.settingsInput}>
          <Toggle
            checked={settings.outline}
            onChange={handleCheckboxChange("outline")}
          />
        </div>
      </div>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Outline Width</label>
        <div className={styles.settingsInput}>
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            value={settings.outlineWidth}
            onChange={handleChange("outlineWidth")}
          />
        </div>
      </div>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Outline Color</label>
        <div className={styles.settingsInput}>
          <span>{settings.outlineColor.toUpperCase()}</span>
          <input
            type="color"
            value={settings.outlineColor}
            onChange={handleChange("outlineColor")}
          />
        </div>
      </div>
      <div className={styles.settingsGroup}>
        <label className={styles.settingsLabel}>Line Breaks</label>
        <div className={styles.settingsInput}>
          <input
            type="number"
            min="1"
            max="2"
            step="1"
            value={settings.lineBreaks}
            onChange={handleChange("lineBreaks")}
          />
        </div>
      </div>
      <div className={styles.settingsButton}>
        <button onClick={() => updateSettings(settings)}>Update</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
