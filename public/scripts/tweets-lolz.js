$(function() {
  // console.log("Loading the tweets file");
  // add hover shadow effect
  //   $(".tweet-feed").hover(
  //     function() {
  //       $(this).addClass("hoverShadow");
  //       $(this)
  //         .find(".tweet")
  //         .css("font-weight", "bold");
  //     },
  //     function() {
  //       $(this).removeClass("hoverShadow");
  //       $(this)
  //         .find(".tweet")
  //         .css("font-weight", "normal");
  //     }
  //   );
  // });

  $(document)
    .on("mouseenter", ".tweet-feed", function() {
      $(this).addClass("hoverShadow");
      $(this)
        .find(".tweet")
        .css("font-weight", "bold");
    })
    .on("mouseleave", ".tweet-feed", function() {
      $(this).removeClass("hoverShadow");
      $(this)
        .find(".tweet")
        .css("font-weight", "normal");
    });
});
