import { ObjectLoader } from "three";
import { ComputeArea, ComputeVolume } from "m3dv";

onmessage = (e) => {
    const data = e.data;
    const json = JSON.parse(data);
    const loader = new ObjectLoader();
    const model = loader.parse(json);
    const area = ComputeArea(model);
    const volume = ComputeVolume(model);
    postMessage({ area: area, volume: volume });
}