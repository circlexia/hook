// JavaScript Document
var mresize = function(){		
  var innerWidth = window.innerWidth;
  if( !innerWidth ){ 
    return false;
  }
  document.documentElement.style.fontSize = innerWidth/375*37.5 + 'px';
  console.log('屏幕宽度',innerWidth);
};
// mresize();
window.addEventListener( 'resize' , mresize , false );
window.addEventListener( 'load' , mresize , false );
// setTimeout(function(){
//     mresize();
// },0)
