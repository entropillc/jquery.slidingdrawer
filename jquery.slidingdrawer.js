$(function() {
  var drawer = $('div.drawer:first');
  var isDragging = false;
  var lastMouseX = 0;
  var delta = 0;
  var rotation = -90;
  
  drawer.bind('mousedown touchstart', function(evt) {
    var e = evt.originalEvent;
    
    isDragging = true;
    lastMouseX = evt.pageX || ((e.touches && e.touches.length) ? e.touches[0].pageX : 0);
    delta = 0;
    
    drawer.css({
      '-webkit-transition': 'none',
      'transition': 'none',
      '-webkit-transform': 'perspective(2000) rotate3d(0, 1, 0, ' + rotation + 'deg)',
      'transform': 'perspective(2000) rotate3d(0, 1, 0, ' + rotation + 'deg)'
    });
    evt.preventDefault();
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
    
    drawer.css({
      '-webkit-transform': 'perspective(2000) rotate3d(0, 1, 0, ' + rotation + 'deg)',
      'transform': 'perspective(2000) rotate3d(0, 1, 0, ' + rotation + 'deg)'
    });
    
    evt.preventDefault();
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
    
    drawer.css({
      '-webkit-transition': 'all 0.3s',
      'transition': 'all 0.3s',
      '-webkit-transform': 'perspective(2000) rotate3d(0, 1, 0, ' + rotation + 'deg)',
      'transform': 'perspective(2000) rotate3d(0, 1, 0, ' + rotation + 'deg)'
    });
    
    evt.preventDefault();
  });
});