import type { Rectangle } from "./rectangle";

export class Box {
    readonly size: number;
    readonly area: number;

    rectangles: Rectangle[];

    get usedArea(): number {
        const totalArea = this.rectangles.reduce(
            (sum, rect) => sum + rect.area,
            0,
        );
        return totalArea;
    }

    get freeArea(): number {
        return this.area - this.usedArea;
    }

    get utilization(): number {
        return (this.usedArea / this.area) * 100;
    }

    constructor(size: number) {
        this.size = size;
        this.area = size * size;
        this.rectangles = [];
    }

    addRect(rectangle: Rectangle, position: { x: number; y: number }): void {
        this.rectangles.push(rectangle);
        rectangle.position = position;
    }

    isOverlapping(rect1: Rectangle, rect2: Rectangle): boolean {
        const { x: x1, y: y1 } = rect1.position;
        const { x: x2, y: y2 } = rect2.position;
        return !(
            x1! + rect1.width <= x2! ||
            x2! + rect2.width <= x1! ||
            y1! + rect1.height <= y2! ||
            y2! + rect2.height <= y1!
        );
    }

    isOverflowed(rectangle: Rectangle): boolean {
        const { x, y } = rectangle.position;
        return (
            x! + rectangle.width > this.size ||
            y! + rectangle.height > this.size
        );
    }
}
