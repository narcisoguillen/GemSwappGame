import ui.ImageView as ImageView;
import event.input.drag as drag;

function Banana(options){

  this.item = new ImageView({
    superview : options.el,
    image     : 'resources/images/banana.png',
    width     : 130,
    height    : 130,
    x         : options.x,
    y         : options.y
  });

  //drag.makeDraggable(this.item);
}

exports = Banana;
