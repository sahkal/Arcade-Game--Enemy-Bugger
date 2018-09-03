
let gameScore = 0,
    lives = 3,
    livesLeft = document.querySelector('.lives > span'),
    score = document.querySelector('.score > span');
// Enemies our player must avoid

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
     if(this.x>500){
        this.x= -90;
        this.speed=100 +Math.floor(Math.random()*600);
     }
    // collision between player and enemies
     if (player.x < this.x + 70 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x=Math.floor(Math.random()*600);
        player.y = 380;
        lives--;
            livesLeft.innerText = lives;
            if (lives === 0) {
                //Will replace with modal
                confirm(`Game Over! play again?`);
                lives = 3;
                gameScore = 0;
                livesLeft.innerText =lives;
                score.innerText = '0';
            }
    }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Player.prototype.update = function() {
   //boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Checks if the players reaches the top
    if (this.y < 0) {
        this.y =380;
        gameScore++;
            score.innerText = gameScore * 50;
            if (gameScore === 10 && lives > 0) {
                confirm('Congo! u won the game!');
                lives = 3;
                gameScore = 0;
                livesLeft.innerText = lives;
                score.innerText = '';
            }
    }
};
 

    // Check for player reaching top of canvas and winning the game
  
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        
    }
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      
    };
    var alternateKeys={
        87: 'up',
        83: 'down',
        65: 'left',
        68: 'right'
    }
    player.handleInput(allowedKeys[e.keyCode]);
    player.handleInput(alternateKeys[e.keyCode]);
});

var allEnemies = [];
var enemyPosition = [60, 140, 220];
var player=new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 600));
    allEnemies.push(enemy);
});