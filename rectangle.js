///////////////////////////////////////////////////////////////////////////////////////
///basic building block////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
var nxtLvlBool = false;
var Rectangle = function(x, y,w,h,img)
{
	this.image 	= img;
	this.x		= x;
	this.y		= y;
	this.width	= w;
	this.height	= h;
	// console.log(this.image);
};

Rectangle.prototype.hitbox=function(){
	return {
		'Xlow':this.x, 
		'Ylow':this.y, 
		'Xhigh':this.x+this.width, 
		'Yhigh':this.y+this.height
	};
};

Rectangle.prototype.draw = function(ctx, x, y){
	x = typeof x !== 'undefined' ? x : this.x;
	y = typeof y !== 'undefined' ? y : this.y;
	// console.log(this.image);
	ctx.drawImage(this.image, x, y);
};

Rectangle.prototype.contains = function(x, y)
{
	if (x >= this.x && x <= this.x + this.width &&
		y >= this.y && y <= this.y + this.height)
		return true;
	else 
		return false;
};
Rectangle.prototype.update=function(x,y){
	this.x=x;
	this.y=y;
};
///////////////////////////////////////////////////////////////////////////////////////
///  New level block///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

var NewLvlRectangle = function(x, y, w,h, img, level_going_to, player_new_position){
	this.box = new Rectangle(x,y,w,h,img);
	this.level_going_to=level_going_to;
	this.player_new_position=player_new_position;
};
NewLvlRectangle.prototype.hitbox=function(){
	return this.box.hitbox();
};
NewLvlRectangle.prototype.draw = function(ctx){
	this.box.draw(ctx);
};
NewLvlRectangle.prototype.contains = function(x,y){
	var bool=this.box.contains(x,y);

	// backgroundMusic.play();
	if(bool&&current_level.items.length==0)

	//backgroundMusic.play();

	{

		nxtLvlBool = true;

		this.nextLevel();
	}
};
NewLvlRectangle.prototype.nextLevel= function(){
	
	localStorage.setItem('choosenItems',JSON.stringify([]));
	current_level=levels[this.level_going_to];
	player.setPosition(this.player_new_position);
};

//////////////////////////////////////////////////////////////////////////////////////
/// item block Note pisture step 64 px////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var item_table=[
	{'value':0,'img':0},//0
	{'value':1,'img':1},//1
	{'value':2,'img':2},//2
	{'value':3,'img':3},//3
	{'value':4,'img':4},//4
	{'value':5,'img':5},//5
	{'value':6,'img':6},//6
	{'value':7,'img':7},//7
	{'value':8,'img':8},//8
	{'value':9,'img':9},//9
	{'value':'+','img':10},//+
	{'value':'-','img':11},//-
	{'value':'*','img':12},//*
	{'value':'/','img':13},//divide
	{'value':'sqroot','img':14},//squareroot
	{'value':'^2','img':15},//^2
	{'value':'cos','img':16},//cos
	{'value':'sin','img':17},//sin
	{'value':'tan','img':18},//tan
	{'value':'cos^-1','img':19},//cos^-1
	{'value':'sin^-1','img':20},//sin^-1
	{'value':'tan^-1','img':21}//tan^-1
];
var Item = function(x,y,id){
	this.id=id;
	this.img=new Image();
	this.img.src = 'imgs/items_sprite_mini.png';
	this.value = item_table;
	this.x=x;
	this.y=y;
	this.current_bounce=0;
	this.max_bounce=5;
	this.up=true;
	var image=new Image();
	image.src='imgs/itemBlock.png';
	this.box= new Rectangle(x,y,30,30,image);
};
Item.prototype.hitbox=function(){
	return this.box.hitbox();
};
Item.prototype.draw = function(ctx){
	var inventory=JSON.parse(localStorage.getItem('inventory'));
	if(inventory==null||inventory.indexOf(this.id)<0){
		
			this.box.draw(ctx);
			ctx.drawImage(
				this.img, 
				30*this.id,
				0/*y cordinate in the sprite is always 0*/,
				30,30/*the seperate sprites in the sheet is 64x64*/,
				this.x, this.y,
				30,30/*<-- check last comment*/);
	}
		

	
	//ctx.drawImage(this.img,srcX,srcY,player_w,player_h,player.x,player.y,player_w,player_h);
};
Item.prototype.contains = function(x,y){
	var bool=this.box.contains(x,y);
	if(bool)
		this.pick_up_item();
	return bool;
};
Item.prototype.pick_up_item=function(){
	var inventory=JSON.parse(localStorage.getItem('inventory'));
	if(inventory==null)
		inventory=[];
	if(inventory.indexOf(this.id)<0)
		inventory.push(this.id);
	localStorage.setItem('inventory',JSON.stringify(inventory));
	if(current_level.items.indexOf(this)!=-1)
		current_level.items.splice(current_level.items.indexOf(this),1);
};
///////////////////////////////////////////////////////////////////////////////////////
///projectile//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
var Projectile = function(x,y,movefunction){
	this.startX=x;
	this.startY=y;
	this.x=x;
	this.y=y;
	this.img=new Image();
	this.img.src='imgs/shotNew.png';
	this.movement=movefunction;
	this.box=new Rectangle(x,y,45,38,this.img);//y+19     x+15
	//this.hitbox=new Rectangle(x,y+80,105,25,this.img);
};
Projectile.prototype.update=function(ctx){
	this.box.draw(ctx,this.x,this.y);
	this.movement(this);
	if(this.inside(current_level.bosses[0])){
		// console.log(true)
		gabenDeathSound.play();
		if(current_level.projectiles.indexOf(this)!=-1)
			current_level.projectiles.splice(current_level.projectiles.indexOf(this),1);
	}
		
	// if(this.x>900)
	// 	this.
}

Projectile.prototype.hitbox=function(){
	return {
		'Xlow':this.x, 
		'Ylow':this.y, 
		'Xhigh':this.x+45, 
		'Yhigh':this.y+38
	};
}

// Projectile.prototype.contains = function(x,y){
// 	console.log('x out: '+x+'\ny out: '+y+'\n x: '+this.x+'-'+(this.x+45)+'\ny: '+(this.y+38));
// 	if (x >= this.x && x <= this.x + 45 &&
// 		y >= this.y && y <= this.y + 38)
// 		return true;
// 	else 
// 		return false;
	
// };
Projectile.prototype.inside=function(shape){
	// console.log(shape.hitbox());
	// console.log(this.hitbox())
	// this.Intersects = function(shape)
	// console.log('f')
	var hit_box=this.hitbox();
	var shape_box = shape.hitbox();
	// if(shape.bjarnebool)
	// {
	// 	console.log(this.hitbox());
	// 	console.log(shape_box);
	// 	shape.bjarnebool = false;
	// }
	var topLeft=false;
	var topRight=false;
	var bottomLeft=false;
	var bottomRight=false;
	// console.log(shape);
	//checks for corners
	// console.log('_________________')
	if (shape.contains(hit_box.Xlow , hit_box.Ylow ))
		topLeft=true; 
	if(shape.contains(hit_box.Xhigh , hit_box.Ylow ))
		topRight=true;
	if(shape.contains(hit_box.Xlow , hit_box.Yhigh ))
		bottomLeft=true;
	if(shape.contains(hit_box.Xhigh , hit_box.Yhigh ))
		bottomRight=true;
	// console.log('_________________')
	
	// if(topLeft)
	// 	console.log('topLeft')
	// if(topRight)
	// 	console.log('topRight')
	// if(bottomLeft)
	// 	console.log('bottomLeft')
	// if(bottomRight)
	// 	console.log('bottomRight')

	//sides touches
	if(topLeft||topRight||bottomLeft||bottomRight){
		// console.log('tl: '+topLeft+' \ntr: '+topRight+' \nbl: '+bottomLeft+'\nbr: '+bottomRight)
		return true;
	}
	
	return false;
};

//////////////////////////////////////////////////////////////////////////////////////
///canon//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var Canon = function(x,y){
	this.x=x;
	this.y=y;
	this.img=new Image();
	this.img.src='imgs/canonNew.png';
	this.box=new Rectangle(x,y,105,105,this.img);
	this.hitablebox=new Rectangle(x,y+80,105,25,this.img);
	this.active=false;
};
Canon.prototype.hitbox=function(){
	return this.hitablebox.hitbox();
};
Canon.prototype.shoot=function(ctx){
	// console.log('shoot called');
	if(localStorage.getItem('choosenItems')){
		// console.log('choosenItems exist');
		if(JSON.parse(localStorage.getItem('choosenItems')).length==current_level.inputAmount&&this.active){
			console.log('creating a new projectile');
			current_level.projectiles.push(new Projectile(this.x+22,this.y,current_level.projectileFunction));
		}
	}
}
Canon.prototype.draw=function(ctx){
	this.box.draw(ctx);

}
Canon.prototype.contains = function(x,y){
	// console.log(this);
	var bool=this.box.contains(x,y);
	if(bool)
		this.active=true;
	else
		this.active=false;

	return this.hitablebox.contains(x,y);
};
