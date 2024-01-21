import { Collider, Coordinates } from "./Collider"
import { circleToRectangleCollision, isCircle, isRectangle, rectangleToRectangleCollision } from "./utils"

export default class RectangleCollider extends Collider {
  public width: number
  public height: number

  public constructor(x: number, y: number, width: number, height: number) {
    super(x, y)
    this.width = width
    this.height = height
  }

  public getCenterCoordinates(): Coordinates {
    const {
      coords: { x, y },
    } = this
    return { x: x + this.width / 2, y: y + this.height / 2 }
  }

  public collidesWith(other: Collider): boolean {
    if (isCircle(other)) {
      return circleToRectangleCollision(other, this)
    } else if (isRectangle(other)) {
      return rectangleToRectangleCollision(this, other)
    }
    return false
  }

  public getCenterXOffset() {
    return this.width / 2
  }

  public getCenterYOffset() {
    return this.height / 2
  }
}
