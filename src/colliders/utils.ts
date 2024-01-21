import { Collider } from "./Collider"
import CircleCollider from "./CircleCollider"
import RectangleCollider from "./RectangleCollider"

export function isCircle(collider: Collider): collider is CircleCollider {
  return (collider as CircleCollider).radius !== undefined
}

export function isRectangle(collider: Collider): collider is RectangleCollider {
  return (collider as RectangleCollider).width !== undefined && (collider as RectangleCollider).height !== undefined
}

export function circleToCircleCollision(c1: CircleCollider, c2: CircleCollider): boolean {
  return (c1.coords.x - c2.coords.x) ** 2 + (c1.coords.y - c2.coords.y) ** 2 <= (c1.radius + c2.radius) ** 2
}

export function circleToRectangleCollision(circ: CircleCollider, rect: RectangleCollider): boolean {
  const deltaX = Math.abs(circ.coords.x - rect.coords.x) - rect.width / 2
  const deltaY = Math.abs(circ.coords.y - rect.coords.y) - rect.height / 2

  if (deltaX > circ.radius || deltaY > circ.radius) {
    return false
  } else if (deltaX <= 0 || deltaY <= 0) {
    return true
  }
  return deltaX ** 2 + deltaY ** 2 <= circ.radius ** 2
}

export function rectangleToRectangleCollision(rect1: RectangleCollider, rect2: RectangleCollider): boolean {
  return (
    rect1.coords.x <= rect2.coords.x + rect2.width &&
    rect1.coords.x + rect1.width >= rect2.coords.x &&
    rect1.coords.y <= rect2.coords.y + rect2.height &&
    rect1.coords.y + rect1.height >= rect2.coords.y
  )
}
