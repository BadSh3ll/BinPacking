import type { GreedyElement } from "./greedy";

export class Rectangle implements GreedyElement {
    readonly width: number;
    readonly height: number;
    readonly area: number;

    // Position within the box
    private x: number | null = null;
    private y: number | null = null;
    rotated: boolean = false;

    public get position() {
        return { x: this.x, y: this.y };
    }

    public set position({ x, y }: { x: number | null; y: number | null }) {
        this.x = x;
        this.y = y;
    }

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.area = width * height;
    }

    rotate(): Rectangle {
        const rotatedRect = new Rectangle(this.height, this.width);
        rotatedRect.rotated = !this.rotated;
        return rotatedRect;
    }
}
