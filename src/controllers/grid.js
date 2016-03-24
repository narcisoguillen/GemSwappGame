import ..main as GemSwapper
import ui.Color as Color;
import animate;

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

  animate(first.item).now({
    x: secondPos.x - 10,
    y: secondPos.y - 130
  });

  animate(second.item).now({
    x: firstPos.x - 10,
    y: firstPos.y - 130
  });
}

function clear(first, second){
  first.selected  = false;
  second.selected = false;
  first.item.updateOpts({backgroundColor  : unselected})
  second.item.updateOpts({backgroundColor : unselected})
}
