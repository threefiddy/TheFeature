//core canvas and context stuff goes here
var canvas, ctx, fps = 90, start_step_in_time = 0, 
progress = 0, collected_time = 0, firstrun=true;
//height and width of the game surface
W = 900,//*/window.innerWidth-33, 
H = 650;//*/window.innerHeight-33;
var position_of_mouse={'x':0,'y':0};

//User
var backgroundMusic = new Audio("sound/PlatformsAndPitfalls.mp3"), clickSndMenu = new Audio("sound/clickmenu.mp3");

var user;

// Layers
// background is for all fancy stuff you see in the distance
// gameground is where the player and all the obsticals are
// forground is where all the fancy stuff that is blockking your view are
var background, forground, gameground, menu, failureState;

var load = function(){
	canvas = document.getElementById('gameCanvas'); //get Canvas
	canvas.height = H; canvas.width = W;  			//set dimentions
	ctx = canvas.getContext('2d');					//get Context
	backgroundMusic.loop = true;
	backgroundMusic.play();
	
	background =  function(ctx){
		Background(ctx);
	};
	gameground = function(ctx){
		Gameground(ctx);
	};
	forground = function(ctx){
		Forground(ctx);
	};

	menu = function(ctx){
		SplashScreen(ctx);
	};


	failureState = function(ctx){
		FailureState(ctx);
	};

	if(firstrun){

		makelevels();
		window.addEventListener('click',clicked);
		canvas.addEventListener('mousemove', function(e){
			var rect = canvas.getBoundingClientRect();
		    position_of_mouse.x = e.clientX- rect.left;
		    position_of_mouse.y = e.clientY- rect.top;
		    // console.log(position_of_mouse);
		}, false);

	};
	setInterval(function(){window.requestAnimationFrame(step);}, 1000/30);
	
};

function clicked(){
	console.log(position_of_mouse.x+':'+position_of_mouse.y);
	if(menu_instance){
		clickSndMenu.play();
		if(position_of_mouse.y>=255&&position_of_mouse.y<280)
			// console.log('new game')
			menu_instance=false;
		else if(position_of_mouse.y>=280&&position_of_mouse.y<305)
			// console.log('save game')
			save_game();
		else if(position_of_mouse.y>=305&&position_of_mouse.y<330)
			// console.log('load game')
			load_game();
		else if(position_of_mouse.y>=330&&position_of_mouse.y<355)
			// console.log('load game')
			credits=true;
	}else{
		if(position_of_mouse.y<615&&position_of_mouse.y>583)
			mouse_collems(0);
		else if(position_of_mouse.y<650&&position_of_mouse.y>620)
			mouse_collems(6);

	}
	function save_game(){
		localStorage.setItem("savefile",JSON.stringify({'level':levels.indexOf(current_level)}))
	};
	function load_game(){
		if(localStorage.getItem("savefile"))
			current_level=levels[JSON.parse(localStorage.getItem("savefile")).level];
	};
	function mouse_collems(row){
		if(position_of_mouse.x<34&&position_of_mouse.x>0)			//0v6
			choose(0+row)
		else if(position_of_mouse.x<65&&position_of_mouse.x>36)		//1v7
			choose(1+row)
		else if(position_of_mouse.x<100&&position_of_mouse.x>68)	//2v8
			choose(2+row)
		else if(position_of_mouse.x<129&&position_of_mouse.x>102)	//3v9
			choose(3+row)
		else if(position_of_mouse.x<164&&position_of_mouse.x>131)	//4v10
			choose(4+row)
		else if(position_of_mouse.x<206&&position_of_mouse.x>166)	//5v11
			choose(5+row)
	};

};

function choose(item_numb){
	var inventory=JSON.parse(localStorage.getItem("inventory"));
	var choosen_items=JSON.parse(localStorage.getItem("choosenItems"));
	if(choosen_items)
		if(choosen_items.length>=current_level.inputAmount)
			choosen_items=[];
	else
		choosen_items=[];
	choosen_items.push(inventory[item_numb]);
	localStorage.setItem("choosenItems",JSON.stringify(choosen_items));
};

function shoot(){
	var laserShot = new Audio("sound/laserfire.wav");
	laserShot.play();
	if(current_level)
		for(var i=0;current_level.guns.length>i;i++){
			current_level.guns[i].shoot();
		};

};

var isActive=true;
function update(){
	$(window).on("blur focus", function (e) {
		isActive=false;
	});
	$(window).focus(function() {
		isActive=true;
	});
	if(canvas!=null){
		// console.log(menu_instance);
		// console.log(failureStateBool);
		ctx.clearRect(0, 0, W, H);

		if (menu_instance == false&&failureStateBool == false&&nxtLvlBool == false) {

		 	background(ctx);
		 	gameground(ctx);
		 	forground(ctx);
		}
		else if (failureStateBool) {
		 	forground(ctx);
		}
		else if (nxtLvlBool) {
			forground(ctx);
		}
		else{
			menu(ctx);
		};
	};//
};

function step(step_in_time){
  	if(isActive){
	  	progress = step_in_time - start_step_in_time;
	  	if(!menu_instance)
	  		collected_time += progress;
	  	// if(progress>0)
		  	update();
		start_step_in_time = step_in_time;
	}
};

window.addEventListener('load', load, false);
//window.requestAnimationFrame(step);


