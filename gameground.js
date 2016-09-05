//gameground 
//elements
var player=null;
//movement checks
up = false, down = false, left = false, right = false;
var Gameground_instance= false;
var current_level=null;

var Gameground =function(ctx){
	if(Gameground_instance){
		//player
		if(player!=null){
			player.update(current_level);
			// player.render();
		}
		//level
		// console.log('sss')
		if(current_level!=null){
			// console.log('bbbb')
			current_level.update(ctx);
		}
		
	}
	//
	else{
		//What ever you wanna do in the beginning
		// player = new Player({'x':10,'y':10})
		window.addEventListener('keydown', doKey);
		window.addEventListener('keyup', doKey);

		if(current_level==null){
			// localStorage.setItem('inventory',Json.)
			localStorage.setItem('inventory',JSON.stringify([]))
			current_level = levels[0];
		}
		player=new Player(current_level.playerStartPosition)

		Gameground_instance=true;
	}
};

function doKey(e){
	// console.log(e);
	if (e.keyCode == 87) //w
		up=((e.type=="keydown") ? true : false);
	if (e.keyCode == 83) //s
		down=((e.type=="keydown") ? true : false);
	if (e.keyCode == 65) //a
		left=((e.type=="keydown") ? true : false);
	if (e.keyCode == 68)//d
		right=((e.type=="keydown") ? true : false);
	if (e.keyCode == 32&&e.type=="keyup")// space
		shoot();
};