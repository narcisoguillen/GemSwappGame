import ui.TextView  as TextView;
import ..lib.logger as Logger

function MainTitleView(options){
  Logger('Drawing: MainTitleView');

  this.title = new TextView({
    superview   : options.el             ,
    text        : 'Gem Swapper'          ,
    color       : 'white'                ,
    shadowColor : '#999999'              ,
    x           : 0                      ,
    y           : 0                      ,
    width       : options.el.style.width ,
    height      : 50
  });

}

exports = MainTitleView;
