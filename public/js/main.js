var heading = $(".heading-outer");
var realHeading = $(".heading"); //sorry!
var images = $(".quad-images");
var content = $(".content");
var blocker = $(".blocker");
var xs = $(".device-sm");

var headingLimit, animationStart, animationEnd;
var animate;
var animationDistance = 100;
var firstTime = true;

function isXs() {
  return xs.is(':visible');
}

function onScroll() {

  if(animate) {
    headingLimit = images.height();
    animationStart = headingLimit - animationDistance;
    animationEnd = headingLimit + animationDistance;

    var scrollY = $(window).scrollTop();

    console.log(animationStart);

    // quadratic animation smoothing
    var y;
    if(scrollY < animationStart) {
      //y = scrollY;
      y = 0
    } else if (scrollY < animationEnd) {
      var x = scrollY - animationStart;
      //y = scrollY - (1 / (animationDistance * 4) * (x * x));
      y = - (1 / (animationDistance * 4) * (x * x));
    } else {
      y = headingLimit - scrollY;
    }
    heading.css({ top: (y) });

    images.css({ top: (scrollY / 2 )});
  }

}

function onResize() {
  var height = heading.outerHeight(true);
  //console.log(height);

  animate = !isXs();
  if(!animate && !firstTime) { // if we switch to phone/tablet
    heading.css({ position: 'relative', top: 0 }); // let the title float
    images.css({ top: 0 }); // images don't move
    blocker.css({ height: 0 }); // don't push stuff down with the blocker
  } else {
    heading.css({ position: 'fixed' }); // heading is now fixed to the top for animation
    blocker.css({ height: height}); // blocker pushes stuff down because the heading will no longer
  }

  //onScroll();
}

onResize();

$(window).scroll(onScroll);
$(window).resize(function() { onResize(); onScroll(); });
