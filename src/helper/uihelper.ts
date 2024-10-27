import { EventEmitter } from "m3dv";

export class UIHelper extends EventEmitter {
    constructor() {
        super()
    }

    override addListener(event: "sidebar-change", listener: Function): void {
        super.addListener(event, listener);
    }

    override emit(event: "sidebar-change", ...any: any): void {
        super.emit(event, ...any);
    }
} 