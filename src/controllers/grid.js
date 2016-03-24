import ..main as GemSwapper
import ui.Color as Color;
import animate;
import ..lib.logger as logger

var unselected = new Color({r: 0, g: 0, b: 0, a: 0});
var swaping    = false;

exports.change = function(){
  var selected = [];

  // Let the game breath
  setTimeout(function(){

    // Get selected items
    for(item in GemSwapper.Grid){
      if(!GemSwapper.Grid[item]){ continue; }
      if(GemSwapper.Grid[item].selected){
        selected.push(GemSwapper.Grid[item]);
      }
    }

    if(selected.length === 2){
      var first  = selected[0];
      var second = selected[1];
      swap(first, second);
      clear(first, second);
    }
  }, 0);
};

exports.check = function(dt){
  checkX(); checkY();
};

//TODO improve
var timer = setInterval(function(){
  if(swaping){ return false; }
  var current;
  var prev;
  for(var x=0; x<GemSwapper.Grid.X; x++){
    for(var y=GemSwapper.Grid.Y; y>0; y--){
      current = GemSwapper.Grid[""+ x +""+ y];
      prev    = GemSwapper.Grid[""+ x +""+ (y - 1)];

      if(current === null && prev){

        animate(prev.item).now({
          y: prev.item.style.y + 115
        });

        prev.coors = {
          x : x,
          y : y
        };

        !function(prevG){
          GemSwapper.Grid[""+ x +""+ y] = prevG;
        }(prev);

        GemSwapper.Grid[""+ x +""+ (y - 1)] = null;
      }

    }
  }
}, 500);

function kill(list){
  var coorsX;
  var coorsY;

  for(item in list){
    coorsX = list[item].coors.x;
    coorsY = list[item].coors.y;
    GemSwapper.Grid[""+ coorsX +""+ coorsY] = null;
    list[item].item.removeFromSuperview();
  }


}

function swap(first, second){
  var firstPos  = first.item.getPosition();
  var secondPos = second.item.getPosition();

  var x = Math.abs(firstPos.x - secondPos.x);
  var y = Math.abs(firstPos.y - secondPos.y);

  // Sorry not posible only Up and Down
  if(x > 50 && y > 50){ clear(first, second); return false; }

  // Sorry to far in the X axis
  if(x > GemSwapper.Grid.increaseX + 50){ clear(first, second); return false; }

  // Sorry to far in the Y axis
  if(y > GemSwapper.Grid.increaseY + 50){ clear(first, second); return false; }

  move(first, second);
}

function clear(first, second){
  first.selected  = false;
  second.selected = false;
  first.item.updateOpts({backgroundColor  : unselected})
  second.item.updateOpts({backgroundColor : unselected})
}

//TODO improve
function checkX(){
  setTimeout(function(){
    var item  = null;
    var count = [];
    var current;
    var prev;

    for(var y=0; y<GemSwapper.Grid.Y; y++){
      if(count.length >= 3){ kill(count); }
      count = [];
      for(var x=0; x<GemSwapper.Grid.X; x++){
        current = GemSwapper.Grid[""+ x +""+ y];
        prev    = GemSwapper.Grid[""+ (x - 1) +""+ y] || {};
        if(!current){ continue; }
        if(current.name === prev.name){
          if(!count.length){ count.push(prev); }
          count.push(current);
        }else{
          if(count.length >= 3){ kill(count); }
          count = [];
        }
      }
    }

    if(count.length >= 3){ kill(count); }
  }, 5);
}

//TODO improve
function checkY(){
  setTimeout(function(){
    var item  = null;
    var count = [];
    var current;
    var prev;

    for(var x=0; x<GemSwapper.Grid.X; x++){
      if(count.length >= 3){ kill(count); }
      count = [];
      for(var y=0; y<GemSwapper.Grid.Y; y++){
        current = GemSwapper.Grid[""+ x +""+ y];
        prev    = GemSwapper.Grid[""+ x +""+ (y - 1)] || {};
        if(!current){ continue; }
        if(current.name === prev.name){
          if(!count.length){ count.push(prev); }
          count.push(current);
        }else{
          if(count.length >= 3){ kill(count); }
          count = [];
        }
      }
    }

    if(count.length >= 3){ kill(count); }
  }, 5);
}

function move(first, second){
  swaping = true;
  var firstGridX  = first.coors.x;
  var firstGridY  = first.coors.y;
  var secondGridX = second.coors.x;
  var secondGridY = second.coors.y;
  var firstPos    = first.item.getPosition();
  var secondPos   = second.item.getPosition();

  logger('Change a ' + first.name + ":" + firstGridX +""+ firstGridY +' for a ' + second.name + ":" + secondGridX +""+ secondGridY);

  animate(first.item).now({
    x: secondPos.x - 10,
    y: secondPos.y - 130
  });

  animate(second.item).now({
    x: firstPos.x - 10,
    y: firstPos.y - 130
  });

  // Logic change
  var firstGrid  = GemSwapper.Grid[""+ firstGridX +""+ firstGridY];
  var secondGrid = GemSwapper.Grid[""+ secondGridX +""+ secondGridY];

  !function(secondG){
    GemSwapper.Grid[""+ firstGridX +""+ firstGridY] = secondG;
  }(secondGrid);

  !function(firstG){
    GemSwapper.Grid[""+ secondGridX +""+ secondGridY] =firstG;
  }(firstGrid);

  first.coors = {
    x : secondGridX,
    y : secondGridY
  };

  second.coors = {
    x : firstGridX,
    y : firstGridY
  };
  swaping = false;
}
