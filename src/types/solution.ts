import type { Box } from "./box";

export interface Solution {
    copy(): Solution;
    objective(): number;
}

export class PackingSolution implements Solution {

    readonly boxes: Box[];

    constructor(boxes: Box[]) {
        this.boxes = boxes;
    }
    copy(): PackingSolution {
        return new PackingSolution(this.boxes);
    }

    objective(): number {
        return this.boxes.length; 
    }
}
