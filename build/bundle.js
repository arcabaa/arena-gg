/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/colliders/CircleCollider.ts":
/*!*****************************************!*\
  !*** ./src/colliders/CircleCollider.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Collider_1 = __webpack_require__(/*! ./Collider */ "./src/colliders/Collider.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/colliders/utils.ts");
class CircleCollider extends Collider_1.Collider {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    getCenterCoordinates() {
        return Object.assign({}, this.coords);
    }
    collidesWith(other) {
        if ((0, utils_1.isCircle)(other)) {
            return (0, utils_1.circleToCircleCollision)(this, other);
        }
        else if ((0, utils_1.isRectangle)(other)) {
            return (0, utils_1.circleToRectangleCollision)(this, other);
        }
        return false;
    }
    getCenterXOffset() {
        return this.radius;
    }
    getCenterYOffset() {
        return this.radius;
    }
}
exports["default"] = CircleCollider;


/***/ }),

/***/ "./src/colliders/Collider.ts":
/*!***********************************!*\
  !*** ./src/colliders/Collider.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collider = void 0;
class Collider {
    constructor(x, y) {
        this.coords = { x, y };
    }
    isAtCenterOf(other) {
        const otherCenterCoords = other.getCenterCoordinates();
        return this.isAt(otherCenterCoords);
    }
    isAt(otherCoords) {
        const centerCoords = this.getCenterCoordinates();
        return otherCoords.x === centerCoords.x && otherCoords.y === centerCoords.y;
    }
    get x() {
        return this.coords.x;
    }
    set x(x) {
        this.coords.x = x;
    }
    get y() {
        return this.coords.y;
    }
    set y(y) {
        this.coords.y = y;
    }
}
exports.Collider = Collider;


/***/ }),

/***/ "./src/colliders/RectangleCollider.ts":
/*!********************************************!*\
  !*** ./src/colliders/RectangleCollider.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Collider_1 = __webpack_require__(/*! ./Collider */ "./src/colliders/Collider.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/colliders/utils.ts");
class RectangleCollider extends Collider_1.Collider {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    getCenterCoordinates() {
        const { coords: { x, y }, } = this;
        return { x: x + this.width / 2, y: y + this.height / 2 };
    }
    collidesWith(other) {
        if ((0, utils_1.isCircle)(other)) {
            return (0, utils_1.circleToRectangleCollision)(other, this);
        }
        else if ((0, utils_1.isRectangle)(other)) {
            return (0, utils_1.rectangleToRectangleCollision)(this, other);
        }
        return false;
    }
    getCenterXOffset() {
        return this.width / 2;
    }
    getCenterYOffset() {
        return this.height / 2;
    }
}
exports["default"] = RectangleCollider;


/***/ }),

/***/ "./src/colliders/index.ts":
/*!********************************!*\
  !*** ./src/colliders/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collider = exports.RectangleCollider = exports.CircleCollider = void 0;
const CircleCollider_1 = __webpack_require__(/*! ./CircleCollider */ "./src/colliders/CircleCollider.ts");
exports.CircleCollider = CircleCollider_1.default;
const RectangleCollider_1 = __webpack_require__(/*! ./RectangleCollider */ "./src/colliders/RectangleCollider.ts");
exports.RectangleCollider = RectangleCollider_1.default;
const Collider_1 = __webpack_require__(/*! ./Collider */ "./src/colliders/Collider.ts");
Object.defineProperty(exports, "Collider", ({ enumerable: true, get: function () { return Collider_1.Collider; } }));


/***/ }),

/***/ "./src/colliders/utils.ts":
/*!********************************!*\
  !*** ./src/colliders/utils.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rectangleToRectangleCollision = exports.circleToRectangleCollision = exports.circleToCircleCollision = exports.isRectangle = exports.isCircle = void 0;
function isCircle(collider) {
    return collider.radius !== undefined;
}
exports.isCircle = isCircle;
function isRectangle(collider) {
    return collider.width !== undefined && collider.height !== undefined;
}
exports.isRectangle = isRectangle;
function circleToCircleCollision(c1, c2) {
    return Math.pow((c1.coords.x - c2.coords.x), 2) + Math.pow((c1.coords.y - c2.coords.y), 2) <= Math.pow((c1.radius + c2.radius), 2);
}
exports.circleToCircleCollision = circleToCircleCollision;
function circleToRectangleCollision(circ, rect) {
    const deltaX = Math.abs(circ.coords.x - rect.coords.x) - rect.width / 2;
    const deltaY = Math.abs(circ.coords.y - rect.coords.y) - rect.height / 2;
    if (deltaX > circ.radius || deltaY > circ.radius) {
        return false;
    }
    else if (deltaX <= 0 || deltaY <= 0) {
        return true;
    }
    return Math.pow(deltaX, 2) + Math.pow(deltaY, 2) <= Math.pow(circ.radius, 2);
}
exports.circleToRectangleCollision = circleToRectangleCollision;
function rectangleToRectangleCollision(rect1, rect2) {
    return (rect1.coords.x <= rect2.coords.x + rect2.width &&
        rect1.coords.x + rect1.width >= rect2.coords.x &&
        rect1.coords.y <= rect2.coords.y + rect2.height &&
        rect1.coords.y + rect1.height >= rect2.coords.y);
}
exports.rectangleToRectangleCollision = rectangleToRectangleCollision;


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatureFactory = exports.Projectile = exports.Creature = void 0;
const colliders_1 = __webpack_require__(/*! ./colliders */ "./src/colliders/index.ts");
class GameObject {
}
class MoveableGameObject extends GameObject {
    constructor(speed) {
        super();
        this.speed = speed;
    }
    // Updates creature coordinates for a single frame
    step(targetCoords) {
        const { collider: { coords }, } = this;
        if (!targetCoords) {
            return;
        }
        else if (!this.collider.isAt(targetCoords)) {
            const deltaY = targetCoords.y - coords.y;
            const deltaX = targetCoords.x - coords.x;
            let x, y;
            if (deltaX === 0) {
                x = 0;
                y = deltaY;
            }
            else {
                const slope = deltaY / deltaX;
                const t = this.speed / Math.sqrt(Math.pow(slope, 2) + 1);
                x = t * Math.sign(deltaX);
                y = slope * x;
            }
            const minMaxX = x > 0 ? Math.min : Math.max;
            const minMaxY = y > 0 ? Math.min : Math.max;
            this.collider.x = minMaxX(coords.x + x, targetCoords.x);
            this.collider.y = minMaxY(coords.y + y, targetCoords.y);
        }
    }
}
class Projectile extends MoveableGameObject {
    constructor(speed, damage, collider, target, attack) {
        super(speed);
        this.damage = damage;
        this.collider = collider;
        this.target = target;
        this.attack = attack;
    }
    update() {
        return this.step(this.target.collider.getCenterCoordinates());
    }
}
exports.Projectile = Projectile;
class Creature extends MoveableGameObject {
    constructor(collider, baseStats, goldValue, targetCoords) {
        super(baseStats.movementSpeed);
        this.collider = collider;
        this.baseStats = baseStats;
        this.goldValue = goldValue;
        this.targetCoords = targetCoords;
    }
    get x() {
        return this.collider.x;
    }
    get y() {
        return this.collider.y;
    }
    takeDamage(attack) {
        // Armor Calculation
        let damageAfterArmor = 0;
        if (this.baseStats.armor <= 0) {
            damageAfterArmor += 2 - 100 / (100 - this.baseStats.armor);
        }
        else {
            damageAfterArmor += 100 / (100 - this.baseStats.armor);
        }
        // Magic Resist Calculation
        let damageAfterMagicResist = 0;
        if (this.baseStats.magicResist < 0) {
            damageAfterMagicResist += 2 - 100 / (100 - this.baseStats.magicResist);
        }
        else {
            damageAfterMagicResist += 100 / (100 - this.baseStats.magicResist);
        }
        let totalDamage = damageAfterArmor + damageAfterMagicResist;
        console.log(totalDamage);
        totalDamage += Math.max(0, attack.physicalDamage - this.baseStats.armor);
        console.log(totalDamage);
        this.baseStats.health = Math.max(0, this.baseStats.health - totalDamage);
        console.log(`health: ${this.baseStats.health}, AD: ${this.baseStats.attackDamage}, damage given: ${totalDamage}`);
    }
    autoAttack() {
        return { physicalDamage: this.baseStats.attackDamage, magicDamage: this.baseStats.abilityPower, attackSpeed: this.baseStats.attackSpeed };
    }
    update() {
        this.step(this.targetCoords);
    }
    moveTo(x, y) {
        this.targetCoords = { x: x - this.collider.getCenterXOffset(), y: y - this.collider.getCenterYOffset() };
    }
    stopMovement() {
        this.targetCoords = Object.assign({}, this.collider.coords);
    }
}
exports.Creature = Creature;
class Champion extends Creature {
    constructor(baseStats, collider, goldValue, level, targetCoords) {
        super(collider, baseStats, goldValue, targetCoords);
        this.level = level !== null && level !== void 0 ? level : 1;
        this.calculateStatsForLevel();
    }
    calculateStatsForLevel() {
        // this.baseStats = {
        //     // set stats based on level
        //     attackDamage: this.baseStats.attackDamage * this.level,
        // }
    }
    levelUp() {
        this.level++;
        this.calculateStatsForLevel();
    }
}
class CreatureFactory {
    constructor() { }
    static get() {
        if (!CreatureFactory.instance) {
            CreatureFactory.instance = new CreatureFactory();
        }
        return CreatureFactory.instance;
    }
    newCreature(stats, goldValue) {
        return {
            withCircleCollider: this.withCircleCollider(Object.assign({}, stats), goldValue),
            withRectangleCollider: this.withRectangleCollider(Object.assign({}, stats), goldValue),
        };
    }
    withRectangleCollider(stats, goldValue) {
        return (x, y, width, height) => {
            const createCollider = () => new colliders_1.RectangleCollider(x, y, width, height);
            return {
                withTargetCoords: this.withTargetCoords(createCollider(), stats, goldValue),
                build: () => new Creature(createCollider(), stats, goldValue),
            };
        };
    }
    withCircleCollider(stats, goldValue) {
        return (x, y, radius) => {
            const createCollider = () => new colliders_1.CircleCollider(x, y, radius);
            return {
                withTargetCoords: this.withTargetCoords(createCollider(), stats, goldValue),
                build: () => new Creature(createCollider(), stats, goldValue),
            };
        };
    }
    withTargetCoords(collider, stats, goldValue) {
        return (x, y) => {
            return {
                build: () => new Creature(collider, stats, goldValue, { x, y }),
            };
        };
    }
}
exports.CreatureFactory = CreatureFactory;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const colliders_1 = __webpack_require__(/*! ./colliders */ "./src/colliders/index.ts");
const types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
const canvas = document.getElementById("cs-canvas");
const context = canvas.getContext("2d");
const playerImage = document.createElement("img");
playerImage.src = "fizz.jpg"; // todo: replace?
const fps = 100;
const gameState = {
    player: createPlayer(),
    playerGold: 0,
    playerCreepScore: 0,
    minions: [],
    projectiles: [],
};
function createPlayer() {
    const playerStats = {
        abilityPower: 0,
        attackDamage: 80,
        attackSpeed: 0.89,
        armor: 0,
        magicResist: 0,
        movementSpeed: 4,
        maxHealth: 100,
        health: 100,
    };
    return types_1.CreatureFactory.get().newCreature(playerStats, 300).withRectangleCollider(0, 0, 75, 75).build();
}
function createMinion(x, y) {
    const minionStats = {
        abilityPower: 0,
        attackDamage: 100,
        attackSpeed: 0.89,
        armor: 10,
        magicResist: 0,
        movementSpeed: 2,
        maxHealth: 500,
        health: 500,
    };
    return types_1.CreatureFactory.get().newCreature(minionStats, 16).withRectangleCollider(x, y, 55, 55).build();
}
function createProjectile(origin, target, attack) {
    return new types_1.Projectile(6, 10, new colliders_1.CircleCollider(origin.x, origin.y, 8), target, attack);
}
function start() {
    init();
    gameLoop();
}
function gameLoop() {
    update();
    render();
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 1000 / fps);
}
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderMinions(gameState.minions);
    renderProjectiles(gameState.projectiles);
    renderPlayer(gameState.player);
}
function renderPlayer(player) {
    context.drawImage(playerImage, player.collider.coords.x, player.collider.coords.y, player.collider.width, player.collider.height);
    renderMaxHealthBar(player);
    renderHealthBar(player);
}
function renderProjectiles(projectiles) {
    projectiles.forEach((projectile) => {
        context.fillStyle = "green";
        const { collider: { coords: { x, y }, radius, }, } = projectile;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    });
}
function renderMinions(minions) {
    minions.forEach((minion) => {
        context.fillStyle = "tomato";
        const { collider: { coords, width, height }, } = minion;
        context.fillRect(coords.x, coords.y, width, height);
        renderMaxHealthBar(minion);
        renderHealthBar(minion);
    });
}
function renderMaxHealthBar(creature) {
    context.fillStyle = "black";
    const { collider: { coords, width }, } = creature;
    context.fillRect(coords.x, coords.y - 8, width, 5);
}
function renderHealthBar(creature) {
    context.fillStyle = "tomato";
    const { baseStats, collider: { coords, width }, } = creature;
    const healthToWidth = width * (baseStats.health / baseStats.maxHealth);
    context.fillRect(coords.x, coords.y - 8, healthToWidth, 5);
}
function update() {
    gameState.player.update();
    gameState.projectiles.forEach((projectile) => projectile.update());
    checkProjectilesMinionCollision(gameState.projectiles);
    updateMinions(gameState.minions, gameState.projectiles);
}
function checkProjectilesMinionCollision(_projectiles) {
    const projectiles = _projectiles.filter(({ collider, target, attack }) => {
        if (collider.isAtCenterOf(target.collider)) {
            target.takeDamage(attack);
            return false;
        }
        else {
            return true;
        }
    });
    gameState.projectiles = projectiles;
}
function updateMinions(_minions, _projectiles) {
    const minions = _minions.filter((minion) => {
        if (minion.baseStats.health === 0) {
            onMinionDeath(minion);
            if (_projectiles.length) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    });
    gameState.minions = minions;
}
function onMinionDeath(minion) {
    const { goldValue } = minion;
    gameState.playerGold += goldValue;
    gameState.playerCreepScore++;
}
function init() {
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
    canvas.addEventListener("mousedown", (event) => {
        const { x, y } = getEventCoordinates(event);
        const type = getClickType(event.button);
        handleClick(x, y, type);
    });
}
function handleClick(x, y, type) {
    const { player } = gameState;
    if (type === "right") {
        const minion = getClickedMinion(x, y);
        if (minion !== null && minion.baseStats.health !== 0) {
            autoAttackMinion(player.collider.getCenterCoordinates(), minion, player.autoAttack());
        }
        else {
            player.moveTo(x, y);
        }
    }
    else if (type === "left") {
        addMinion(x, y);
    }
}
function getEventCoordinates(event) {
    return {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop,
    };
}
function getClickedMinion(x, y) {
    const target = gameState.minions.find((minion) => minion.x <= x && minion.x + minion.collider.width >= x && minion.y <= y && minion.y + minion.collider.height >= y);
    return target || null;
}
function addMinion(x, y) {
    gameState.minions.push(createMinion(x, y));
}
function autoAttackMinion(origin, minion, attack) {
    const projectile = createProjectile(origin, minion, attack);
    gameState.projectiles.push(projectile);
    gameState.player.stopMovement();
}
function getClickType(button) {
    switch (button) {
        case 0:
            return "left";
        case 2:
            return "right";
        default:
            return "other";
    }
}
start();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdGQUFrRDtBQUNsRCwrRUFBb0c7QUFFcEcsTUFBcUIsY0FBZSxTQUFRLG1CQUFRO0lBR2xELFlBQW1CLENBQVMsRUFBRSxDQUFTLEVBQUUsTUFBYztRQUNyRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtJQUN0QixDQUFDO0lBRU0sb0JBQW9CO1FBQ3pCLHlCQUFZLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDM0IsQ0FBQztJQUVNLFlBQVksQ0FBQyxLQUFlO1FBQ2pDLElBQUksb0JBQVEsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLG1DQUF1QixFQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDNUM7YUFBTSxJQUFJLHVCQUFXLEVBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxzQ0FBMEIsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxLQUFLO0lBQ2QsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNO0lBQ3BCLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTTtJQUNwQixDQUFDO0NBQ0Y7QUE1QkQsb0NBNEJDOzs7Ozs7Ozs7Ozs7OztBQzFCRCxNQUFlLFFBQVE7SUFHckIsWUFBWSxDQUFTLEVBQUUsQ0FBUztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN4QixDQUFDO0lBRU0sWUFBWSxDQUFDLEtBQWU7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsb0JBQW9CLEVBQUU7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ3JDLENBQUM7SUFFTSxJQUFJLENBQUMsV0FBd0I7UUFDbEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1FBQ2hELE9BQU8sV0FBVyxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELElBQVcsQ0FBQztRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLENBQUMsQ0FBQyxDQUFTO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQVcsQ0FBQztRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLENBQUMsQ0FBQyxDQUFTO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDbkIsQ0FBQztDQU1GO0FBRVEsNEJBQVE7Ozs7Ozs7Ozs7Ozs7QUM1Q2pCLHdGQUFrRDtBQUNsRCwrRUFBMEc7QUFFMUcsTUFBcUIsaUJBQWtCLFNBQVEsbUJBQVE7SUFJckQsWUFBbUIsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNwRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07SUFDdEIsQ0FBQztJQUVNLG9CQUFvQjtRQUN6QixNQUFNLEVBQ0osTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUNqQixHQUFHLElBQUk7UUFDUixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQzFELENBQUM7SUFFTSxZQUFZLENBQUMsS0FBZTtRQUNqQyxJQUFJLG9CQUFRLEVBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxzQ0FBMEIsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO1NBQy9DO2FBQU0sSUFBSSx1QkFBVyxFQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdCLE9BQU8seUNBQTZCLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNsRDtRQUNELE9BQU8sS0FBSztJQUNkLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUN4QixDQUFDO0NBQ0Y7QUFqQ0QsdUNBaUNDOzs7Ozs7Ozs7Ozs7OztBQ3BDRCwwR0FBNkM7QUFJcEMseUJBSkYsd0JBQWMsQ0FJRTtBQUh2QixtSEFBbUQ7QUFHMUIsNEJBSGxCLDJCQUFpQixDQUdrQjtBQUYxQyx3RkFBa0Q7QUFFTywwRkFGaEQsbUJBQVEsUUFFZ0Q7Ozs7Ozs7Ozs7Ozs7O0FDQWpFLFNBQWdCLFFBQVEsQ0FBQyxRQUFrQjtJQUN6QyxPQUFRLFFBQTJCLENBQUMsTUFBTSxLQUFLLFNBQVM7QUFDMUQsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLFFBQWtCO0lBQzVDLE9BQVEsUUFBOEIsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFLLFFBQThCLENBQUMsTUFBTSxLQUFLLFNBQVM7QUFDcEgsQ0FBQztBQUZELGtDQUVDO0FBRUQsU0FBZ0IsdUJBQXVCLENBQUMsRUFBa0IsRUFBRSxFQUFrQjtJQUM1RSxPQUFPLFVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBSSxDQUFDLElBQUcsVUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFJLENBQUMsS0FBSSxVQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUM7QUFDNUcsQ0FBQztBQUZELDBEQUVDO0FBRUQsU0FBZ0IsMEJBQTBCLENBQUMsSUFBb0IsRUFBRSxJQUF1QjtJQUN0RixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0lBQ3ZFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7SUFFeEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNoRCxPQUFPLEtBQUs7S0FDYjtTQUFNLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sSUFBSTtLQUNaO0lBQ0QsT0FBTyxlQUFNLEVBQUksQ0FBQyxJQUFHLGVBQU0sRUFBSSxDQUFDLEtBQUksYUFBSSxDQUFDLE1BQU0sRUFBSSxDQUFDO0FBQ3RELENBQUM7QUFWRCxnRUFVQztBQUVELFNBQWdCLDZCQUE2QixDQUFDLEtBQXdCLEVBQUUsS0FBd0I7SUFDOUYsT0FBTyxDQUNMLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLO1FBQzlDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNO1FBQy9DLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ2hEO0FBQ0gsQ0FBQztBQVBELHNFQU9DOzs7Ozs7Ozs7Ozs7OztBQ25DRCx1RkFBc0Y7QUFFdEYsTUFBZSxVQUFVO0NBR3hCO0FBRUQsTUFBZSxrQkFBdUMsU0FBUSxVQUFhO0lBR3pFLFlBQVksS0FBYTtRQUN2QixLQUFLLEVBQUU7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUs7SUFDcEIsQ0FBQztJQUVELGtEQUFrRDtJQUN4QyxJQUFJLENBQUMsWUFBeUI7UUFDdEMsTUFBTSxFQUNKLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUNyQixHQUFHLElBQUk7UUFFUixJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLE9BQU07U0FDUDthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNSLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLENBQUM7Z0JBQ0wsQ0FBQyxHQUFHLE1BQU07YUFDWDtpQkFBTTtnQkFDTCxNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsTUFBTTtnQkFDN0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQUssRUFBSSxDQUFDLElBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN6QixDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7YUFDZDtZQUVELE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQzNDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBRTNDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUErQixTQUFRLGtCQUFxQjtJQU1oRSxZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsUUFBVyxFQUFFLE1BQW9ELEVBQUUsTUFBYztRQUMxSCxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUTtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO0lBQ3RCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBMEsrQixnQ0FBVTtBQW5KMUMsTUFBTSxRQUE2QixTQUFRLGtCQUFxQjtJQUs5RCxZQUFZLFFBQVcsRUFBRSxTQUFnQixFQUFFLFNBQWlCLEVBQUUsWUFBMEI7UUFDdEYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZO0lBQ2xDLENBQUM7SUFFRCxJQUFXLENBQUM7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBVyxDQUFDO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxNQUFjO1FBQzlCLG9CQUFvQjtRQUNwQixJQUFJLGdCQUFnQixHQUFHLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDN0IsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUMzRDthQUFNO1lBQ0wsZ0JBQWdCLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3ZEO1FBRUQsMkJBQTJCO1FBQzNCLElBQUksc0JBQXNCLEdBQUcsQ0FBQztRQUU5QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUNsQyxzQkFBc0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1NBQ3ZFO2FBQU07WUFDTCxzQkFBc0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7U0FDbkU7UUFFRCxJQUFJLFdBQVcsR0FBRyxnQkFBZ0IsR0FBRyxzQkFBc0I7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDeEIsV0FBVyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksbUJBQW1CLFdBQVcsRUFBRSxDQUFDO0lBQ25ILENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO0lBQzNJLENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO0lBQzFHLENBQUM7SUFFTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxZQUFZLHFCQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFO0lBQ2pELENBQUM7Q0FDRjtBQW9GcUIsNEJBQVE7QUFsRjlCLE1BQU0sUUFBNkIsU0FBUSxRQUFXO0lBR3BELFlBQVksU0FBZ0IsRUFBRSxRQUFXLEVBQUUsU0FBaUIsRUFBRSxLQUFjLEVBQUUsWUFBMEI7UUFDdEcsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFO0lBQy9CLENBQUM7SUFFTyxzQkFBc0I7UUFDNUIscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyw4REFBOEQ7UUFDOUQsSUFBSTtJQUNOLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNaLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtJQUMvQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLGVBQWU7SUFHbkIsZ0JBQXVCLENBQUM7SUFFakIsTUFBTSxDQUFDLEdBQUc7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUM3QixlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFO1NBQ2pEO1FBQ0QsT0FBTyxlQUFlLENBQUMsUUFBUTtJQUNqQyxDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQVksRUFBRSxTQUFpQjtRQUNoRCxPQUFPO1lBQ0wsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixtQkFBTSxLQUFLLEdBQUksU0FBUyxDQUFDO1lBQ3BFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsbUJBQU0sS0FBSyxHQUFJLFNBQVMsQ0FBQztTQUMzRTtJQUNILENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFZLEVBQUUsU0FBaUI7UUFDM0QsT0FBTyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxFQUFFO1lBQzdELE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksNkJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQ3ZFLE9BQU87Z0JBQ0wsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUM7Z0JBQzNFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFZLEVBQUUsU0FBaUI7UUFDeEQsT0FBTyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsTUFBYyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSwwQkFBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO1lBQzdELE9BQU87Z0JBQ0wsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUM7Z0JBQzNFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxRQUFrQixFQUFFLEtBQVksRUFBRSxTQUFpQjtRQUMxRSxPQUFPLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFO1lBQzlCLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2hFO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWMyQywwQ0FBZTs7Ozs7OztVQzFPM0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLHVGQUErRDtBQUMvRCxxRUFBd0k7QUFFeEksTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCO0FBQ3hFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUE2QjtBQUNuRSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUNqRCxXQUFXLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBQyxpQkFBaUI7QUFDOUMsTUFBTSxHQUFHLEdBQUcsR0FBRztBQUVmLE1BQU0sU0FBUyxHQUFjO0lBQzNCLE1BQU0sRUFBRSxZQUFZLEVBQUU7SUFDdEIsVUFBVSxFQUFFLENBQUM7SUFDYixnQkFBZ0IsRUFBRSxDQUFDO0lBQ25CLE9BQU8sRUFBRSxFQUFFO0lBQ1gsV0FBVyxFQUFFLEVBQUU7Q0FDaEI7QUFFRCxTQUFTLFlBQVk7SUFDbkIsTUFBTSxXQUFXLEdBQVU7UUFDekIsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsSUFBSTtRQUNqQixLQUFLLEVBQUUsQ0FBQztRQUNSLFdBQVcsRUFBRSxDQUFDO1FBQ2QsYUFBYSxFQUFFLENBQUM7UUFDaEIsU0FBUyxFQUFFLEdBQUc7UUFDZCxNQUFNLEVBQUUsR0FBRztLQUNaO0lBQ0QsT0FBTyx1QkFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ3hHLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUN4QyxNQUFNLFdBQVcsR0FBVTtRQUN6QixZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxHQUFHO1FBQ2pCLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLEtBQUssRUFBRSxFQUFFO1FBQ1QsV0FBVyxFQUFFLENBQUM7UUFDZCxhQUFhLEVBQUUsQ0FBQztRQUNoQixTQUFTLEVBQUUsR0FBRztRQUNkLE1BQU0sRUFBRSxHQUFHO0tBQ1o7SUFDRCxPQUFPLHVCQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDdkcsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBbUIsRUFBRSxNQUFvRCxFQUFFLE1BQWM7SUFDakgsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLDBCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7QUFDekYsQ0FBQztBQUVELFNBQVMsS0FBSztJQUNaLElBQUksRUFBRTtJQUNOLFFBQVEsRUFBRTtBQUNaLENBQUM7QUFFRCxTQUFTLFFBQVE7SUFDZixNQUFNLEVBQUU7SUFDUixNQUFNLEVBQUU7SUFDUixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QscUJBQXFCLENBQUMsUUFBUSxDQUFDO0lBQ2pDLENBQUMsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLE1BQU07SUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3BELGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQ2hDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDeEMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFDaEMsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE1BQWM7SUFDbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNqSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7SUFDMUIsZUFBZSxDQUFDLE1BQU0sQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxXQUErQjtJQUN4RCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDakMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPO1FBQzNCLE1BQU0sRUFDSixRQUFRLEVBQUUsRUFDUixNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQ2hCLE1BQU0sR0FDUCxHQUNGLEdBQUcsVUFBVTtRQUNkLE9BQU8sQ0FBQyxTQUFTLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNkLE9BQU8sQ0FBQyxTQUFTLEVBQUU7SUFDckIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLE9BQWlCO0lBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVE7UUFDNUIsTUFBTSxFQUNKLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQ3BDLEdBQUcsTUFBTTtRQUNWLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7UUFDbkQsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzFCLGVBQWUsQ0FBQyxNQUFNLENBQUM7SUFDekIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsUUFBcUM7SUFDL0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPO0lBQzNCLE1BQU0sRUFDSixRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQzVCLEdBQUcsUUFBUTtJQUNaLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxRQUFxQztJQUM1RCxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVE7SUFDNUIsTUFBTSxFQUNKLFNBQVMsRUFDVCxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQzVCLEdBQUcsUUFBUTtJQUNaLE1BQU0sYUFBYSxHQUFHLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUN0RSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsU0FBUyxNQUFNO0lBQ2IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDekIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsRSwrQkFBK0IsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3RELGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsK0JBQStCLENBQUMsWUFBZ0M7SUFDdkUsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3ZFLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDekIsT0FBTyxLQUFLO1NBQ2I7YUFBTTtZQUNMLE9BQU8sSUFBSTtTQUNaO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsU0FBUyxDQUFDLFdBQVcsR0FBRyxXQUFXO0FBQ3JDLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxRQUFrQixFQUFFLFlBQTBDO0lBQ25GLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN6QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNqQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3JCLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsT0FBTyxJQUFJO2FBQ1o7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLO2FBQ2I7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJO1NBQ1o7SUFDSCxDQUFDLENBQUM7SUFFRixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDN0IsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLE1BQWM7SUFDbkMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU07SUFDNUIsU0FBUyxDQUFDLFVBQVUsSUFBSSxTQUFTO0lBQ2pDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtBQUM5QixDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQy9DLEtBQUssQ0FBQyxjQUFjLEVBQUU7UUFDdEIsS0FBSyxDQUFDLGVBQWUsRUFBRTtJQUN6QixDQUFDLENBQUM7SUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDM0MsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdkMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ3pCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQWdDO0lBQ3pFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxTQUFTO0lBRTVCLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUNwQixNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEQsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdEY7YUFBTTtZQUNMLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQjtLQUNGO1NBQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQzFCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsS0FBaUI7SUFDNUMsT0FBTztRQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVO1FBQ3BDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTO0tBQ3BDO0FBQ0gsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsQ0FBUyxFQUFFLENBQVM7SUFDNUMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ25DLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FDOUg7SUFDRCxPQUFPLE1BQU0sSUFBSSxJQUFJO0FBQ3ZCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUNyQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE1BQW1CLEVBQUUsTUFBYyxFQUFFLE1BQWM7SUFDM0UsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDM0QsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3RDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ2pDLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxNQUFjO0lBQ2xDLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxDQUFDO1lBQ0osT0FBTyxNQUFNO1FBQ2YsS0FBSyxDQUFDO1lBQ0osT0FBTyxPQUFPO1FBQ2hCO1lBQ0UsT0FBTyxPQUFPO0tBQ2pCO0FBQ0gsQ0FBQztBQUVELEtBQUssRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyZW5hLWdnLy4vc3JjL2NvbGxpZGVycy9DaXJjbGVDb2xsaWRlci50cyIsIndlYnBhY2s6Ly9hcmVuYS1nZy8uL3NyYy9jb2xsaWRlcnMvQ29sbGlkZXIudHMiLCJ3ZWJwYWNrOi8vYXJlbmEtZ2cvLi9zcmMvY29sbGlkZXJzL1JlY3RhbmdsZUNvbGxpZGVyLnRzIiwid2VicGFjazovL2FyZW5hLWdnLy4vc3JjL2NvbGxpZGVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9hcmVuYS1nZy8uL3NyYy9jb2xsaWRlcnMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vYXJlbmEtZ2cvLi9zcmMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vYXJlbmEtZ2cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXJlbmEtZ2cvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGlkZXIsIENvb3JkaW5hdGVzIH0gZnJvbSBcIi4vQ29sbGlkZXJcIlxyXG5pbXBvcnQgeyBpc0NpcmNsZSwgaXNSZWN0YW5nbGUsIGNpcmNsZVRvQ2lyY2xlQ29sbGlzaW9uLCBjaXJjbGVUb1JlY3RhbmdsZUNvbGxpc2lvbiB9IGZyb20gXCIuL3V0aWxzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZUNvbGxpZGVyIGV4dGVuZHMgQ29sbGlkZXIge1xyXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlclxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICBzdXBlcih4LCB5KVxyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXNcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDZW50ZXJDb29yZGluYXRlcygpOiBDb29yZGluYXRlcyB7XHJcbiAgICByZXR1cm4geyAuLi50aGlzLmNvb3JkcyB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29sbGlkZXNXaXRoKG90aGVyOiBDb2xsaWRlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGlzQ2lyY2xlKG90aGVyKSkge1xyXG4gICAgICByZXR1cm4gY2lyY2xlVG9DaXJjbGVDb2xsaXNpb24odGhpcywgb3RoZXIpXHJcbiAgICB9IGVsc2UgaWYgKGlzUmVjdGFuZ2xlKG90aGVyKSkge1xyXG4gICAgICByZXR1cm4gY2lyY2xlVG9SZWN0YW5nbGVDb2xsaXNpb24odGhpcywgb3RoZXIpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDZW50ZXJYT2Zmc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmFkaXVzXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2VudGVyWU9mZnNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJhZGl1c1xyXG4gIH1cclxufVxyXG4iLCJpbnRlcmZhY2UgQ29vcmRpbmF0ZXMge1xyXG4gIHg6IG51bWJlclxyXG4gIHk6IG51bWJlclxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBDb2xsaWRlciB7XHJcbiAgcHVibGljIGNvb3JkczogQ29vcmRpbmF0ZXNcclxuXHJcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMuY29vcmRzID0geyB4LCB5IH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0F0Q2VudGVyT2Yob3RoZXI6IENvbGxpZGVyKSB7XHJcbiAgICBjb25zdCBvdGhlckNlbnRlckNvb3JkcyA9IG90aGVyLmdldENlbnRlckNvb3JkaW5hdGVzKClcclxuICAgIHJldHVybiB0aGlzLmlzQXQob3RoZXJDZW50ZXJDb29yZHMpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBdChvdGhlckNvb3JkczogQ29vcmRpbmF0ZXMpIHtcclxuICAgIGNvbnN0IGNlbnRlckNvb3JkcyA9IHRoaXMuZ2V0Q2VudGVyQ29vcmRpbmF0ZXMoKVxyXG4gICAgcmV0dXJuIG90aGVyQ29vcmRzLnggPT09IGNlbnRlckNvb3Jkcy54ICYmIG90aGVyQ29vcmRzLnkgPT09IGNlbnRlckNvb3Jkcy55XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb29yZHMueFxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCB4KHg6IG51bWJlcikge1xyXG4gICAgdGhpcy5jb29yZHMueCA9IHhcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvb3Jkcy55XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHkoeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmNvb3Jkcy55ID0geVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFic3RyYWN0IGNvbGxpZGVzV2l0aChvdGhlcjogQ29sbGlkZXIpOiBib29sZWFuXHJcbiAgcHVibGljIGFic3RyYWN0IGdldENlbnRlckNvb3JkaW5hdGVzKCk6IENvb3JkaW5hdGVzXHJcbiAgcHVibGljIGFic3RyYWN0IGdldENlbnRlclhPZmZzZXQoKTogbnVtYmVyXHJcbiAgcHVibGljIGFic3RyYWN0IGdldENlbnRlcllPZmZzZXQoKTogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbGxpZGVyLCBDb29yZGluYXRlcyB9XHJcbiIsImltcG9ydCB7IENvbGxpZGVyLCBDb29yZGluYXRlcyB9IGZyb20gXCIuL0NvbGxpZGVyXCJcclxuaW1wb3J0IHsgY2lyY2xlVG9SZWN0YW5nbGVDb2xsaXNpb24sIGlzQ2lyY2xlLCBpc1JlY3RhbmdsZSwgcmVjdGFuZ2xlVG9SZWN0YW5nbGVDb2xsaXNpb24gfSBmcm9tIFwiLi91dGlsc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGVDb2xsaWRlciBleHRlbmRzIENvbGxpZGVyIHtcclxuICBwdWJsaWMgd2lkdGg6IG51bWJlclxyXG4gIHB1YmxpYyBoZWlnaHQ6IG51bWJlclxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICBzdXBlcih4LCB5KVxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENlbnRlckNvb3JkaW5hdGVzKCk6IENvb3JkaW5hdGVzIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29vcmRzOiB7IHgsIHkgfSxcclxuICAgIH0gPSB0aGlzXHJcbiAgICByZXR1cm4geyB4OiB4ICsgdGhpcy53aWR0aCAvIDIsIHk6IHkgKyB0aGlzLmhlaWdodCAvIDIgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbGxpZGVzV2l0aChvdGhlcjogQ29sbGlkZXIpOiBib29sZWFuIHtcclxuICAgIGlmIChpc0NpcmNsZShvdGhlcikpIHtcclxuICAgICAgcmV0dXJuIGNpcmNsZVRvUmVjdGFuZ2xlQ29sbGlzaW9uKG90aGVyLCB0aGlzKVxyXG4gICAgfSBlbHNlIGlmIChpc1JlY3RhbmdsZShvdGhlcikpIHtcclxuICAgICAgcmV0dXJuIHJlY3RhbmdsZVRvUmVjdGFuZ2xlQ29sbGlzaW9uKHRoaXMsIG90aGVyKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2VudGVyWE9mZnNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLndpZHRoIC8gMlxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENlbnRlcllPZmZzZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oZWlnaHQgLyAyXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBDaXJjbGVDb2xsaWRlciBmcm9tIFwiLi9DaXJjbGVDb2xsaWRlclwiXHJcbmltcG9ydCBSZWN0YW5nbGVDb2xsaWRlciBmcm9tIFwiLi9SZWN0YW5nbGVDb2xsaWRlclwiXHJcbmltcG9ydCB7IENvbGxpZGVyLCBDb29yZGluYXRlcyB9IGZyb20gXCIuL0NvbGxpZGVyXCJcclxuXHJcbmV4cG9ydCB7IENpcmNsZUNvbGxpZGVyLCBSZWN0YW5nbGVDb2xsaWRlciwgQ29vcmRpbmF0ZXMsIENvbGxpZGVyIH1cclxuIiwiaW1wb3J0IHsgQ29sbGlkZXIgfSBmcm9tIFwiLi9Db2xsaWRlclwiXHJcbmltcG9ydCBDaXJjbGVDb2xsaWRlciBmcm9tIFwiLi9DaXJjbGVDb2xsaWRlclwiXHJcbmltcG9ydCBSZWN0YW5nbGVDb2xsaWRlciBmcm9tIFwiLi9SZWN0YW5nbGVDb2xsaWRlclwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNDaXJjbGUoY29sbGlkZXI6IENvbGxpZGVyKTogY29sbGlkZXIgaXMgQ2lyY2xlQ29sbGlkZXIge1xyXG4gIHJldHVybiAoY29sbGlkZXIgYXMgQ2lyY2xlQ29sbGlkZXIpLnJhZGl1cyAhPT0gdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1JlY3RhbmdsZShjb2xsaWRlcjogQ29sbGlkZXIpOiBjb2xsaWRlciBpcyBSZWN0YW5nbGVDb2xsaWRlciB7XHJcbiAgcmV0dXJuIChjb2xsaWRlciBhcyBSZWN0YW5nbGVDb2xsaWRlcikud2lkdGggIT09IHVuZGVmaW5lZCAmJiAoY29sbGlkZXIgYXMgUmVjdGFuZ2xlQ29sbGlkZXIpLmhlaWdodCAhPT0gdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaXJjbGVUb0NpcmNsZUNvbGxpc2lvbihjMTogQ2lyY2xlQ29sbGlkZXIsIGMyOiBDaXJjbGVDb2xsaWRlcik6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoYzEuY29vcmRzLnggLSBjMi5jb29yZHMueCkgKiogMiArIChjMS5jb29yZHMueSAtIGMyLmNvb3Jkcy55KSAqKiAyIDw9IChjMS5yYWRpdXMgKyBjMi5yYWRpdXMpICoqIDJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNpcmNsZVRvUmVjdGFuZ2xlQ29sbGlzaW9uKGNpcmM6IENpcmNsZUNvbGxpZGVyLCByZWN0OiBSZWN0YW5nbGVDb2xsaWRlcik6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKGNpcmMuY29vcmRzLnggLSByZWN0LmNvb3Jkcy54KSAtIHJlY3Qud2lkdGggLyAyXHJcbiAgY29uc3QgZGVsdGFZID0gTWF0aC5hYnMoY2lyYy5jb29yZHMueSAtIHJlY3QuY29vcmRzLnkpIC0gcmVjdC5oZWlnaHQgLyAyXHJcblxyXG4gIGlmIChkZWx0YVggPiBjaXJjLnJhZGl1cyB8fCBkZWx0YVkgPiBjaXJjLnJhZGl1cykge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfSBlbHNlIGlmIChkZWx0YVggPD0gMCB8fCBkZWx0YVkgPD0gMCkge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgcmV0dXJuIGRlbHRhWCAqKiAyICsgZGVsdGFZICoqIDIgPD0gY2lyYy5yYWRpdXMgKiogMlxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjdGFuZ2xlVG9SZWN0YW5nbGVDb2xsaXNpb24ocmVjdDE6IFJlY3RhbmdsZUNvbGxpZGVyLCByZWN0MjogUmVjdGFuZ2xlQ29sbGlkZXIpOiBib29sZWFuIHtcclxuICByZXR1cm4gKFxyXG4gICAgcmVjdDEuY29vcmRzLnggPD0gcmVjdDIuY29vcmRzLnggKyByZWN0Mi53aWR0aCAmJlxyXG4gICAgcmVjdDEuY29vcmRzLnggKyByZWN0MS53aWR0aCA+PSByZWN0Mi5jb29yZHMueCAmJlxyXG4gICAgcmVjdDEuY29vcmRzLnkgPD0gcmVjdDIuY29vcmRzLnkgKyByZWN0Mi5oZWlnaHQgJiZcclxuICAgIHJlY3QxLmNvb3Jkcy55ICsgcmVjdDEuaGVpZ2h0ID49IHJlY3QyLmNvb3Jkcy55XHJcbiAgKVxyXG59XHJcbiIsImltcG9ydCB7IENpcmNsZUNvbGxpZGVyLCBSZWN0YW5nbGVDb2xsaWRlciwgQ29sbGlkZXIsIENvb3JkaW5hdGVzIH0gZnJvbSBcIi4vY29sbGlkZXJzXCJcclxuXHJcbmFic3RyYWN0IGNsYXNzIEdhbWVPYmplY3Q8VCBleHRlbmRzIENvbGxpZGVyPiB7XHJcbiAgcHVibGljIGNvbGxpZGVyOiBUXHJcbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZSgpOiB2b2lkXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIE1vdmVhYmxlR2FtZU9iamVjdDxUIGV4dGVuZHMgQ29sbGlkZXI+IGV4dGVuZHMgR2FtZU9iamVjdDxUPiB7XHJcbiAgcHVibGljIHNwZWVkOiBudW1iZXJcclxuXHJcbiAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkXHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGVzIGNyZWF0dXJlIGNvb3JkaW5hdGVzIGZvciBhIHNpbmdsZSBmcmFtZVxyXG4gIHByb3RlY3RlZCBzdGVwKHRhcmdldENvb3JkczogQ29vcmRpbmF0ZXMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29sbGlkZXI6IHsgY29vcmRzIH0sXHJcbiAgICB9ID0gdGhpc1xyXG5cclxuICAgIGlmICghdGFyZ2V0Q29vcmRzKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfSBlbHNlIGlmICghdGhpcy5jb2xsaWRlci5pc0F0KHRhcmdldENvb3JkcykpIHtcclxuICAgICAgY29uc3QgZGVsdGFZID0gdGFyZ2V0Q29vcmRzLnkgLSBjb29yZHMueVxyXG4gICAgICBjb25zdCBkZWx0YVggPSB0YXJnZXRDb29yZHMueCAtIGNvb3Jkcy54XHJcblxyXG4gICAgICBsZXQgeCwgeVxyXG4gICAgICBpZiAoZGVsdGFYID09PSAwKSB7XHJcbiAgICAgICAgeCA9IDBcclxuICAgICAgICB5ID0gZGVsdGFZXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xvcGUgPSBkZWx0YVkgLyBkZWx0YVhcclxuICAgICAgICBjb25zdCB0ID0gdGhpcy5zcGVlZCAvIE1hdGguc3FydChzbG9wZSAqKiAyICsgMSlcclxuICAgICAgICB4ID0gdCAqIE1hdGguc2lnbihkZWx0YVgpXHJcbiAgICAgICAgeSA9IHNsb3BlICogeFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtaW5NYXhYID0geCA+IDAgPyBNYXRoLm1pbiA6IE1hdGgubWF4XHJcbiAgICAgIGNvbnN0IG1pbk1heFkgPSB5ID4gMCA/IE1hdGgubWluIDogTWF0aC5tYXhcclxuXHJcbiAgICAgIHRoaXMuY29sbGlkZXIueCA9IG1pbk1heFgoY29vcmRzLnggKyB4LCB0YXJnZXRDb29yZHMueClcclxuICAgICAgdGhpcy5jb2xsaWRlci55ID0gbWluTWF4WShjb29yZHMueSArIHksIHRhcmdldENvb3Jkcy55KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUHJvamVjdGlsZTxUIGV4dGVuZHMgQ29sbGlkZXI+IGV4dGVuZHMgTW92ZWFibGVHYW1lT2JqZWN0PFQ+IHtcclxuICBwdWJsaWMgZGFtYWdlOiBudW1iZXJcclxuICBwdWJsaWMgY29sbGlkZXI6IFRcclxuICBwdWJsaWMgdGFyZ2V0OiBDcmVhdHVyZTxSZWN0YW5nbGVDb2xsaWRlciB8IENpcmNsZUNvbGxpZGVyPlxyXG4gIHB1YmxpYyBhdHRhY2s6IEF0dGFja1xyXG5cclxuICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyLCBkYW1hZ2U6IG51bWJlciwgY29sbGlkZXI6IFQsIHRhcmdldDogQ3JlYXR1cmU8UmVjdGFuZ2xlQ29sbGlkZXIgfCBDaXJjbGVDb2xsaWRlcj4sIGF0dGFjazogQXR0YWNrKSB7XHJcbiAgICBzdXBlcihzcGVlZClcclxuICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXJcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0XHJcbiAgICB0aGlzLmF0dGFjayA9IGF0dGFja1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0ZXAodGhpcy50YXJnZXQuY29sbGlkZXIuZ2V0Q2VudGVyQ29vcmRpbmF0ZXMoKSlcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBBdHRhY2sge1xyXG4gIHBoeXNpY2FsRGFtYWdlOiBudW1iZXJcclxuICBtYWdpY0RhbWFnZTogbnVtYmVyXHJcbiAgYXR0YWNrU3BlZWQ6IG51bWJlclxyXG4gIC8vIGFybW9yIHBlbiwgbWFnaWMgcGVuXHJcbn1cclxuXHJcbmludGVyZmFjZSBTdGF0cyB7XHJcbiAgaGVhbHRoOiBudW1iZXJcclxuICBtYXhIZWFsdGg6IG51bWJlclxyXG4gIG1vdmVtZW50U3BlZWQ6IG51bWJlclxyXG4gIGF0dGFja0RhbWFnZTogbnVtYmVyXHJcbiAgYWJpbGl0eVBvd2VyOiBudW1iZXJcclxuICBhcm1vcjogbnVtYmVyXHJcbiAgbWFnaWNSZXNpc3Q6IG51bWJlclxyXG4gIGF0dGFja1NwZWVkOiBudW1iZXJcclxuICAvLyBUT0RPOlxyXG4gIC8vIHJlc2VhcmNoIGFsbCBwb3NzaWJsZSBzdGF0c1xyXG4gIC8vIGF0dGFjayBzcGVlZCwgY3JpdCBjaGFuY2UsIGNyaXQgZG1nLCBtcDUsIGhwNVxyXG59XHJcblxyXG5jbGFzcyBDcmVhdHVyZTxUIGV4dGVuZHMgQ29sbGlkZXI+IGV4dGVuZHMgTW92ZWFibGVHYW1lT2JqZWN0PFQ+IHtcclxuICBwdWJsaWMgYmFzZVN0YXRzOiBTdGF0c1xyXG4gIHB1YmxpYyBnb2xkVmFsdWU6IG51bWJlclxyXG4gIHB1YmxpYyB0YXJnZXRDb29yZHM/OiBDb29yZGluYXRlc1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb2xsaWRlcjogVCwgYmFzZVN0YXRzOiBTdGF0cywgZ29sZFZhbHVlOiBudW1iZXIsIHRhcmdldENvb3Jkcz86IENvb3JkaW5hdGVzKSB7XHJcbiAgICBzdXBlcihiYXNlU3RhdHMubW92ZW1lbnRTcGVlZClcclxuICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlclxyXG4gICAgdGhpcy5iYXNlU3RhdHMgPSBiYXNlU3RhdHNcclxuICAgIHRoaXMuZ29sZFZhbHVlID0gZ29sZFZhbHVlXHJcbiAgICB0aGlzLnRhcmdldENvb3JkcyA9IHRhcmdldENvb3Jkc1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sbGlkZXIueFxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sbGlkZXIueVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRha2VEYW1hZ2UoYXR0YWNrOiBBdHRhY2spIHtcclxuICAgIC8vIEFybW9yIENhbGN1bGF0aW9uXHJcbiAgICBsZXQgZGFtYWdlQWZ0ZXJBcm1vciA9IDBcclxuXHJcbiAgICBpZiAodGhpcy5iYXNlU3RhdHMuYXJtb3IgPD0gMCkge1xyXG4gICAgICBkYW1hZ2VBZnRlckFybW9yICs9IDIgLSAxMDAgLyAoMTAwIC0gdGhpcy5iYXNlU3RhdHMuYXJtb3IpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYW1hZ2VBZnRlckFybW9yICs9IDEwMCAvICgxMDAgLSB0aGlzLmJhc2VTdGF0cy5hcm1vcilcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYWdpYyBSZXNpc3QgQ2FsY3VsYXRpb25cclxuICAgIGxldCBkYW1hZ2VBZnRlck1hZ2ljUmVzaXN0ID0gMFxyXG5cclxuICAgIGlmICh0aGlzLmJhc2VTdGF0cy5tYWdpY1Jlc2lzdCA8IDApIHtcclxuICAgICAgZGFtYWdlQWZ0ZXJNYWdpY1Jlc2lzdCArPSAyIC0gMTAwIC8gKDEwMCAtIHRoaXMuYmFzZVN0YXRzLm1hZ2ljUmVzaXN0KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGFtYWdlQWZ0ZXJNYWdpY1Jlc2lzdCArPSAxMDAgLyAoMTAwIC0gdGhpcy5iYXNlU3RhdHMubWFnaWNSZXNpc3QpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRvdGFsRGFtYWdlID0gZGFtYWdlQWZ0ZXJBcm1vciArIGRhbWFnZUFmdGVyTWFnaWNSZXNpc3RcclxuICAgIGNvbnNvbGUubG9nKHRvdGFsRGFtYWdlKVxyXG4gICAgdG90YWxEYW1hZ2UgKz0gTWF0aC5tYXgoMCwgYXR0YWNrLnBoeXNpY2FsRGFtYWdlIC0gdGhpcy5iYXNlU3RhdHMuYXJtb3IpXHJcbiAgICBjb25zb2xlLmxvZyh0b3RhbERhbWFnZSlcclxuICAgIHRoaXMuYmFzZVN0YXRzLmhlYWx0aCA9IE1hdGgubWF4KDAsIHRoaXMuYmFzZVN0YXRzLmhlYWx0aCAtIHRvdGFsRGFtYWdlKVxyXG4gICAgY29uc29sZS5sb2coYGhlYWx0aDogJHt0aGlzLmJhc2VTdGF0cy5oZWFsdGh9LCBBRDogJHt0aGlzLmJhc2VTdGF0cy5hdHRhY2tEYW1hZ2V9LCBkYW1hZ2UgZ2l2ZW46ICR7dG90YWxEYW1hZ2V9YClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdXRvQXR0YWNrKCk6IEF0dGFjayB7XHJcbiAgICByZXR1cm4geyBwaHlzaWNhbERhbWFnZTogdGhpcy5iYXNlU3RhdHMuYXR0YWNrRGFtYWdlLCBtYWdpY0RhbWFnZTogdGhpcy5iYXNlU3RhdHMuYWJpbGl0eVBvd2VyLCBhdHRhY2tTcGVlZDogdGhpcy5iYXNlU3RhdHMuYXR0YWNrU3BlZWQgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuc3RlcCh0aGlzLnRhcmdldENvb3JkcylcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMudGFyZ2V0Q29vcmRzID0geyB4OiB4IC0gdGhpcy5jb2xsaWRlci5nZXRDZW50ZXJYT2Zmc2V0KCksIHk6IHkgLSB0aGlzLmNvbGxpZGVyLmdldENlbnRlcllPZmZzZXQoKSB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcE1vdmVtZW50KCkge1xyXG4gICAgdGhpcy50YXJnZXRDb29yZHMgPSB7IC4uLnRoaXMuY29sbGlkZXIuY29vcmRzIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENoYW1waW9uPFQgZXh0ZW5kcyBDb2xsaWRlcj4gZXh0ZW5kcyBDcmVhdHVyZTxUPiB7XHJcbiAgcHVibGljIGxldmVsOiBudW1iZXJcclxuXHJcbiAgY29uc3RydWN0b3IoYmFzZVN0YXRzOiBTdGF0cywgY29sbGlkZXI6IFQsIGdvbGRWYWx1ZTogbnVtYmVyLCBsZXZlbD86IG51bWJlciwgdGFyZ2V0Q29vcmRzPzogQ29vcmRpbmF0ZXMpIHtcclxuICAgIHN1cGVyKGNvbGxpZGVyLCBiYXNlU3RhdHMsIGdvbGRWYWx1ZSwgdGFyZ2V0Q29vcmRzKVxyXG4gICAgdGhpcy5sZXZlbCA9IGxldmVsID8/IDFcclxuICAgIHRoaXMuY2FsY3VsYXRlU3RhdHNGb3JMZXZlbCgpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZVN0YXRzRm9yTGV2ZWwoKSB7XHJcbiAgICAvLyB0aGlzLmJhc2VTdGF0cyA9IHtcclxuICAgIC8vICAgICAvLyBzZXQgc3RhdHMgYmFzZWQgb24gbGV2ZWxcclxuICAgIC8vICAgICBhdHRhY2tEYW1hZ2U6IHRoaXMuYmFzZVN0YXRzLmF0dGFja0RhbWFnZSAqIHRoaXMubGV2ZWwsXHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbGV2ZWxVcCgpIHtcclxuICAgIHRoaXMubGV2ZWwrK1xyXG4gICAgdGhpcy5jYWxjdWxhdGVTdGF0c0ZvckxldmVsKClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENyZWF0dXJlRmFjdG9yeSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENyZWF0dXJlRmFjdG9yeVxyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQoKSB7XHJcbiAgICBpZiAoIUNyZWF0dXJlRmFjdG9yeS5pbnN0YW5jZSkge1xyXG4gICAgICBDcmVhdHVyZUZhY3RvcnkuaW5zdGFuY2UgPSBuZXcgQ3JlYXR1cmVGYWN0b3J5KClcclxuICAgIH1cclxuICAgIHJldHVybiBDcmVhdHVyZUZhY3RvcnkuaW5zdGFuY2VcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZXdDcmVhdHVyZShzdGF0czogU3RhdHMsIGdvbGRWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aXRoQ2lyY2xlQ29sbGlkZXI6IHRoaXMud2l0aENpcmNsZUNvbGxpZGVyKHsgLi4uc3RhdHMgfSwgZ29sZFZhbHVlKSxcclxuICAgICAgd2l0aFJlY3RhbmdsZUNvbGxpZGVyOiB0aGlzLndpdGhSZWN0YW5nbGVDb2xsaWRlcih7IC4uLnN0YXRzIH0sIGdvbGRWYWx1ZSksXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHdpdGhSZWN0YW5nbGVDb2xsaWRlcihzdGF0czogU3RhdHMsIGdvbGRWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikgPT4ge1xyXG4gICAgICBjb25zdCBjcmVhdGVDb2xsaWRlciA9ICgpID0+IG5ldyBSZWN0YW5nbGVDb2xsaWRlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHdpdGhUYXJnZXRDb29yZHM6IHRoaXMud2l0aFRhcmdldENvb3JkcyhjcmVhdGVDb2xsaWRlcigpLCBzdGF0cywgZ29sZFZhbHVlKSxcclxuICAgICAgICBidWlsZDogKCkgPT4gbmV3IENyZWF0dXJlKGNyZWF0ZUNvbGxpZGVyKCksIHN0YXRzLCBnb2xkVmFsdWUpLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHdpdGhDaXJjbGVDb2xsaWRlcihzdGF0czogU3RhdHMsIGdvbGRWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKHg6IG51bWJlciwgeTogbnVtYmVyLCByYWRpdXM6IG51bWJlcikgPT4ge1xyXG4gICAgICBjb25zdCBjcmVhdGVDb2xsaWRlciA9ICgpID0+IG5ldyBDaXJjbGVDb2xsaWRlcih4LCB5LCByYWRpdXMpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgd2l0aFRhcmdldENvb3JkczogdGhpcy53aXRoVGFyZ2V0Q29vcmRzKGNyZWF0ZUNvbGxpZGVyKCksIHN0YXRzLCBnb2xkVmFsdWUpLFxyXG4gICAgICAgIGJ1aWxkOiAoKSA9PiBuZXcgQ3JlYXR1cmUoY3JlYXRlQ29sbGlkZXIoKSwgc3RhdHMsIGdvbGRWYWx1ZSksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgd2l0aFRhcmdldENvb3Jkcyhjb2xsaWRlcjogQ29sbGlkZXIsIHN0YXRzOiBTdGF0cywgZ29sZFZhbHVlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBidWlsZDogKCkgPT4gbmV3IENyZWF0dXJlKGNvbGxpZGVyLCBzdGF0cywgZ29sZFZhbHVlLCB7IHgsIHkgfSksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnR5cGUgUGxheWVyID0gQ3JlYXR1cmU8UmVjdGFuZ2xlQ29sbGlkZXI+XHJcbnR5cGUgTWluaW9uID0gQ3JlYXR1cmU8UmVjdGFuZ2xlQ29sbGlkZXI+XHJcbnR5cGUgQXR0YWNrUHJvamVjdGlsZSA9IFByb2plY3RpbGU8Q2lyY2xlQ29sbGlkZXI+XHJcblxyXG50eXBlIEdhbWVTdGF0ZSA9IHtcclxuICBwbGF5ZXI6IFBsYXllclxyXG4gIHBsYXllckdvbGQ6IG51bWJlclxyXG4gIHBsYXllckNyZWVwU2NvcmU6IG51bWJlclxyXG4gIG1pbmlvbnM6IE1pbmlvbltdXHJcbiAgcHJvamVjdGlsZXM6IEF0dGFja1Byb2plY3RpbGVbXVxyXG59XHJcblxyXG5leHBvcnQgeyBDb29yZGluYXRlcywgQ3JlYXR1cmUsIFByb2plY3RpbGUsIENyZWF0dXJlRmFjdG9yeSwgR2FtZVN0YXRlLCBQbGF5ZXIsIE1pbmlvbiwgQXR0YWNrUHJvamVjdGlsZSwgQXR0YWNrLCBTdGF0cyB9XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBDaXJjbGVDb2xsaWRlciwgUmVjdGFuZ2xlQ29sbGlkZXIgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIENyZWF0dXJlLCBDcmVhdHVyZUZhY3RvcnksIENvb3JkaW5hdGVzLCBQbGF5ZXIsIEF0dGFja1Byb2plY3RpbGUsIE1pbmlvbiwgUHJvamVjdGlsZSwgQXR0YWNrLCBTdGF0cyB9IGZyb20gXCIuL3R5cGVzXCJcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3MtY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50XHJcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG5jb25zdCBwbGF5ZXJJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcclxucGxheWVySW1hZ2Uuc3JjID0gXCJmaXp6LmpwZ1wiIC8vIHRvZG86IHJlcGxhY2U/XHJcbmNvbnN0IGZwcyA9IDEwMFxyXG5cclxuY29uc3QgZ2FtZVN0YXRlOiBHYW1lU3RhdGUgPSB7XHJcbiAgcGxheWVyOiBjcmVhdGVQbGF5ZXIoKSxcclxuICBwbGF5ZXJHb2xkOiAwLCAvLyB0b2RvOiBkZWxldGUgdGhpcyBsYXRlclxyXG4gIHBsYXllckNyZWVwU2NvcmU6IDAsIC8vIHRvZG86IGRlbGV0ZSB0aGlzIGxhdGVyXHJcbiAgbWluaW9uczogW10sXHJcbiAgcHJvamVjdGlsZXM6IFtdLFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XHJcbiAgY29uc3QgcGxheWVyU3RhdHM6IFN0YXRzID0ge1xyXG4gICAgYWJpbGl0eVBvd2VyOiAwLFxyXG4gICAgYXR0YWNrRGFtYWdlOiA4MCxcclxuICAgIGF0dGFja1NwZWVkOiAwLjg5LFxyXG4gICAgYXJtb3I6IDAsXHJcbiAgICBtYWdpY1Jlc2lzdDogMCxcclxuICAgIG1vdmVtZW50U3BlZWQ6IDQsXHJcbiAgICBtYXhIZWFsdGg6IDEwMCxcclxuICAgIGhlYWx0aDogMTAwLFxyXG4gIH1cclxuICByZXR1cm4gQ3JlYXR1cmVGYWN0b3J5LmdldCgpLm5ld0NyZWF0dXJlKHBsYXllclN0YXRzLCAzMDApLndpdGhSZWN0YW5nbGVDb2xsaWRlcigwLCAwLCA3NSwgNzUpLmJ1aWxkKClcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTWluaW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgY29uc3QgbWluaW9uU3RhdHM6IFN0YXRzID0ge1xyXG4gICAgYWJpbGl0eVBvd2VyOiAwLFxyXG4gICAgYXR0YWNrRGFtYWdlOiAxMDAsXHJcbiAgICBhdHRhY2tTcGVlZDogMC44OSxcclxuICAgIGFybW9yOiAxMCxcclxuICAgIG1hZ2ljUmVzaXN0OiAwLFxyXG4gICAgbW92ZW1lbnRTcGVlZDogMixcclxuICAgIG1heEhlYWx0aDogNTAwLFxyXG4gICAgaGVhbHRoOiA1MDAsXHJcbiAgfVxyXG4gIHJldHVybiBDcmVhdHVyZUZhY3RvcnkuZ2V0KCkubmV3Q3JlYXR1cmUobWluaW9uU3RhdHMsIDE2KS53aXRoUmVjdGFuZ2xlQ29sbGlkZXIoeCwgeSwgNTUsIDU1KS5idWlsZCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RpbGUob3JpZ2luOiBDb29yZGluYXRlcywgdGFyZ2V0OiBDcmVhdHVyZTxSZWN0YW5nbGVDb2xsaWRlciB8IENpcmNsZUNvbGxpZGVyPiwgYXR0YWNrOiBBdHRhY2spOiBBdHRhY2tQcm9qZWN0aWxlIHtcclxuICByZXR1cm4gbmV3IFByb2plY3RpbGUoNiwgMTAsIG5ldyBDaXJjbGVDb2xsaWRlcihvcmlnaW4ueCwgb3JpZ2luLnksIDgpLCB0YXJnZXQsIGF0dGFjaylcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgaW5pdCgpXHJcbiAgZ2FtZUxvb3AoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcclxuICB1cGRhdGUoKVxyXG4gIHJlbmRlcigpXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApXHJcbiAgfSwgMTAwMCAvIGZwcylcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcclxuICByZW5kZXJNaW5pb25zKGdhbWVTdGF0ZS5taW5pb25zKVxyXG4gIHJlbmRlclByb2plY3RpbGVzKGdhbWVTdGF0ZS5wcm9qZWN0aWxlcylcclxuICByZW5kZXJQbGF5ZXIoZ2FtZVN0YXRlLnBsYXllcilcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyUGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgY29udGV4dC5kcmF3SW1hZ2UocGxheWVySW1hZ2UsIHBsYXllci5jb2xsaWRlci5jb29yZHMueCwgcGxheWVyLmNvbGxpZGVyLmNvb3Jkcy55LCBwbGF5ZXIuY29sbGlkZXIud2lkdGgsIHBsYXllci5jb2xsaWRlci5oZWlnaHQpXHJcbiAgcmVuZGVyTWF4SGVhbHRoQmFyKHBsYXllcilcclxuICByZW5kZXJIZWFsdGhCYXIocGxheWVyKVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0aWxlcyhwcm9qZWN0aWxlczogQXR0YWNrUHJvamVjdGlsZVtdKSB7XHJcbiAgcHJvamVjdGlsZXMuZm9yRWFjaCgocHJvamVjdGlsZSkgPT4ge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcImdyZWVuXCJcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29sbGlkZXI6IHtcclxuICAgICAgICBjb29yZHM6IHsgeCwgeSB9LFxyXG4gICAgICAgIHJhZGl1cyxcclxuICAgICAgfSxcclxuICAgIH0gPSBwcm9qZWN0aWxlXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpXHJcbiAgICBjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKVxyXG4gICAgY29udGV4dC5maWxsKClcclxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJNaW5pb25zKG1pbmlvbnM6IE1pbmlvbltdKSB7XHJcbiAgbWluaW9ucy5mb3JFYWNoKChtaW5pb24pID0+IHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ0b21hdG9cIlxyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb2xsaWRlcjogeyBjb29yZHMsIHdpZHRoLCBoZWlnaHQgfSxcclxuICAgIH0gPSBtaW5pb25cclxuICAgIGNvbnRleHQuZmlsbFJlY3QoY29vcmRzLngsIGNvb3Jkcy55LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgcmVuZGVyTWF4SGVhbHRoQmFyKG1pbmlvbilcclxuICAgIHJlbmRlckhlYWx0aEJhcihtaW5pb24pXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyTWF4SGVhbHRoQmFyKGNyZWF0dXJlOiBDcmVhdHVyZTxSZWN0YW5nbGVDb2xsaWRlcj4pIHtcclxuICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIlxyXG4gIGNvbnN0IHtcclxuICAgIGNvbGxpZGVyOiB7IGNvb3Jkcywgd2lkdGggfSxcclxuICB9ID0gY3JlYXR1cmVcclxuICBjb250ZXh0LmZpbGxSZWN0KGNvb3Jkcy54LCBjb29yZHMueSAtIDgsIHdpZHRoLCA1KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJIZWFsdGhCYXIoY3JlYXR1cmU6IENyZWF0dXJlPFJlY3RhbmdsZUNvbGxpZGVyPikge1xyXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ0b21hdG9cIlxyXG4gIGNvbnN0IHtcclxuICAgIGJhc2VTdGF0cyxcclxuICAgIGNvbGxpZGVyOiB7IGNvb3Jkcywgd2lkdGggfSxcclxuICB9ID0gY3JlYXR1cmVcclxuICBjb25zdCBoZWFsdGhUb1dpZHRoID0gd2lkdGggKiAoYmFzZVN0YXRzLmhlYWx0aCAvIGJhc2VTdGF0cy5tYXhIZWFsdGgpXHJcbiAgY29udGV4dC5maWxsUmVjdChjb29yZHMueCwgY29vcmRzLnkgLSA4LCBoZWFsdGhUb1dpZHRoLCA1KVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgZ2FtZVN0YXRlLnBsYXllci51cGRhdGUoKVxyXG4gIGdhbWVTdGF0ZS5wcm9qZWN0aWxlcy5mb3JFYWNoKChwcm9qZWN0aWxlKSA9PiBwcm9qZWN0aWxlLnVwZGF0ZSgpKVxyXG4gIGNoZWNrUHJvamVjdGlsZXNNaW5pb25Db2xsaXNpb24oZ2FtZVN0YXRlLnByb2plY3RpbGVzKVxyXG4gIHVwZGF0ZU1pbmlvbnMoZ2FtZVN0YXRlLm1pbmlvbnMsIGdhbWVTdGF0ZS5wcm9qZWN0aWxlcylcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tQcm9qZWN0aWxlc01pbmlvbkNvbGxpc2lvbihfcHJvamVjdGlsZXM6IEF0dGFja1Byb2plY3RpbGVbXSkge1xyXG4gIGNvbnN0IHByb2plY3RpbGVzID0gX3Byb2plY3RpbGVzLmZpbHRlcigoeyBjb2xsaWRlciwgdGFyZ2V0LCBhdHRhY2sgfSkgPT4ge1xyXG4gICAgaWYgKGNvbGxpZGVyLmlzQXRDZW50ZXJPZih0YXJnZXQuY29sbGlkZXIpKSB7XHJcbiAgICAgIHRhcmdldC50YWtlRGFtYWdlKGF0dGFjaylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGdhbWVTdGF0ZS5wcm9qZWN0aWxlcyA9IHByb2plY3RpbGVzXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1pbmlvbnMoX21pbmlvbnM6IE1pbmlvbltdLCBfcHJvamVjdGlsZXM6IFByb2plY3RpbGU8Q2lyY2xlQ29sbGlkZXI+W10pIHtcclxuICBjb25zdCBtaW5pb25zID0gX21pbmlvbnMuZmlsdGVyKChtaW5pb24pID0+IHtcclxuICAgIGlmIChtaW5pb24uYmFzZVN0YXRzLmhlYWx0aCA9PT0gMCkge1xyXG4gICAgICBvbk1pbmlvbkRlYXRoKG1pbmlvbilcclxuICAgICAgaWYgKF9wcm9qZWN0aWxlcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGdhbWVTdGF0ZS5taW5pb25zID0gbWluaW9uc1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbk1pbmlvbkRlYXRoKG1pbmlvbjogTWluaW9uKSB7XHJcbiAgY29uc3QgeyBnb2xkVmFsdWUgfSA9IG1pbmlvblxyXG4gIGdhbWVTdGF0ZS5wbGF5ZXJHb2xkICs9IGdvbGRWYWx1ZVxyXG4gIGdhbWVTdGF0ZS5wbGF5ZXJDcmVlcFNjb3JlKytcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICB9KVxyXG5cclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0RXZlbnRDb29yZGluYXRlcyhldmVudClcclxuICAgIGNvbnN0IHR5cGUgPSBnZXRDbGlja1R5cGUoZXZlbnQuYnV0dG9uKVxyXG4gICAgaGFuZGxlQ2xpY2soeCwgeSwgdHlwZSlcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDbGljayh4OiBudW1iZXIsIHk6IG51bWJlciwgdHlwZTogXCJsZWZ0XCIgfCBcInJpZ2h0XCIgfCBcIm90aGVyXCIpIHtcclxuICBjb25zdCB7IHBsYXllciB9ID0gZ2FtZVN0YXRlXHJcblxyXG4gIGlmICh0eXBlID09PSBcInJpZ2h0XCIpIHtcclxuICAgIGNvbnN0IG1pbmlvbiA9IGdldENsaWNrZWRNaW5pb24oeCwgeSlcclxuICAgIGlmIChtaW5pb24gIT09IG51bGwgJiYgbWluaW9uLmJhc2VTdGF0cy5oZWFsdGggIT09IDApIHtcclxuICAgICAgYXV0b0F0dGFja01pbmlvbihwbGF5ZXIuY29sbGlkZXIuZ2V0Q2VudGVyQ29vcmRpbmF0ZXMoKSwgbWluaW9uLCBwbGF5ZXIuYXV0b0F0dGFjaygpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGxheWVyLm1vdmVUbyh4LCB5KVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJsZWZ0XCIpIHtcclxuICAgIGFkZE1pbmlvbih4LCB5KVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RXZlbnRDb29yZGluYXRlcyhldmVudDogTW91c2VFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB4OiBldmVudC5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQsXHJcbiAgICB5OiBldmVudC5jbGllbnRZIC0gY2FudmFzLm9mZnNldFRvcCxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENsaWNrZWRNaW5pb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICBjb25zdCB0YXJnZXQgPSBnYW1lU3RhdGUubWluaW9ucy5maW5kKFxyXG4gICAgKG1pbmlvbikgPT4gbWluaW9uLnggPD0geCAmJiBtaW5pb24ueCArIG1pbmlvbi5jb2xsaWRlci53aWR0aCA+PSB4ICYmIG1pbmlvbi55IDw9IHkgJiYgbWluaW9uLnkgKyBtaW5pb24uY29sbGlkZXIuaGVpZ2h0ID49IHksXHJcbiAgKVxyXG4gIHJldHVybiB0YXJnZXQgfHwgbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRNaW5pb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICBnYW1lU3RhdGUubWluaW9ucy5wdXNoKGNyZWF0ZU1pbmlvbih4LCB5KSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXV0b0F0dGFja01pbmlvbihvcmlnaW46IENvb3JkaW5hdGVzLCBtaW5pb246IE1pbmlvbiwgYXR0YWNrOiBBdHRhY2spIHtcclxuICBjb25zdCBwcm9qZWN0aWxlID0gY3JlYXRlUHJvamVjdGlsZShvcmlnaW4sIG1pbmlvbiwgYXR0YWNrKVxyXG4gIGdhbWVTdGF0ZS5wcm9qZWN0aWxlcy5wdXNoKHByb2plY3RpbGUpXHJcbiAgZ2FtZVN0YXRlLnBsYXllci5zdG9wTW92ZW1lbnQoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDbGlja1R5cGUoYnV0dG9uOiBudW1iZXIpIHtcclxuICBzd2l0Y2ggKGJ1dHRvbikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICByZXR1cm4gXCJsZWZ0XCJcclxuICAgIGNhc2UgMjpcclxuICAgICAgcmV0dXJuIFwicmlnaHRcIlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIFwib3RoZXJcIlxyXG4gIH1cclxufVxyXG5cclxuc3RhcnQoKVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=