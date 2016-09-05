var particles = [];
var max_particles= 150;
var bool=true;
var size = 6;
var Background_instance=false;

var Particle = function(){
	this.speed = {};
	this.speed.x = 0;
	this.speed.y = Math.random()*2+2;
	this.x = Math.random()*canvas.width;
	this.y = 0;
	this.radius = 4;
	this.number_text='';
	this.to_remove=false;
	for(i=0;i<15;i++)
		this.number_text+= Math.floor(Math.random()*2)+'\n\n';

};

Particle.prototype.render = function(){
	this.x += this.speed.x;
	this.y += this.speed.y;
	if(particles.indexOf(this)==0&&this.to_remove)
		// particles.splice(particles.indexOf(this),1);
			particles.shift();
	if(this.y > canvas.height+15*size*3){
		// console.log('here')
		this.to_remove=true;
	}
	// ctx.fillRect(this.x, this.y, this.speed.y*size, this.speed.y*size);
	ctx.font = 'bold ' + this.speed.y*size +'px matrix';//*/+(this.speed.y*speed<9?'"");
	ctx.fillStyle = 'green';
	ctx.shadowOffsetX=5;
  	ctx.shadowOffsetY=5;
  	ctx.shadowBlur=10;
	for(i=0;i<this.number_text.length;i++)
		ctx.fillText(this.number_text.charAt(i),this.x,this.y-i*size)

		
};
var Background =function(ctx){
	if(Background_instance){
		if(current_level)
			current_level.lvl_background();
		// ctx.drawImage(layer_img,0,0,W,H,0,0,W,H);
		// if(particles.length<=max_particles&&bool){
		// 	particles.push(new Particle);
		// 	bool=false;
		// }
		// else{
		// 	bool=true;
		// }
		// for (var i = 0; i < particles.length; i++) {
		// 	// console.log('//////////')
		// 	// console.log(particles[i])
		// 	// console.log(particles)
		// 	particles[i].render();
		// }
	}
	else{
		//What ever you wanna do in the beginning
		Background_instance=true;
	}
	
};
