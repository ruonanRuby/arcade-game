// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.move = 101;
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function () {
    if (checkCollision(this)) {
        player.collionDetected();
        player.livesChange(-1);
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = 'white';
    ctx.font = "16px Comic San MS";
    ctx.fillText("Score: " + player.score, 20, 70);
    ctx.fillText("Lives: " + player.lives, 121, 70);
    ctx.fillText("Level: " + player.level, 221, 70);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.x = 202;
        this.y = 400;
        this.xMove = 101;
        this.yMove = 83;
        this.sprite = 'images/char-boy.png';
        this.score = 0;
        this.level = 1;
        this.lives = 3;
    }

    update() {
        if (this.y <= -10) {
            this.scoreUp(20);
            this.levelUp();
            this.x = 202;
            this.y = 400;
        } 

    }

    changeHero(path) {
        this.sprite = path;
    }

    scoreUp(score) {
        this.score += score;
    }

    levelUp() {
        this.level += 1;
        allEnemies.forEach(enemy => {
            const speedUp = Math.floor(Math.random() * 10 + 10 );
            enemy.speed += speedUp;
        });
        setTimeout( () => gem.gemReset(), 200);
        if (this.level % 3 === 2) {
            const y = Math.floor(Math.random() * 3 );
            const x = Math.floor(Math.random() * 4);
            heart.changePos(x * 101, 68 + y * 83);
            if (this.level % 4 == 1) {
                let speed = 30 * Math.floor(Math.random() * 10 + 1);
                allEnemies.push(new Enemy(-50, 65 + 83 * y, speed));
            }
        }
    }

    livesChange(rate) {
        this.lives += rate;
        
    }

    collionDetected() {
        this.x = 202;
        this.y = 400;
    }

    handleInput(inputKey) {
        switch (inputKey) {
            case 'left':
                if (this.x >= 101)
                    this.x -= this.xMove;
                break;
            case 'right':
                if (this.x <= 303)
                    this.x += this.xMove;
                break;
            case 'up':
                if (this.y >= 63)
                    this.y -= this.yMove;
                break;
            case 'down':
                if (this.y <= 337)
                    this.y += this.yMove;
                break;
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

function checkCollision(item) {
    if (player.x >= item.x - 50 && player.x <= item.x + 60
        && player.y >= item.y && player.y <= item.y + 40) {
        return true;
    }
    return false;

}


class Selector {
    constructor() {
        this.x = 404;
        this.y = 400;
        this.sprite = 'images/selector.png';
        this.characters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png',
            'images/char-princess-girl.png'];
        this.index = 0;
    }

    update() {
        if (checkCollision(selector)) {
            if (this.index < this.characters.length - 1) {
                this.index++;
            } else {
                this.index = 0;
            }

            player.changeHero(this.characters[this.index]);
            player.collionDetected();
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Heart {
    constructor( ) {
        this.x = -1000;
        this.y = -1000;
        this.sprite = 'images/Heart.png';
    }

    changePos(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        if (checkCollision(this)) {
            player.livesChange(1);
            this.changePos(-1000, -1000);
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

class Gem {
    constructor( ) {
        this.gems = [{score: 5, path: 'images/Gem Blue.png'}, 
        {score: 10, path: 'images/Gem Green.png'}, 
        { score: 15, path: 'images/Gem Orange.png'}];
        this.index = Math.floor(Math.random() * 3);
        this.sprite = this.gems[this.index].path;
        this.y = 68 + 83 * Math.floor(Math.random() * 3 );
        this.x = 101 * Math.floor(Math.random() * 4);
    }


    update() {
        if (checkCollision(this)) {
            this.x = -1000;
            this.y = -1000;
            player.scoreUp(this.gems[this.index].score);
        }

    }

    gemReset() {
        this.y = 68 + 83 * Math.floor(Math.random() * 3 );
        this.x = 101 * Math.floor(Math.random() * 4);
            setTimeout( () => {
                this.x = -1000;
                this.y = -1000;
            }, 3000);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [];
const selector = new Selector();
const heart = new Heart();
const gem = new Gem();
for (let i = 0; i < 3; i++) {
    let enemySpeed = 15 * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-50, 65 + 83 * i, enemySpeed));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
