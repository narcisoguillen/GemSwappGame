import ui.ImageView as ImageView;
import event.input.drag as drag;
import ui.Color as Color;

function Orange(options){
  var orange = this;
  this.selected  = false;
  this.name      = 'Orange';
  this.coors     = options.coors;

  var states = {
    on  : new Color({r: 10, g: 0, b: 200, a: 0.5}),
    off : new Color({r: 0, g: 0, b: 0, a: 0})
  };

  this.item = new ImageView({
    superview : options.el,
    image     : 'resources/images/orange.png',
    width     : 120,
    height    : 110,
    x         : options.x,
    y         : options.y
  });

  this.item.on('InputSelect', function(){
    orange.selected = !orange.selected;
    var state = orange.selected ? 'on' : 'off';
    this.updateOpts({backgroundColor: states[state]});
  });
}

exports = Orange;
