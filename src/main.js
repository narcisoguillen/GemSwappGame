/*
 * GemSwapper NameSpace
 * */
import .lib.logger as Logger
import .views.MainView as MainView

var GemSwapper = {

  Views : {},

  // Initialze Game
  initialize : function(){
    Logger('Start');

    GemSwapper.Views.mainView = new MainView({
      el : this.view
    });

  }

};

exports = GemSwapper;
