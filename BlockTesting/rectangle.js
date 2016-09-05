Rectangle = function(x, y, w, h, image)
{
	if (x == null || y == null || w == null || h == null)
	{
		alert("You must pass in all the veriables for a rectange: (x, y, width, height)");
		
		var errorMsg = "The following are not provided:";
		if (x == null)
			errorMsg += " 'x' ";
		if (y == null)
			errorMsg += " 'y' ";
		if (w == null)
			errorMsg += " 'width' ";
		if (h == null)
			errorMsg += " 'height'";
		
		alert(errorMsg);
		throw new Error(errorMsg);
	}
	this.image = image;
	this.x		= x;
	this.y		= y;
	this.width	= w;
	this.height	= h;
	// this.hitbox = {
	// 	'Xlow':this.x, 
	// 	'Ylow':this.y, 
	// 	'Xhigh':this.x+this.width, 
	// 	'Yhigh':this.y+this.height
	// };
	this.hitbox = function(){
		return {
			'Xlow':this.x, 
			'Ylow':this.y, 
			'Xhigh':this.x+this.width, 
			'Yhigh':this.y+this.height
		}
	}
	this.Intersects = function(shape)
	{
		var hit_box=this.hitbox();
		var shape_box = shape.hitbox();
		
		if (this.Contains(shape_box.Xlow , shape_box.Ylow ) || this.Contains(shape_box.Xhigh , shape_box.Ylow ) ||
			this.Contains(shape_box.Xlow , shape_box.Yhigh ) || this.Contains(shape_box.Xhigh , shape_box.Yhigh ))
		{
			return true;
		}
		// else if (shape.Contains(this.x , this.y ) || shape.Contains(this.x + this.width , this.y ) ||
		// 	shape.Contains(this.x , this.y + this.height ) || shape.Contains(this.x + this.width , this.y + this.height ))
		// {
		// 	return true;
		// }
		
		return false;
	};
	
	this.Contains = function(x, y)
	{
		if (x >= this.x && x <= this.x + this.width &&
			y >= this.y && y <= this.y + this.height)
			return true;
		else 
			return false;
	};
	
	this.Draw = function(ctx)
	{
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};