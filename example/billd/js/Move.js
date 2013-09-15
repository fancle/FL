(function(win){
	var ns = FL.ns("billd");
	eval(FL.import("FL", "Utils, EventDispatcher"));

	var Move = ns.Move = function(parent){
		EventDispatcher.call(this);
		this.parent = parent;
	};
	Utils.extends(Move, EventDispatcher);

	var PADDING = 5;
	
	var HIT_LEFT = Move.HIT_LEFT = "HIT_LEFT";
	var HIT_RIGHT = Move.HIT_RIGHT = "HIT_RIGHT";
	var HIT_BOTTOM = Move.HIT_BOTTOM = "HIT_BOTTOM";
	var HIT_TOP = Move.HIT_TOP = "HIT_TOP"; 
	
	Move.prototype.checkMap = function(rect, v, map){
		if(!map) return;

		var centerX = rect.x + rect.width*.5;
		var x = rect.x;
		var y = rect.y;
		var width = rect.width;
		var height = rect.height;
		var right = x + width;
		var bottom = y + height;

		//脚碰地
		if(v.y >= 0)
		{
			var dataArr = map.mapData[centerX>>0];
			if(dataArr){
				for(var i = 0, l = dataArr.length;i < l;i ++)
				{
					var data = dataArr[i];
					if(data.y <= bottom + PADDING && data.y >= bottom - PADDING)
					{
						this.dispatchEvent({type:HIT_BOTTOM, data:{
							y:data.y, angle:data.ang
						}})
						break;
					}
				}
			}
		}

		//头碰墙
		// var dataArr = map.wallData[top - PADDING];
		// if(v.x > 0)//碰右边墙
		// {
		// 	if(dataArr){
		// 		for(var i = 0, l = dataArr.length;i < l;i ++)
		// 		{
		// 			var x = dataArr[i];
		// 			if(x <= right && x >= right - PADDING)
		// 			{
		// 				this.dispatchEvent({type:HIT_RIGHT, data:dataArr[i]});
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
		// else if(v.x < 0)//碰左边墙
		// {
		// 	if(dataArr){
		// 		for(var i = 0, l = dataArr.length;i < l;i ++)
		// 		{
		// 			var x = dataArr[i];
		// 			if(x <= x + PADDING && x >= x)
		// 			{
		// 				this.dispatchEvent({type:HIT_LEFT, data:dataArr[i]});
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
		// //脚碰墙
		// var dataArr = map.wallData[bottom + PADDING];
		// if(v.x > 0)//碰右边墙
		// {
		// 	if(dataArr){
		// 		for(var i = 0, l = dataArr.length;i < l;i ++)
		// 		{
		// 			var x = dataArr[i];
		// 			if(x <= right && x >= right - PADDING)
		// 			{
		// 				this.dispatchEvent({type:HIT_RIGHT, data:dataArr[i]});
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
		// else if(v.x < 0)//碰左边墙
		// {
		// 	if(dataArr){
		// 		for(var i = 0, l = dataArr.length;i < l;i ++)
		// 		{
		// 			var x = dataArr[i];
		// 			if(x <= x + PADDING && x >= x)
		// 			{
		// 				this.dispatchEvent({type:HIT_LEFT, data:dataArr[i]});
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
	};

})(this);