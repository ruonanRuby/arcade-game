// Enemies our player must avoid
var Enemy = function (x,y,speed) {
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

Enemy.prototype.checkCollision = function() {
    if (player.x >= this.x - 50 && player.x <= this.x + 60
        && player.y >= this.y && player.y <= this.y + 40 ) {
            console.log("hit");
        player.x = 202;
        player.y = 400;
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    }

    update() {
      if (this.y <= -10) {
          this.x = 202;
          this.y = 400;
      }

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


    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    const player = new Player();
    const allEnemies = [];

    for (let i = 0; i < 3; i++) {
        let enemySpeed = 15 * Math.floor(Math.random() * 10 + 1); 
        allEnemies.push(new Enemy(-50, 65 + 83 * i , enemySpeed));
    }


    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
