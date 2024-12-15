import type { Settings } from "@/components/settings/appSettings/settings";
import { UIHelper } from "../helper/uihelper";
import { Viewer } from "m3dv";

export const instance: {
    viewer: Viewer | null,
    helper: UIHelper
    settings: Settings
} = {
    viewer: null,
    helper: new UIHelper(),
    settings: {
        useDarkTheme: true,
        themeColours: {
            main: "#eeeeee",
            text: "#111111",
            accent: "#118bfe",
            border: "#d0d0d0",
        }
    }
};