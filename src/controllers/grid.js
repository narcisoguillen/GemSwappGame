import ..main as GemSwapper
import ui.Color as Color;
import animate;
import ..lib.logger as logger

var unselected = new Color({r: 0, g: 0, b: 0, a: 0});

exports.change = function(){
  var selected = [];

  // Let the game breath
  setTimeout(function(){

    // Get selected items
    for(item in GemSwapper.Grid){
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

function kill(list){
  for(item in list){
    GemSwapper.Grid[""+ list[item].coors.x +""+ list[item].coors.y] = null;
    delete GemSwapper.Grid[""+ list[item].coors.x +""+ list[item].coors.y];
    list[item].item.removeFromSuperview();
  }
}

function swap(first, second){
  var firstPos  = first.item.getPosition();
  var secondPos = second.item.getPosition();

  var x = Math.abs(firstPos.x - secondPos.x);
  var y = Math.abs(firstPos.y - secondPos.y);

  // Sorry not posible only Up and Down
  if(x > 0 && y > 0){ clear(first, second); return false; }

  // Sorry to far in the X axis
  if(x > GemSwapper.Grid.increaseX){ clear(first, second); return false; }

  // Sorry to far in the Y axis
  if(y > GemSwapper.Grid.increaseY){ clear(first, second); return false; }

  var firstGridX  = first.coors.x;
  var firstGridY  = first.coors.y;
  var secondGridX = second.coors.x;
  var secondGridY = second.coors.y;

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
}

function clear(first, second){
  first.selected  = false;
  second.selected = false;
  first.item.updateOpts({backgroundColor  : unselected})
  second.item.updateOpts({backgroundColor : unselected})
}

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
  }, 5);
}

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
  }, 5);
}
