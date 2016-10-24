var heading = $(".heading");
var images = $(".quad-images");
var content = $(".content");
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
      y = scrollY;
    } else if (scrollY < animationEnd) {
      var x = scrollY - animationStart;
      y = scrollY - (1 / (animationDistance * 4) * (x * x));
    } else {
      y = headingLimit;
    }
    heading.css({ top: (y) });

    images.css({ top: (scrollY / 2 )});
  }

}

function onResize() {
  headingLimit = content.offset().top - heading.outerHeight(true);
  animationStart = headingLimit - animationDistance;
  animationEnd = headingLimit + animationDistance;
  var newAnimate = !isXs();
  if(!newAnimate && animate) { // if XS becomes hidden
    heading.css({ top: 0 });   // we should reset the elements
    images.css({ top: 0 });
  }
  animate = newAnimate;
  onScroll();
}

$(window).scroll(onScroll);
$(window).resize(onResize);

onResize();
