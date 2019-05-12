
//Setting the score and number of lives on start of game
let result = 0;
let lives = 3;

livesCount = document.querySelector('.lives > span'),
playerScore = document.querySelector('.playerScore > span');

//ADD MODAL NEXT e.g.
// const modal = document.querySelector('.modal');
// const scoreModal = document.querySelector('.lives-modal');
// const livesModal = document.querySelector('.score-modal');
// const rstModal = document.querySelector('.rst-modal');

// Enemies our player must avoid
var Enemy = function(x, y , movement) {
  // Variables applied to each of our instances go here,
  this.x = x;
  this.y = y;
  this.movement = movement;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images

  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x = this.x + this.movement * dt
  livesCount.innerText = lives;
  //restart enemy movement once player is in water
  if (this.x >= 550) {
    this.x = -150;
    this.movement = 150 + Math.floor(Math.random() * 750);
  }
  //Calls the checkCollissions method which simulates if player gets hit by enemies
  this.checkCollisions();
};

//Method to check colission with enemy
Enemy.prototype.checkCollisions = function(){
  if (player.y + 131 >= this.y + 90 &&
    player.y + 70 <= this.y + 130 &&
    player.x + 45 <= this.x + 84 &&
    player.x + 60 >= this.x + 17) {
      result = 0;
      playerScore.innerText = result;
      //If there is contact, then reset the player back to starting position.
      player.reset();
      //take away a life from the total
      lives--;
      //Portray that decrease on the screen
      livesCount.innerText = lives;

      if (lives === 0) {
        confirm(`Game Over! You lose!`);

        if (confirm('Do you want to play again ?')){
          lives = 5;
          result = 0;
          livesCount.innerText = lives;
          playerScore.innerText = '';
        }else{

          //will add a restart button to improve this feature
          alert("Stopping game! Refresh page to start...")
          myWindow.close();
        }

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

  var Player = function(x, y, movement) {
    this.x = 205;
    this.y = 425;
    this.movement = movement;
    //Calling image for player
    this.sprite = 'images/char-boy.png';
  };

  // Update the player's position, required method for game
  Player.prototype.update = function() {

    //If the player reaches the water
    if (player.y < 0) {
      result++;
      playerScore.innerText = result;
      this.reset();

      if (result === 5  && lives > 0) {
        confirm(`You win!`);
        if (confirm('Do you want to play again?')){
          lives = 5;
          result = 0;
          livesCount.innerText = lives;
          playerScore.innerText = '';
        }else{
          //will add a restart button to improve this feature
          alert("Stopping game! Refresh page to start...")
          myWindow.close();
        }
      }
    }
  };

  // Draw the player on the screen, required method for game
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  Player.prototype.handleInput = function(arrowKey) {
    if(arrowKey == 'left' && this.x > 50) {
      this.x -= 50;
    }
    if(arrowKey == 'right' && this.x < 400) {
      this.x += 50;
    }
    if(arrowKey == 'up' && this.y > 3) {
      this.y -= 30;
    }
    if(arrowKey == 'down' && this.y < 400) {
      this.y += 30;
    }

  };

  // Is called when the player is reset to the starting point
  Player.prototype.reset = function() {
    this.x = 205;
    this.y = 425;
  };
  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player

  //Insantiating objects and adding all enemy objects into array allEnemies below

  let allEnemies = [];

  //Defining the position's of the enemies, the 3 rows in the screen
  let enemyPosition = [60, 145, 235];

  let player = new Player();

  enemyPosition.forEach((enemyPositionSpot) => {
    let enemyP = new Enemy(0, enemyPositionSpot, 100 + Math.floor(Math.random() * 450));
    //Allow the enemies to appear on the board by pushing into array
    allEnemies.push(enemyP);
  });


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
