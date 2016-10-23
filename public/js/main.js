var heading = $(".heading");
var images = $(".quad-images");
var content = $(".content");

var headingOffsetLimit = 0;

function onResize() {
  headingOffsetLimit = content.offset().top - heading.outerHeight(true);
}

function onScroll() {

  var scrollY = $(window).scrollTop();

  console.log(headingOffsetLimit);

  heading.css({ top: (scrollY < headingOffsetLimit ? scrollY : headingOffsetLimit) });
  images.css({ top: (scrollY / 2 )});

}

$(window).scroll(onScroll);
$(window).resize(onResize);

onResize();
