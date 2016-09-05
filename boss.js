//enermy
var failureStateBool = false;
var deathSnd = new Audio("sound/playerdeath.wav");
var gabenDeathSound = new Audio("sound/wilhelm_scream.wav");
var boss_pics=[
	(new Image()).src='imgs/gaben.png'
];

var Boss = function(position, size) {
	this.bjarnebool = true;
	this.img = new Image();
	this.img.src = boss_pics[0];

	this.x= position.x;
	this.y= position.y;
	this.size=size;
	
};
Boss.prototype.hitbox=function(){
	return {
		'Xlow':this.x, 
		'Ylow':this.y, 
		'Xhigh':this.x+this.size, 
		'Yhigh':this.y+this.size
	};
}
Boss.prototype.update = function(ctx,current_level){
	this.render(ctx);


	// if(going_forth){
	// 	this.x+=this.speedx*(progress/1000);
	// 	this.y+=this.speedy*(progress/1000);
	// }
	// else if (!going_forth){
	// 	this.x-=this.speedx*(progress/1000);
	// 	this.y-=this.speedy*(progress/1000);
	// }
	// if(this.x<=this.position_from.x&&this.y<=this.position_from.y){
	// 	this.x=this.position_from.x;
	// 	this.y=this.position_from.y;
	// 	going_forth=true;
	// }
	// else if(this.x>=this.position_to.x&&this.y>=this.position_to.y){
	// 	this.x=this.position_to.x;
	// 	this.y=this.position_to.y;
	// 	going_forth=false;
	//}


	// for (var i = 0;i<current_level.projectiles.length; i++) {
	// 	this.inside(current_level.projectiles[i]);
	// 	console.log(this.inside(current_level.projectiles[i]));
	// 	if (this.inside(current_level.projectiles[i])) {
	// 		gabenDeathSound.Play();
	// 		 nxtLvlBool = true;
	// 		 console.log("HELLOWORLD");
	// 	};
	// };
}

Boss.prototype.setPosition=function(pos){
	this.x=pos.x;
	this.y=pos.y;
	this.vx=0;
	this.vy=0;
}

Boss.prototype.contains = function(x,y){
	// console.log('x out: '+x+'\ny out: '+y+'\nx: '+this.x+'-'+(this.x+200)+'\ny: '+this.y+'-'+(this.y+200));
	if (x >= this.x && x <= this.x + 200 &&
		y >= this.y && y <= this.y + 200)
		return true;
	else 
		return false;
	
};

Boss.prototype.render=function(ctx){
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

// Boss.prototype.contains = function(x, y)
// {
// 	if (x >= this.x && x <= this.x + this.size &&
// 		y >= this.y && y <= this.y + this.size){
// 		//console.log('checked')
// 		deathSnd.play();
// 		backgroundMusic.pause();
// 		player = null;
// 		player= new Player(current_level.playerStartPosition);
// 		failureStateBool = true;
// 		return true;
// 	}
// 	else 
// 		return false;
// }

// Boss.prototype.inside=function(shape){
// 	// console.log(shape.hitbox());
// 	// console.log(this.hitbox())
// 	// this.Intersects = function(shape)
// 	// console.log('f')
// 	var hit_box=this.hitbox();
// 	var shape_box = shape.hitbox();
// 	// if(shape.bjarnebool)
// 	// {
// 	// 	console.log(this.hitbox());
// 	// 	console.log(shape_box);
// 	// 	shape.bjarnebool = false;
// 	// }
// 	var topLeft=false;
// 	var topRight=false;
// 	var bottomLeft=false;
// 	var bottomRight=false;
// 	// console.log(shape);
// 	//checks for corners
// 	if (shape.contains(hit_box.Xlow , hit_box.Ylow ))
// 		topLeft=true; 
// 	if(shape.contains(hit_box.Xhigh , hit_box.Ylow ))
// 		topRight=true;
// 	if(shape.contains(hit_box.Xlow , hit_box.Yhigh ))
// 		bottomLeft=true;
// 	if(shape.contains(hit_box.Xhigh , hit_box.Yhigh ))
// 		bottomRight=true;
	
// 	if(topLeft&&print)
// 		console.log('topLeft')
// 	if(topRight)
// 		console.log('topRight')
// 	if(bottomLeft&&print)
// 		console.log('bottomLeft')
// 	if(bottomRight&&print)
// 		console.log('bottomRight')

// 	//sides touches
// 	if(topLeft||topRight||bottomLeft||bottomRight){
// 		console.log('tl: '+topLeft+' \ntr: '+topRight+' \nbl: '+bottomLeft+'\nbr: '+bottomRight)
// 		return true;
// 	}
	
// 	return false;
// };
