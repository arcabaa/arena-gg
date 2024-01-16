import { CircleCollider, RectangleCollider } from "./colliders";
import { GameState, Creature, CreatureFactory, Coordinates, Player, AttackProjectile, Minion, Projectile, Attack, Stats } from "./types";

const canvas = document.getElementById("cs-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const playerImage = document.createElement("img");
playerImage.src = "fizz.jpg";

const gameState: GameState = {
    player: createPlayer(),
    playerGold: 0, // todo: fix this later
    playerCreepScore: 0, // todo: fix this later
    minions: [],
    projectiles: [],
};

function createPlayer() {
    const playerStats: Stats = { abilityPower: 0, attackDamage: 80, armor: 0, magicResist: 0, movementSpeed: 4, maxHealth: 100, health: 100 };
    return CreatureFactory.get().newCreature(playerStats, 300).withRectangleCollider(0, 0, 75, 75).build();
}

function createMinion(x: number, y: number) {
    const minionStats: Stats = { abilityPower: 0, attackDamage: 100, armor: 10, magicResist: 0, movementSpeed: 2, maxHealth: 500, health: 500 };
    return CreatureFactory.get().newCreature(minionStats, 16).withRectangleCollider(x, y, 55, 55).build();
}

function createProjectile(origin: Coordinates, target: Creature<RectangleCollider | CircleCollider>, attack: Attack): AttackProjectile {
    return new Projectile(6, 10, new CircleCollider(origin.x, origin.y, 8), target, attack);
}

function start() {
    init();
    gameLoop();
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderMinions(gameState.minions);
    renderProjectiles(gameState.projectiles);
    renderPlayer(gameState.player);
}

function renderPlayer(player: Player) {
    context.drawImage(playerImage, player.collider.coords.x, player.collider.coords.y, player.collider.width, player.collider.height);
    renderMaxHealthBar(player);
    renderHealthBar(player);
}

function renderProjectiles(projectiles: AttackProjectile[]) {
    projectiles.forEach((projectile) => {
        context.fillStyle = "green";
        const {
            collider: {
                coords: { x, y },
                radius,
            },
        } = projectile;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    });
}

function renderMinions(minions: Minion[]) {
    minions.forEach((minion) => {
        context.fillStyle = "tomato";
        const {
            collider: { coords, width, height },
        } = minion;
        context.fillRect(coords.x, coords.y, width, height);
        renderMaxHealthBar(minion);
        renderHealthBar(minion);
    });
}

function renderMaxHealthBar(creature: Creature<RectangleCollider>) {
    context.fillStyle = "black";
    const {
        collider: { coords, width },
    } = creature;
    context.fillRect(coords.x, coords.y - 8, width, 5);
}

function renderHealthBar(creature: Creature<RectangleCollider>) {
    context.fillStyle = "tomato";
    const {
        baseStats,
        collider: { coords, width },
    } = creature;
    const healthToWidth = width * (baseStats.health / baseStats.maxHealth);
    context.fillRect(coords.x, coords.y - 8, healthToWidth, 5);
}

function update() {
    gameState.player.update();
    gameState.projectiles.forEach((projectile) => projectile.update());
    checkProjectilesMinionCollision(gameState.projectiles);
    updateMinions(gameState.minions, gameState.projectiles);
}

function checkProjectilesMinionCollision(_projectiles: AttackProjectile[]) {
    const projectiles = _projectiles.filter(({ collider, target, attack }) => {
        if (collider.isAtCenterOf(target.collider)) {
            target.takeDamage(attack);
            return false;
        } else {
            return true;
        }
    });

    gameState.projectiles = projectiles;
}

function updateMinions(_minions: Minion[], _projectiles: Projectile<CircleCollider>[]) {
    const minions = _minions.filter((minion) => {
        if (minion.baseStats.health === 0) {
            onMinionDeath(minion);
            if (_projectiles.length) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    });

    gameState.minions = minions;
}

function onMinionDeath(minion: Minion) {
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

function handleClick(x: number, y: number, type: "left" | "right" | "other") {
    const { player } = gameState;
    if (type === "right") {
        const minion = getClickedMinion(x, y);
        if (minion !== null) {
            autoAttackMinion(player.collider.getCenterCoordinates(), minion, player.autoAttack());
        } else {
            player.moveTo(x, y);
        }
    } else if (type === "left") {
        addMinion(x, y);
    }
}

function getEventCoordinates(event: MouseEvent) {
    return {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop,
    };
}

function getClickedMinion(x: number, y: number) {
    const target = gameState.minions.find(
        (minion) => minion.x <= x && minion.x + minion.collider.width >= x && minion.y <= y && minion.y + minion.collider.height >= y,
    );
    return target || null;
}

function addMinion(x: number, y: number) {
    gameState.minions.push(createMinion(x, y));
}

function autoAttackMinion(origin: Coordinates, minion: Minion, attack: Attack) {
    const projectile = createProjectile(origin, minion, attack);
    gameState.projectiles.push(projectile);
    gameState.player.stopMovement();
}

function getClickType(button: number) {
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
