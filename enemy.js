//enermy
var failureStateBool = false;
var deathSnd = new Audio("sound/playerdeath.wav");

var enemy_pics=[
	(new Image()).src='imgs/avg.png',
	(new Image()).src='imgs/Nortonicon.png',
	(new Image()).src='imgs/norman.jpg',
	(new Image()).src='imgs/windowsDefender.png',
	(new Image()).src='imgs/windowsdefender2.png',
	(new Image()).src='imgs/eset.png'
];

var Enemy = function(position_from, position_to, speed,size) {
	this.img = new Image();
	this.img.src = enemy_pics[Math.floor(Math.random()*enemy_pics.length)];

	this.x= position_from.x;
	this.y= position_from.y;
	this.size=size;
	// this.height=size;
	this.speedx=Math.abs(position_from.x-position_to.x)/speed;
	this.speedy=Math.abs(position_from.y-position_to.y)/speed;
	this.position_from=position_from;
	this.position_to=position_to;
	going_forth=true;
	
};
Enemy.prototype.hitbox=function(){
	return {
		'Xlow':this.x, 
		'Ylow':this.y, 
		'Xhigh':this.x+this.size, 
		'Yhigh':this.y+this.size
	};
}
Enemy.prototype.update = function(ctx,current_level){
	this.render(ctx);
	if(going_forth){
		this.x+=this.speedx*(progress/1000);
		this.y+=this.speedy*(progress/1000);
	}
	else if (!going_forth){
		this.x-=this.speedx*(progress/1000);
		this.y-=this.speedy*(progress/1000);
	}
	if(this.x<=this.position_from.x&&this.y<=this.position_from.y){
		this.x=this.position_from.x;
		this.y=this.position_from.y;
		going_forth=true;
	}
	else if(this.x>=this.position_to.x&&this.y>=this.position_to.y){
		this.x=this.position_to.x;
		this.y=this.position_to.y;
		going_forth=false;
	}
}

Enemy.prototype.setPosition=function(pos){
	this.x=pos.x;
	this.y=pos.y;
	this.vx=0;
	this.vy=0;
}

Enemy.prototype.render=function(ctx){
if (right) {
    srcX = 44;
} else if (left) {
    srcX = 22;
}
  // ctx.drawImage(this.img,srcX,srcY,player_w,player_h,player.x,player.y,player_w,player_h);
if (right == false || left == false) {
    srcX = 0;
}
	ctx.drawImage(this.img,this.x, this.y,this.size,this.size);
} 




Enemy.prototype.contains = function(x, y)
{
	if (x >= this.x && x <= this.x + this.size &&
		y >= this.y && y <= this.y + this.size){
		//console.log('checked')
		deathSnd.play();
		backgroundMusic.pause();
		player = null;
		player= new Player(current_level.playerStartPosition);
		failureStateBool = true;
		return true;
	}
	else 
		return false;
}
