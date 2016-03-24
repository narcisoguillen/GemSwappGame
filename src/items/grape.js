import ui.ImageView as ImageView;
import event.input.drag as drag;
import ui.Color as Color;

function Grape(options){
  var grape = this;
  this.selected  = false;
  this.name      = 'Grape';

  var states = {
    on  : new Color({r: 200, g: 0, b: 0, a: 0.5}),
    off : new Color({r: 0, g: 0, b: 0, a: 0})
  };

  this.item = new ImageView({
    superview : options.el,
    image     : 'resources/images/grape.png',
    width     : 120,
    height    : 110,
    x         : options.x,
    y         : options.y
  });

  this.item.on('InputSelect', function(){
    grape.selected = !grape.selected;
    var state = grape.selected ? 'on' : 'off';
    this.updateOpts({backgroundColor: states[state]});
  });
}

exports = Grape;
