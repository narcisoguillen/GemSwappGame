import .logger as Logger

var Grid = {
  X : 5,
  Y : 10,
  increaseX : 140,
  increaseY : 120
};

//Items
import ..items.banana     as banana
import ..items.strawberry as strawberry

exports.load = function(options){
  Logger('Draw items');
  var itemName = null;
  for(var x=0; x<Grid.X; x++){
    for(var y=0; y<Grid.Y; y++){
      itemName = getItem();
      Grid[""+x+""+y] = new itemName({
        el : options.el,
        x  : x * Grid.increaseX,
        y  : y * Grid.increaseY
      });
    }
  }
}

function getItem(){
  var items = 2; // Number of different items
  var name  = {
    1 : banana,
    2 : strawberry
  };

  var random = Math.floor((Math.random() * items) + 1);
  return name[random];
}
