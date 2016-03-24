import ui.ImageView as ImageView;
import ui.Color as Color;
import event.input.drag as drag;

function Banana(options){
  var banana    = this;
  this.selected = false;
  this.name     = 'Banana';
  this.coors    = options.coors;

  var states = {
    on  : new Color({r: 100, g: 0, b: 0, a: 0.5}),
    off : new Color({r: 0, g: 0, b: 0, a: 0})
  };

  this.item = new ImageView({
    superview : options.el,
    image     : 'resources/images/banana.png',
    width     : 130,
    height    : 115,
    x         : options.x,
    y         : options.y
  });

  this.item.on('InputSelect', function(){
    banana.selected = !banana.selected;
    var state = banana.selected ? 'on' : 'off';
    this.updateOpts({backgroundColor: states[state]});
  });
}

exports = Banana;
