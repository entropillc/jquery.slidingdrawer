$(function() {
  var drawer = $('div.drawer:first');
  var isDragging = false;
  var lastMouseX = 0;
  var delta = 0;
  var rotation = -90;
  
  // TODO: REMOVE THIS!! - TEMP FIX TO AUTO-CLOSE DRAWER ON MODAL LAUNCH.
  drawer.data('closeDrawer', function() {
    rotation = -90;
    
    var transform = 'perspective(2000) translate3d(0, 0, 1px) rotate3d(0, 1, 0, ' + rotation + 'deg)';
    
    drawer.css({
      '-webkit-transition': 'all 0.5s',
      'transition': 'all 0.5s',
      '-webkit-transform': transform,
      'transform': transform
    });
  });
  
  drawer.bind('mousedown touchstart', function(evt) {
    var e = evt.originalEvent;
    
    isDragging = true;
    lastMouseX = evt.pageX || ((e.touches && e.touches.length) ? e.touches[0].pageX : 0);
    delta = 0;
    
    var transform = 'perspective(2000) translate3d(0, 0, 1px) rotate3d(0, 1, 0, ' + rotation + 'deg)';
    
    drawer.css({
      '-webkit-transition': 'none',
      'transition': 'none',
      '-webkit-transform': transform,
      'transform': transform
    });
    
    //evt.preventDefault();
  });
  
  $(window).bind('mousemove touchmove', function(evt) {
    if (!isDragging) return;
    
    var e = evt.originalEvent;
    var mouseX = evt.pageX || ((e.touches && e.touches.length) ? e.touches[0].pageX : 0);
    
    delta = (mouseX - lastMouseX) / 4;
    rotation += delta;
    
    if (rotation > 0) {
      rotation = 0;
    } else if (rotation < -90) {
      rotation = -90;
    }
    
    lastMouseX = mouseX;
    
    var transform = 'perspective(2000) translate3d(0, 0, 1px) rotate3d(0, 1, 0, ' + rotation + 'deg)';
    
    drawer.css({
      '-webkit-transform': transform,
      'transform': transform
    });
    
    //evt.preventDefault();
  }).bind('mouseup touchend', function(evt) {
    if (!isDragging) return;
    
    if (delta > 0) {
      rotation = 0;
    } else if (delta < 0) {
      rotation = -90;
    } else {
      if (rotation > -60) {
        rotation = 0;
      } else {
        rotation = -90;
      }
    }
    
    isDragging = false;
    lastMouseX = 0;
    delta = 0;
    
    var transform = 'perspective(2000) translate3d(0, 0, 1px) rotate3d(0, 1, 0, ' + rotation + 'deg)';
    
    drawer.css({
      '-webkit-transition': 'all 0.3s',
      'transition': 'all 0.3s',
      '-webkit-transform': transform,
      'transform': transform
    });
    
    //evt.preventDefault();
  });
});