import { Rectangle } from "./rectangle";

export interface InstanceParams {
    numRectangles: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    boxSize: number;
}

export class InstanceGenerator {

    generate(params: InstanceParams): PackingInstance {
       
        const rectangles: Rectangle[] = [];
        for (let i = 0; i < params.numRectangles; i++) {
            const width = Math.floor(Math.random() * (params.maxWidth - params.minWidth + 1)) + params.minWidth;
            const height = Math.floor(Math.random() * (params.maxHeight - params.minHeight + 1)) + params.minHeight;
            rectangles.push(new Rectangle(width, height));
        }
        return new PackingInstance(params.boxSize, rectangles);
    }
}

export class PackingInstance {

    readonly boxSize: number;
    readonly rectangles: readonly Rectangle[];


    constructor(boxSize: number, rectangles: Rectangle[]) {
        this.boxSize = boxSize;
        this.rectangles = rectangles;
    }

    isComplete(): boolean {
        return this.rectangles.every(rect => rect.position.x !== undefined && rect.position.y !== undefined);
    }

}