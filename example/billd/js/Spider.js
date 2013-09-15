(function(win){
	var ns = FL.ns("billd");
	
	eval(FL.import("FL", "Utils, MovieClip"));
	eval(FL.import("ns", "Move"));
	
	var speed = 1.5;
	
	var Spider = ns.Spider = function(){
		MovieClip.apply(this, arguments);
		this.alive = true;
		this.pos = new Vector();
		this.v = new Vector(speed, 0);
		this.a = new Vector(0, .2);
		this.onGround = false;

	};
	Utils.extends(Spider, MovieClip);

	Spider.prototype.init = function()
	{
		this.addAnimation("stand", "0-9", true, 6);
		this.time = 0;

		this.setImg(R.images["spider"], 41, 24);
		this.originX = this.width * .5;
		this.originY = this.height - 5;

		this.move = new Move(this);
		this.move.addEventListener(Move.HIT_BOTTOM, onHit);
		this.move.addEventListener(Move.HIT_LEFT, onHit);
		this.move.addEventListener(Move.HIT_RIGHT, onHit);
	}

	Spider.prototype.doSth = function()
	{
		var r = Math.random();
		this.scaleX = this.v.x>0?1:-1;
		if(r < .002) 
		{
			this.v.x = -1 * speed;
		}
	};

	Spider.prototype.checkMap = function(map)
	{
		this.move.checkMap(this.getHitRect(), this.v, map);
		
		if(map && this.v.y > 0 && this.onGround)
		{
			this.onGround = false;
			this.pos.minus(this.v);
			this.v.x *= -1;
			this.v.y = 0;
		}
	};

	Spider.prototype.getHitRect = function(){
		return {
			x:this.pos.x - this.originX,
			y:this.pos.y - this.originY,
			width:this.width,
			height:this.height
		};
	}

	Spider.prototype.attack = function(){
		this.scaleX = this.scaleY = 1.4;
		var that = this;
		setTimeout(function(){
			that.scaleX = that.scaleY = 1;
		}, 300)
	};

	Spider.prototype.update = function()
	{
		this.x = this.pos.x + ns.map.x;
		this.y = this.pos.y + ns.map.y;
		
		if(!this.isInStage) return;
		this.bounds = this.getBounds();
		this.time += this.timeStep;

		this.v.plus(this.a);
		if(this.v.y > 5) this.v.y = 5;
		this.pos.plus(this.v);
		this.a.x = 0;
		
		this.alive && this.checkMap(ns.map);

		if(this.pos.x < this.width) {
			this.pos.x = this.width;
			this.v.x = speed;
		}
		if(this.pos.x > ns.map.width-this.width) {
			this.pos.x = ns.map.width-this.width;
			this.v.x = speed * -1;
		}
		

		this.alive && this.doSth();
	};

	Spider.create = function(x, y)
	{
		var ball = new Spider();
		ball.init();
		ball.play("stand");
		ball.pos.set(x||0, y||0);
		ball.update();
		return ball;
	}

	function onHit(data){
		var type = data.type;
		var data = data.data;
		var that = this.parent;
		if(type == Move.HIT_BOTTOM){

			that.pos.y = data.y;
			that.v.y = 0;
			that.angle = data.angle;
			that.a.x = Math.sin(that.angle) * (Math.cos(that.angle)>0?1:-1) * .07;
			that.onGround = true;
		}
	};

})(window);