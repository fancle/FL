var ns = FL.ns("billd");
FL.import(ns, this, "Player, Map, YellowBall, Snail");
FL.import(FL, this, "Stage, LoadProgress, ImageLoader");

FL.debug = false;

var	canvas = document.querySelector("canvas");
var width = 550;
var height = 200;
var fps = 60;
var mc;

var stage = new Stage(canvas, width, height, fps);
stage.start();

var loadProgress = new LoadProgress(new ImageLoader());
loadProgress.x = width>>1;loadProgress.y=height>>1;
loadProgress.addEventListener("complete", function(){
	stage.removeChild(this);
	this.removeAllEventListener("complete", arguments.callee);
	loadProgress = null;
	R.images = this.loader.images; 
	init();
});
loadProgress.load(R.images);
stage.addChild(loadProgress);

stage.initMouseEvent();
stage.initKeyboardEvent();

var map, player;
var snails = [];

setInterval(function(){
	stage.render();
}, 1000/fps);

function init(){
	map = new Map();
	map.init(width*2, height);
	stage.addChild(map);
	Snail.map = YellowBall.map = map;

	player = Player.create();
	player.map = map;
	player.pos.x = 10;
	player.pos.y = 0;
	stage.addChild(player);

	for(var i = 0; i < 13;i ++)
	{
		ball = YellowBall.create(100, 100);
		stage.addChild(ball);
	}

	for(var i = 0; i < 13;i ++)
	{
		snail = Snail.create(Math.random()*width*2, 0);
		stage.addChild(snail);
		snails.push(snail);
	}
	
	stage.update = update;
}

function update(){
	if(player.pos.x >= width * .6 && -1*map.x < width)
	{
		player.pos.x = width * .6;
		map.x -= player.v.x;
	}

	if(player.pos.x <= width * .4 && map.x < 0)
	{
		player.pos.x = width * .4;
		map.x -= player.v.x;
	}

	if(player.pos.x < player.width*.5){
		player.pos.x = player.width*.5;
	}

	if(player.pos.x > width-player.width*.5){
		player.pos.x = width-player.width*.5;
	}

	for(var i = 0, l = snails.length;i < l;i ++)
	{
		var snail = snails[i];
		if(	snail.alive && player.hitTestObject(snail))
		{
			if(player.v.y > 0){
				player.v.y = -5;
				snail.v.y = -4;
				snail.v.x = 0;
				snail.scaleX = 1;
				snail.setCenter();
				snails.splice(snails.indexOf(snail), 1);
				TweenLite.to(snail, 2, {scaleX:.8, scaleY:.8, angle:10, onComplete:function(){
					stage.removeChild(snail);
				}})
				snail.alive = false;
			}	
			else{
				player.die();
			}
			break;
		}
	}
}