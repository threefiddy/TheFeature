var canvas		    = document.getElementById("canvas");
canvas.width 		= document.body.clientWidth;
canvas.height 		= document.body.clientHeight;
canvas.style.width 	= canvas.width + "px";
canvas.style.height = canvas.height + "px";
var keyboard 		= new Image();
var association		= new Image();
keyboard.src = "imgs/keyboard.png";
association.src = "imgs/association.png";

var ctx				= canvas.getContext('2d');

var rect = new Rectangle(15, 15, 60, 60, association);
var rect2 = new Rectangle(90, 15, 60, 60, association);
var rect3 = new Rectangle(165, 15, 60, 60, association);

var rectArray=[];
rectArray.push(rect);
rectArray.push(rect2);
rectArray.push(rect3);

var movement = -1;

	//function preloader()
	//{
	//	keyboard.src = "imgs/keyboard.png";
	//}

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

setInterval(function()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(i=0;i<rectArray.length;i++)
	{
		rectArray[i].Draw(ctx,rectArray);

	}
	//alert(rect.Intersects(rect2))
	rect2.x += movement;
	if (rect2.Intersects(rect) || rect2.Intersects(rect3)) {
		movement*=-1;
	}
}, 33);

canvas.addEventListener('click',function(evt){
	var mousePos = getMousePos(canvas,evt);
	if (rect.Intersects(mousePos)) {
		//alert("u hit dat rectangle");
		rectArray.splice(rectArray.indexOf(rect), 1);
	}		
})