//forground
// scorebord here
var woosh_img;
var pil;
var woosh_step=650;
var Forground_instance = false;
var something_iterator=0;
var Forground =function(ctx){
	if(Forground_instance){
		if(current_level )
			current_level.lvl_forground();
		//
		
		if (failureStateBool ) {
			//console.log('failiure state tingy');
			var color = 'rgb(' + 1 + ',0,0)';
			ctx.fillStyle = 'White';
			ctx.font = '30px Verdana, sans-serif';
			ctx.textBaseline = 'top';
			ctx.textAlign = 'center';
			ctx.fillText('You have died.', 450, 250);

			ctx.fillStyle = color;
			ctx.font = '24px Verdana, sans-serif';
			ctx.fillText('click to begin again', 450, 280);
			window.addEventListener('click', function(){
				//console.log("ddd");
				failureStateBool = false;
			}, false)
		}else if(nxtLvlBool){
				var color = 'rgb(' + 1 + ',0,0)';
				ctx.fillStyle = 'White';
				ctx.font = '30px Verdana, sans-serif';
				ctx.textBaseline = 'top';
				ctx.textAlign = 'center';
				ctx.fillText('Great work chap.', 450, 250);

				ctx.fillStyle = color;
				ctx.font = '24px Verdana, sans-serif';
				ctx.fillText('Starting in 3,2,1..', 450, 280);
				setTimeout(function() {
					nxtLvlBool = false;
				}, 1000)
			}else{
			var overlay= new Image();
			overlay.src='imgs/overlay.png';
			ctx.drawImage(overlay, 0,0);
			// ctx.drawImage(woosh_img,srcX,0,W,H,0,0,W,H)
			ctx.fillStyle = 'white';
			ctx.font = '30px Verdana, sans-serif';
			ctx.textBaseline = 'top';
			ctx.textAlign = 'left';
			ctx.fillText(Math.floor(collected_time/1000), 714, 606);
			
			itm_img=new Image();
			itm_img.src = 'imgs/items_sprite_mini.png';
			var items = JSON.parse(localStorage.getItem('inventory'));
			if(items==null)
				items=[];
			var inv_x=2;
			var inv_y=583;
			for(i=0;i<items.length;i++){
				var itm_id=items[i]
				
				if(i<11)
					ctx.drawImage(
						itm_img, 
						30*itm_id,
						0/*y cordinate in the sprite is always 0*/,
						30,30/*the seperate sprites in the sheet is 64x64*/,
						inv_x, inv_y,//topleft corner of item
						30,30/*<-- check last comment*/
					);
				inv_x+=34;
				if(inv_x>180){
					inv_x=2;
					inv_y=622;
				}
			}
			ctx.fillText(current_level.getFormel(), 334, 597);
			
		}

		//move to game background or for ground
		// pil = new Image();
		// pil.src='imgs/pil6.png';
		// ctx.drawImage(pil, 327, 510);
	}
	else{
		woosh_img = new Image();
		woosh_img.src='imgs/wooshSprite.png'
		//What ever you wanna do in the beginning
		// player = new Player({'x':10,'y':10})
		// window.addEventListener('keydown', doKey);
		// window.addEventListener('keyup', doKey);


		Forground_instance=true;
	}
	
};

function drawMenu(){
	
};