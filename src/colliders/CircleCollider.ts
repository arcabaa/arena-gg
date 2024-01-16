import { Collider, Coordinates } from "./Collider";
import { isCircle, isRectangle, circleToCircleCollision, circleToRectangleCollision } from "./utils";

export default class CircleCollider extends Collider {
    public radius: number;

    public constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    public getCenterCoordinates(): Coordinates {
        return { ...this.coords };
    }

    public collidesWith(other: Collider): boolean {
        if (isCircle(other)) {
            return circleToCircleCollision(this, other);
        } else if (isRectangle(other)) {
            return circleToRectangleCollision(this, other);
        }
        return false;
    }

    public getCenterXOffset() {
        return this.radius;
    }

    public getCenterYOffset() {
        return this.radius;
    }
}
