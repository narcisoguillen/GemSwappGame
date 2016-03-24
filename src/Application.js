import .main             as GemSwapper;     // Load main app
import .controllers.grid as gridController; // Load main app

exports = Class(GC.Application, function(){
  this.initUI = GemSwapper.initialize; // Initialize Game

  setTimeout(function(){
    GC.app.engine.on('Tick', gridController.check);
  }, 10);
});
