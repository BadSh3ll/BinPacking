import type { Rectangle } from "./rectangle";

export class Box {
    id: number;
    size: number;
    rectangles: Rectangle[];
    utilization: number;

    constructor(id: number, size: number) {
        this.id = id;
        this.size = size;
        this.rectangles = [];
        this.utilization = 0;
    }
}