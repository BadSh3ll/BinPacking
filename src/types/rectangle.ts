export class Rectangle {

    readonly id: number;
    readonly width: number;
    readonly height: number;

    // Position within the box
    x?: number;
    y?: number;

    constructor(id: number, width: number, height: number) {
        this.id = id;
        this.width = width;
        this.height = height;
    }

    rotate(): Rectangle {
        return new Rectangle(this.id, this.height, this.width);
    }
}