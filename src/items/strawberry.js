import ui.ImageView as ImageView;
import event.input.drag as drag;
import ui.Color as Color;

function Strawberry(options){
  var strawberry = this;
  this.selected  = false;
  this.name      = 'Strawberry';
  this.coors     = options.coors;

  var states = {
    on  : new Color({r: 100, g: 0, b: 190, a: 0.5}),
    off : new Color({r: 0, g: 0, b: 0, a: 0})
  };

  this.item = new ImageView({
    superview : options.el,
    image     : 'resources/images/Strawberry.png',
    width     : 120,
    height    : 110,
    x         : options.x,
    y         : options.y
  });

  this.item.on('InputSelect', function(){
    strawberry.selected = !strawberry.selected;
    var state = strawberry.selected ? 'on' : 'off';
    this.updateOpts({backgroundColor: states[state]});
  });
}

exports = Strawberry;
