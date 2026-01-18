import type { Box } from "../box";
import { Rectangle } from "../rectangle";

export interface TryPutPosition {
    x: number;
    y: number;
    rotated: boolean;
}

export interface PuttingStrategy {
    tryPut(rectangle: Rectangle, box: Box): TryPutPosition | null;
}

export class BottomLeftPutting implements PuttingStrategy {
    tryPut(rectangle: Rectangle, box: Box): TryPutPosition | null {
        // first candidate is the origin
        const positions: { x: number; y: number }[] = [{ x: 0, y: 0 }];

        // sides of the other rectangles
        for (const rect of box.rectangles) {
            const { x, y } = rect.position;
            positions.push({ x: x! + rect.width, y: y! });
            positions.push({ x: x!, y: y! + rect.height });
        }

        positions.sort((a, b) => {
            if (a.y === b.y) {
                return a.x - b.x;
            }
            return a.y - b.y;
        });

        const rotating = [false, true];

        for (const rotated of rotating) {
            for (const { x, y } of positions) {
                const testRect = rotated ? rectangle.rotate() : rectangle;
                testRect.position = { x, y };

                let overlapping = false;
                let overflow = false;

                // Check overflow
                if (box.isOverflowed(testRect)) {
                    overflow = true;
                }

                // Check overlapping
                for (const placedRect of box.rectangles) {
                    if (box.isOverlapping(testRect, placedRect)) {
                        overlapping = true;
                        break;
                    }
                }

                if (!overlapping && !overflow) {
                    return { x, y, rotated };
                }
            }
        }
        return null;
    }
}

interface Shelf {
    y: number;
    height: number;
    currentX: number;
    rectangles: Rectangle[];
}

export class ShelfPutting implements PuttingStrategy {
    private shelvesMap = new WeakMap<Box, Shelf[]>();

    tryPut(rectangle: Rectangle, box: Box): TryPutPosition | null {
        // Get or initialize shelves
        let shelves = this.shelvesMap.get(box);
        if (!shelves) {
            shelves = this.initializeShelves(box);
            this.shelvesMap.set(box, shelves);
        }

        // Try to fit in existing shelves first
        for (const shelf of shelves) {
            const result = this.tryFitInShelf(rectangle, shelf, box);
            if (result) {
                return result;
            }
        }

        return this.tryCreateNewShelf(rectangle, box, shelves);
    }

    private initializeShelves(box: Box): Shelf[] {
        const shelves: Shelf[] = [];

        if (box.rectangles.length === 0) {
            return shelves;
        }

        // Group existing rectangles into shelves based on their y-positions
        const yPositions = new Map<number, Rectangle[]>();

        for (const rect of box.rectangles) {
            const y = rect.position.y!;
            if (!yPositions.has(y)) {
                yPositions.set(y, []);
            }
            yPositions.get(y)!.push(rect);
        }

        // Create shelf objects
        for (const [y, rects] of yPositions) {
            rects.sort((a, b) => a.position.x! - b.position.x!);
            const maxHeight = Math.max(...rects.map((r) => r.height));
            const maxX = Math.max(...rects.map((r) => r.position.x! + r.width));

            shelves.push({
                y,
                height: maxHeight,
                currentX: maxX,
                rectangles: rects,
            });
        }

        shelves.sort((a, b) => a.y - b.y);
        return shelves;
    }

    private tryCreateNewShelf(
        rectangle: Rectangle,
        box: Box,
        shelves: Shelf[],
    ): TryPutPosition | null {
        // Find the lowest available y position for a new shelf
        let newShelfY = 0;
        if (shelves.length > 0) {
            const lastShelf = shelves[shelves.length - 1];
            newShelfY = lastShelf.y + lastShelf.height;
        }

        // Rule 1: First rectangle on new shelf should be stored sideways
        let testRect: Rectangle;
        let rotated = false;

        if (rectangle.isSideway) {
            testRect = rectangle;
            rotated = false;
        } else {
            testRect = rectangle.rotate();
            rotated = true;
        }

        testRect.position = { x: 0, y: newShelfY };

        if (box.isOverflowed(testRect)) {
            return null;
        }

        for (const placedRect of box.rectangles) {
            if (box.isOverlapping(testRect, placedRect)) {
                return null;
            }
        }

        // Create the new shelf
        shelves.push({
            y: newShelfY,
            height: testRect.height,
            currentX: testRect.width,
            rectangles: [],
        });

        return { x: 0, y: newShelfY, rotated };
    }

    private tryFitInShelf(
        rectangle: Rectangle,
        shelf: Shelf,
        box: Box,
    ): TryPutPosition | null {
        let testRect: Rectangle;
        let rotated = false;

        // Rule 2: Put the rectangle upright to minimize wasted space
        if (rectangle.isUpright) {
            testRect = rectangle;
            rotated = false;
        } else {
            testRect = rectangle.rotate();
            rotated = true;
        }

        if (testRect.height > shelf.height) {
            return null;
        }

        testRect.position = { x: shelf.currentX, y: shelf.y };

        if (box.isOverflowed(testRect)) {
            return null;
        }

        for (const placedRect of box.rectangles) {
            if (box.isOverlapping(testRect, placedRect)) {
                return null;
            }
        }

        return { x: shelf.currentX, y: shelf.y, rotated };
    }
}
