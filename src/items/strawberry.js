import ui.ImageView as ImageView;
import event.input.drag as drag;

function Strawberry(options){

  this.item = new ImageView({
    superview : options.el,
    image     : 'resources/images/Strawberry.png',
    width     : 120,
    height    : 110,
    x         : options.x,
    y         : options.y
  });

  //drag.makeDraggable(this.item);
}

exports = Strawberry;
