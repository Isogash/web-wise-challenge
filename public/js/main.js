var heading = $(".heading-outer");
var realHeading = $(".heading"); //sorry!
var images = $(".quad-images");
var content = $(".content");
var blocker = $(".blocker");
var xs = $(".device-sm");

var headingLimit, animationStart, animationEnd;
var animate;
var animationDistance = 100;

function isXs() {
  return xs.is(':visible');
}

function onScroll() {

  if(animate) {
    var scrollY = $(window).scrollTop();

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

  var newAnimate = !isXs();
  if(!newAnimate && animate) { // if we switch to phone/tablet
    heading.css({ position: 'relative', top: 0 }); // let the title float
    images.css({ top: 0 }); // images don't move
    blocker.css({ height: 0 }); // don't push stuff down with the blocker
  }
  if(newAnimate) {
    heading.css({ position: 'fixed' }); // heading is now fixed to the top for animation
    blocker.css({ height: height}); // blocker pushes stuff down because the heading will no longer
  }
  animate = newAnimate;

  //setup animation variables AFTER
  headingLimit = content.offset().top - height;
  animationStart = headingLimit - animationDistance;
  animationEnd = headingLimit + animationDistance;

  onScroll();
}

$(window).scroll(onScroll);
$(window).resize(onResize);

onResize();
