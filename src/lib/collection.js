import .logger as Logger
import ..main as GemSwapper

// Maybe send this to another component
GemSwapper.Grid = {
  X : 5,           // Calculate with device
  Y : 10,          // Calculate with device
  increaseX : 140, // Calculate with device
  increaseY : 120  // Calculate with device
};

//Items
import ..items.banana     as banana
import ..items.strawberry as strawberry
import ..items.limon      as limon
import ..items.grape      as grape

exports.load = function(options){
  Logger('Draw items');
  var itemName = null;
  for(var x=0; x<GemSwapper.Grid.X; x++){
    for(var y=0; y<GemSwapper.Grid.Y; y++){
      itemName = getItem();
      GemSwapper.Grid[""+ x +""+ y] = new itemName({
        el : options.el,
        x  : x * GemSwapper.Grid.increaseX,
        y  : y * GemSwapper.Grid.increaseY
      });
    }
  }
}

function getItem(){
  var items = 4; // Number of different items
  var name  = {
    1 : banana     ,
    2 : strawberry ,
    3 : limon      ,
    4 : grape
  };

  var random = Math.floor((Math.random() * items) + 1);
  return name[random];
}
