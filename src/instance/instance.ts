import { UIHelper } from "../helper/uihelper";
import { Viewer } from "m3dv";

export const instance: {
    viewer: Viewer | null,
    helper: UIHelper
} = {
    viewer: null,
    helper: new UIHelper()
};