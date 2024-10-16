import { Viewer } from "cad-model-viewer/dist/Viewer";

export const instance: {
    viewer: Viewer | null
} = {
    viewer: null
};