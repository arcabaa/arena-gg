const canvas = document.getElementById("cs-canvas");
const context = canvas.getContext("2d");
const playerImage = document.createElement('img');
playerImage.src = 'fizz.jpg';

const gameState = {
    player: {
        currentCoords: { x: 0, y: 0 },
        targetCoords: { x: 0, y: 0 },
        radius: 30,
        speed: 2,
        damage: 10,
        Gold: 0,
        creepScore: 0
    },
    minions: [],
    projectiles: []
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

// Important
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderMinions(gameState.minions);
    renderProjectiles(gameState.projectiles);
    renderPlayer(gameState.player);
}

function renderPlayer(player) {
    context.drawImage(playerImage, player.currentCoords.x, player.currentCoords.y, player.radius * 2, player.radius * 2);
    context.font = "20px Arial"
    context.fillText(`Gold: ${player.Gold}`, 900, 680)
}

function renderProjectiles(projectiles) {
    projectiles.forEach(projectile => {
        context.fillStyle = "green";
        const { coords: { x, y }, radius } = projectile;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    })
}

function renderMinions(minions) {
    minions.forEach(minion => {
        context.fillStyle = "tomato";
        const { coords, width, height } = minion;
        context.fillRect(coords.x, coords.y, width, height);
        renderMinionMaxHealthBar(minion);
        renderMinionHealthBar(minion);
    })
}

function renderMinionMaxHealthBar(minion) {
    context.fillStyle = "black";
    const { coords, width } = minion;
    context.fillRect(coords.x, coords.y - 8, width, 5);
}

function renderMinionHealthBar(minion) {
    context.fillStyle = "tomato";
    const { coords, width, health } = minion;
    const healthToWidth = width * (health / 100)
    context.fillRect(coords.x, coords.y - 8, healthToWidth, 5);
}

// Important
function update() {
    updatePlayer(gameState.player);
    updateProjectiles(gameState.projectiles);
    updateMinions(gameState.minions);
}
 
function updateProjectiles(projectiles) {
    projectiles.forEach(projectile => {
        const { target, speed, coords } = projectile;
        const targetCoords = getMinionCoordinates(target);
        const deltaY = (targetCoords.y - coords.y);
        const deltaX = (targetCoords.x - coords.x);

        let x, y;
        if (deltaX === 0) {
            x = 0;
            y = deltaY;
        } else {
            const slope = deltaY / deltaX;
            x = (speed / Math.sqrt(slope**2 + 1)) * Math.sign(deltaX);
            y = slope * x;
        }

        const minMaxX = x > 0 ? Math.min : Math.max;
        coords.x = minMaxX(coords.x + x, targetCoords.x);
        const minMaxY = y > 0 ? Math.min : Math.max;
        coords.y = minMaxY(coords.y + y, targetCoords.y);
    })

    checkProjectilesMinionCollision(projectiles)
}

function checkProjectilesMinionCollision(_projectiles) {
    const projectiles = _projectiles.filter(projectile => {
        if (checkProjectileMinionCollision(projectile)) {
            const { target, damage } = projectile;
            dealDamageToMinion(target, damage)
            return false
        } else {
            return true
        }
    })

    gameState.projectiles = projectiles
}

function checkProjectileMinionCollision(projectile) {
    const { target, coords } = projectile;
    const targetCoords = getMinionCoordinates(target);
    const projectileCoords = coords;

    return projectileCoords.x === targetCoords.x && projectileCoords.y === targetCoords.y
}

function updateMinions(_minions) {
    const minions = _minions.filter(minion => {
        if(minion.health === 0) {
            // the death of the minion
            onMinionDeath(minion);
            return false
        } else {
            return true
        }
    })

    gameState.minions = minions
}

function onMinionDeath(minion) {
    const { goldValue } = minion;
    gameState.player.Gold += goldValue;
    gameState.player.creepScore++;
}

function updatePlayer(player) {
    let { currentCoords, targetCoords, speed } = player;
    // Player needs to move to target location
    if (currentCoords.x !== targetCoords.x || currentCoords.y !== targetCoords.y) {
        const deltaY = (targetCoords.y - currentCoords.y);
        const deltaX = (targetCoords.x - currentCoords.x);

        let x, y;
        if (deltaX === 0) {
            x = 0;
            y = deltaY;
        } else {
            const slope = deltaY / deltaX;
            x = (speed / Math.sqrt(slope**2 + 1)) * Math.sign(deltaX);
            y = slope * x;
        }

        const minMaxX = x > 0 ? Math.min : Math.max;
        currentCoords.x = minMaxX(currentCoords.x + x, targetCoords.x);
        const minMaxY = y > 0 ? Math.min : Math.max;
        currentCoords.y = minMaxY(currentCoords.y + y, targetCoords.y);
    }
}

function init() {
    canvas.addEventListener("contextmenu", event => {
        event.preventDefault(); 
        event.stopPropagation();
    });
    canvas.addEventListener("mousedown", event => {
        const { x, y } = getEventCoordinates(event);
        const type = getClickType(event.button);
        handleClick(x, y, type);
    });
}

function handleClick(x, y, type) {
    const { player } = gameState;

    if (type === "right") {
        const minion = getClickedMinion(x, y);
        if (minion !== null) {
            autoAttackMinion({ x: player.currentCoords.x + player.radius, y: player.currentCoords.y + player.radius }, minion, player.damage);
        } else {
            player.targetCoords = { x: x - player.radius, y: y - player.radius };
        }
    } else if (type === "left") {
        addMinion(x, y, 16);
    }
}

function getEventCoordinates(event) {
    return {
        x: event.clientX - canvas.offsetLeft, 
        y: event.clientY - canvas.offsetTop
    };
}

function getMinionCoordinates(target) {
    return {
        x: target.coords.x + target.width / 2, 
        y: target.coords.y + target.height / 2, 
    };
}

function getPlayerCoordinates(player) {
    return {
        x: player.currentCoords.x + player.radius, 
        y: player.currentCoords.y + player.radius, 
    };
}

function getClickedMinion(x, y) {
    const target = gameState.minions.find(minion => 
        minion.coords.x <= x 
            && minion.coords.x + minion.width >= x
            && minion.coords.y <= y
            && minion.coords.y + minion.height >= y
    );
    return target || null;
}

function addMinion(x, y, goldValue) {
    gameState.minions.push({ coords: { x, y }, width: 45, height: 45, health: 100, goldValue })
}

function autoAttackMinion(origin, minion, damage) {
    const projectile = { coords: origin, radius: 10, target: minion, speed: 4, damage };
    gameState.projectiles.push(projectile);
    // Stops player movement
    gameState.player.targetCoords = { ...gameState.player.currentCoords };
}

function dealDamageToMinion(target, damage) {
    target.health = Math.max(0, target.health - damage);
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