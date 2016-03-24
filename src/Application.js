import .main as GemSwapper; // Load main app

exports = Class(GC.Application, function(){
  this.initUI = GemSwapper.initialize; // Initialize Game
});
