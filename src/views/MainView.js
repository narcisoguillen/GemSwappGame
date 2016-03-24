// NameSpace
import ..main as GemSwapper;

// Views
import .MainTitleView as MainTitleView
import .MainContainer as MainContainer

// Components
import ui.ImageView as ImageView;
import ..lib.logger as Logger

function MainView(options){
  Logger('Drawing: MainView');

  // Background
  var background = new ImageView({
    superview : options.el,
    x         : 0,
    y         : 90,
    width     : 1800,
    height    : 1600,
    image     : "resources/images/background.jpg",
    zIndex    : 0
  });

  // Title
  this.mainTitleView = new MainTitleView({
    el : options.el
  });

  // Container
  this.mainContainer = new MainContainer({
    el : options.el
  });

}

exports = MainView;
