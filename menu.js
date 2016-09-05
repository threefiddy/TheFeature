//menu
var menu_instance = true;
var hoverSndMenu = new Audio("sound/hovermenu.ogg");
var playOnceMusic = 0;
var oldPlayOnceMusic=0;
var SplashScreen = function(ctx){
	// console.log('dddd');
	// var color = 'rgb(' + 1 + ',0,0)';
	ctx.fillStyle = 'Black';
	if(position_of_mouse.y>=255&&position_of_mouse.y<280){
		// console.log('new game')
		playOnceMusic=1;
		ctx.fillRect(0,255,W,30);
		if(playOnceMusic!=oldPlayOnceMusic){
			hoverSndMenu.play()
		}
	}
	else if(position_of_mouse.y>=280&&position_of_mouse.y<305){
		// console.log('save game')
		playOnceMusic=2;
		ctx.fillRect(0,280,W,30);
		if(playOnceMusic!=oldPlayOnceMusic){
			hoverSndMenu.play()
		}
	}
	else if(position_of_mouse.y>=305&&position_of_mouse.y<330){
		// console.log('load game')
		playOnceMusic=3;
		ctx.fillRect(0,305,W,30);
		if(playOnceMusic!=oldPlayOnceMusic){
			hoverSndMenu.play()
		}
	}
	else if(position_of_mouse.y>=330&&position_of_mouse.y<355){
		// console.log('load game')
		playOnceMusic=4;
		ctx.fillRect(0,330,W,30);
		if(playOnceMusic!=oldPlayOnceMusic){
			hoverSndMenu.play()
		}
	}else{
		playOnceMusic = 0;
	}
	oldPlayOnceMusic=playOnceMusic;
	ctx.fillStyle = 'White';
	ctx.font = '30px Verdana, sans-serif';
	ctx.textBaseline = 'top';

	ctx.textAlign = 'left';
	ctx.fillText('New Game' 	, 350, 250);
	ctx.fillText('Save Game'	, 350, 275);
	ctx.fillText('Load Game'	, 350, 300);
	ctx.fillText('Credits'		, 350, 325);
	// ctx.fillStyle = color;
	// ctx.font = '24px Verdana, sans-serif';
	// ctx.fillText('click to begin', 450, 250+ 30);

	
};

