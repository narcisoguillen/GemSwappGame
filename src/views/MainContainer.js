import device;
import ui.View            as View;
import ui.Color           as Color;
import ..lib.logger       as Logger
import ..lib.collection   as Items
import ..controllers.grid as gridController

function MainContainer(options){
  Logger('Drawing: MainContainer');

  var rgba       = new Color({r: 215, g: 192, b: 178, a: 0.5});
  this.container = new View({
    superview       : options.el          ,
    backgroundColor : rgba                ,
    x               : 10                  ,
    y               : 130                 ,
    width           : device.width  - 20  ,
    height          : device.height - 150
  });

  this.container.on('InputSelect', gridController.change);

  this.container.items = Items.load({
    el : this.container
  });

}

exports = MainContainer;
