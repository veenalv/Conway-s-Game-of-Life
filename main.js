var AM = new AssetManager();
var width = 100;
var height = 100;


function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }

///// play animation in reverse /////
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// inheritance 
function Pixel(game, spritesheet, x, y, color, i, j,alive) {
	this.alive = alive;
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.width = 10;
    this.height = 10;
    this.game = game;
    this.ticks = Math.floor((Math.random() * 500) + 500);
    this.count = 0;
    this.spritesheet = spritesheet;
    this.color = color;
    console.log(color);
    if (color === "violet") {
        this.animation = new Animation(spritesheet, 0, 0, 10, 10, 1, 1, true, false);
    }
    else if (color === "indigo") {
        this.animation = new Animation(spritesheet, 10, 0, 10, 10, 1, 6, true, false);
    }
    else if (color === "blue") {
        this.animation = new Animation(spritesheet, 20, 0, 10, 10, 1, 5, true, false);
    }
    else if (color === "green") {
        this.animation = new Animation(spritesheet, 30, 0, 10, 10, 1, 4, true, false);
    }
    else if (color === "yellow") {
        this.animation = new Animation(spritesheet, 40, 0, 10, 10, 1, 3, true, false);
    }
    else if (color === "orange") {
        console.log("here");
        this.animation = new Animation(spritesheet, 50, 0, 10, 10, 1, 2, true, false);
    }
    else if (color === "red") {
        this.animation = new Animation(spritesheet, 60, 0, 10, 10, 1, 1, true, false);
    }
    else if (color === "black") {
        this.animation = new Animation(spritesheet, 0, 0, 10, 10, 1, 1, true, false);
    }
    this.ctx = game.ctx;
    this.xv = 0;
    this.yv = 0;
    Entity.call(this, game, x, y);
}

Pixel.prototype = new Entity();
Pixel.prototype.constructor = Pixel;

Pixel.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Pixel.prototype.draw = function () {
    if (this.alive == 1) {
    	this.animation = new Animation(AM.getAsset("./img/pixel.png"), 0, 0, 10, 10, 1, 1, true, false);
    } else {
    	this.animation = new Animation(AM.getAsset("./img/black.png"), 0, 0, 10, 10, 1, 1, true, false);
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 100);
    //drawRectangles(this.ctx);
    Entity.prototype.draw.call(this);
}
function drawRectangles(ctx) {
    //for each input n, draw a rectangle which scales with n
    for (var i = 1; i <= n; i++) {
        ctx.beginPath();
        ctx.rect(i * (width/n) - (width/n), (height/n) + height-((height/n) * i) - (height*.025),(width/n), (height/n) + ((height/n) * i));
        ctx.fillText(i, (width/n) * i - (width/n/2), (height/n) + height-((height/n) * i) - (height*.025));
        ctx.stroke();
        /*ctx.beginPath();
        ctx.rect(188, 50, 200, 100);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black';
        ctx.stroke();*/
        
    }
}
AM.queueDownload("./img/pixel.png");
AM.queueDownload("./img/black.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.grid = [
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ];
    for (var i = 0; i < gameEngine.grid.length; i++) {
    	for (var j = 0; j < gameEngine.grid[i].length; j++) {
    		if (gameEngine.grid[i][j] === 0)
    			gameEngine.addEntity(new Pixel(gameEngine, AM.getAsset("./img/black.png"), j*10, i*10, "black", i, j,0));
    		else
    			gameEngine.addEntity(new Pixel(gameEngine, AM.getAsset("./img/pixel.png"), j*10, i*10, "violet", i, j,1));	
    	}
    }
    console.log("All Done!");
});