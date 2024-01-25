import { CircleCollider, RectangleCollider, Collider, Coordinates } from "./colliders"

abstract class GameObject<T extends Collider> {
  public collider: T
  public abstract update(): void
}

abstract class MoveableGameObject<T extends Collider> extends GameObject<T> {
  public speed: number

  constructor(speed: number) {
    super()
    this.speed = speed
  }

  // Updates creature coordinates for a single frame
  protected step(targetCoords: Coordinates) {
    const {
      collider: { coords },
    } = this

    if (!targetCoords) {
      return
    } else if (!this.collider.isAt(targetCoords)) {
      const deltaY = targetCoords.y - coords.y
      const deltaX = targetCoords.x - coords.x

      let x, y
      if (deltaX === 0) {
        x = 0
        y = deltaY
      } else {
        const slope = deltaY / deltaX
        const t = this.speed / Math.sqrt(slope ** 2 + 1)
        x = t * Math.sign(deltaX)
        y = slope * x
      }

      const minMaxX = x > 0 ? Math.min : Math.max
      const minMaxY = y > 0 ? Math.min : Math.max

      this.collider.x = minMaxX(coords.x + x, targetCoords.x)
      this.collider.y = minMaxY(coords.y + y, targetCoords.y)
    }
  }
}

class Projectile<T extends Collider> extends MoveableGameObject<T> {
  public damage: number
  public collider: T
  public target: Creature<RectangleCollider | CircleCollider>
  public attack: Attack

  constructor(speed: number, damage: number, collider: T, target: Creature<RectangleCollider | CircleCollider>, attack: Attack) {
    super(speed)
    this.damage = damage
    this.collider = collider
    this.target = target
    this.attack = attack
  }

  public update() {
    return this.step(this.target.collider.getCenterCoordinates())
  }
}

interface Attack {
  physicalDamage: number
  magicDamage: number
  attackSpeed: number
  // armor pen, magic pen
}

interface Stats {
  health: number
  maxHealth: number
  movementSpeed: number
  attackDamage: number
  abilityPower: number
  armor: number
  magicResist: number
  attackSpeed: number
  canAttack: boolean
  // TODO:
  // research all possible stats
  // attack speed, crit chance, crit dmg, mp5, hp5
}

class Creature<T extends Collider> extends MoveableGameObject<T> {
  public baseStats: Stats
  public goldValue: number
  public targetCoords?: Coordinates

  constructor(collider: T, baseStats: Stats, goldValue: number, targetCoords?: Coordinates) {
    super(baseStats.movementSpeed)
    this.collider = collider
    this.baseStats = baseStats
    this.goldValue = goldValue
    this.targetCoords = targetCoords
  }

  public get x() {
    return this.collider.x
  }

  public get y() {
    return this.collider.y
  }

  public takeDamage(attack: Attack) {
    // Armor Calculation
    let damageAfterArmor = 0

    if (this.baseStats.armor <= 0) {
      damageAfterArmor += 2 - 100 / (100 - this.baseStats.armor)
    } else {
      damageAfterArmor += 100 / (100 - this.baseStats.armor)
    }

    // Magic Resist Calculation
    let damageAfterMagicResist = 0

    if (this.baseStats.magicResist < 0) {
      damageAfterMagicResist += 2 - 100 / (100 - this.baseStats.magicResist)
    } else {
      damageAfterMagicResist += 100 / (100 - this.baseStats.magicResist)
    }

    let totalDamage = damageAfterArmor + damageAfterMagicResist
    console.log(totalDamage)
    totalDamage += Math.max(0, attack.physicalDamage - this.baseStats.armor)
    console.log(totalDamage)
    this.baseStats.health = Math.max(0, this.baseStats.health - totalDamage)
    console.log(`health: ${this.baseStats.health}, AD: ${this.baseStats.attackDamage}, damage given: ${totalDamage}`)
  }

  public autoAttack(): Attack {
    return { physicalDamage: this.baseStats.attackDamage, magicDamage: this.baseStats.abilityPower, attackSpeed: this.baseStats.attackSpeed }
  }

  public update() {
    this.step(this.targetCoords)
  }

  public moveTo(x: number, y: number) {
    this.targetCoords = { x: x - this.collider.getCenterXOffset(), y: y - this.collider.getCenterYOffset() }
  }

  public stopMovement() {
    this.targetCoords = { ...this.collider.coords }
  }
}

class Champion<T extends Collider> extends Creature<T> {
  public level: number

  constructor(baseStats: Stats, collider: T, goldValue: number, level?: number, targetCoords?: Coordinates) {
    super(collider, baseStats, goldValue, targetCoords)
    this.level = level ?? 1
    this.calculateStatsForLevel()
  }

  private calculateStatsForLevel() {
    // this.baseStats = {
    //     // set stats based on level
    //     attackDamage: this.baseStats.attackDamage * this.level,
    // }
  }

  public levelUp() {
    this.level++
    this.calculateStatsForLevel()
  }
}

class CreatureFactory {
  private static instance: CreatureFactory

  private constructor() {}

  public static get() {
    if (!CreatureFactory.instance) {
      CreatureFactory.instance = new CreatureFactory()
    }
    return CreatureFactory.instance
  }

  public newCreature(stats: Stats, goldValue: number) {
    return {
      withCircleCollider: this.withCircleCollider({ ...stats }, goldValue),
      withRectangleCollider: this.withRectangleCollider({ ...stats }, goldValue),
    }
  }

  private withRectangleCollider(stats: Stats, goldValue: number) {
    return (x: number, y: number, width: number, height: number) => {
      const createCollider = () => new RectangleCollider(x, y, width, height)
      return {
        withTargetCoords: this.withTargetCoords(createCollider(), stats, goldValue),
        build: () => new Creature(createCollider(), stats, goldValue),
      }
    }
  }

  private withCircleCollider(stats: Stats, goldValue: number) {
    return (x: number, y: number, radius: number) => {
      const createCollider = () => new CircleCollider(x, y, radius)
      return {
        withTargetCoords: this.withTargetCoords(createCollider(), stats, goldValue),
        build: () => new Creature(createCollider(), stats, goldValue),
      }
    }
  }

  private withTargetCoords(collider: Collider, stats: Stats, goldValue: number) {
    return (x: number, y: number) => {
      return {
        build: () => new Creature(collider, stats, goldValue, { x, y }),
      }
    }
  }
}

type Player = Creature<RectangleCollider>
type Minion = Creature<RectangleCollider>
type AttackProjectile = Projectile<CircleCollider>

type GameState = {
  player: Player
  playerGold: number
  playerCreepScore: number
  minions: Minion[]
  projectiles: AttackProjectile[]
}

export { Coordinates, Creature, Projectile, CreatureFactory, GameState, Player, Minion, AttackProjectile, Attack, Stats }
