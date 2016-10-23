var heading = $(".heading");
var images = $(".quad-images");
var content = $(".content");
var xs = $(".device-sm");

var headingLimit;
var animate;

function isXs() {
  return xs.is(':visible');
}

function onScroll() {

  if(animate) {
    var scrollY = $(window).scrollTop();

    heading.css({ top: (scrollY < headingLimit ? scrollY : headingLimit) });
    images.css({ top: (scrollY / 2 )});
  }

}

function onResize() {
  headingLimit = content.offset().top - heading.outerHeight(true);
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
