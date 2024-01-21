interface Coordinates {
  x: number
  y: number
}

abstract class Collider {
  public coords: Coordinates

  constructor(x: number, y: number) {
    this.coords = { x, y }
  }

  public isAtCenterOf(other: Collider) {
    const otherCenterCoords = other.getCenterCoordinates()
    return this.isAt(otherCenterCoords)
  }

  public isAt(otherCoords: Coordinates) {
    const centerCoords = this.getCenterCoordinates()
    return otherCoords.x === centerCoords.x && otherCoords.y === centerCoords.y
  }

  public get x() {
    return this.coords.x
  }

  public set x(x: number) {
    this.coords.x = x
  }

  public get y() {
    return this.coords.y
  }

  public set y(y: number) {
    this.coords.y = y
  }

  public abstract collidesWith(other: Collider): boolean
  public abstract getCenterCoordinates(): Coordinates
  public abstract getCenterXOffset(): number
  public abstract getCenterYOffset(): number
}

export { Collider, Coordinates }
