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
