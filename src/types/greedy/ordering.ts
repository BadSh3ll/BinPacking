import type { OrderingStrategy } from ".";
import type { Rectangle } from "../rectangle";


export class LargestAreaFirst implements OrderingStrategy<Rectangle> {

    order(rectangles: readonly Rectangle[]): readonly Rectangle[] {
        return [...rectangles].sort(
            (a, b) => b.area - a.area
        );
    }
}

export class LargestHeightFirst implements OrderingStrategy<Rectangle> {

    order(rectangles: readonly Rectangle[]): readonly Rectangle[] {
        return [...rectangles].sort(
            (a, b) => b.height - a.height
        );
    }
}