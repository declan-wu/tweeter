$(document).ready(function() {
  // --- our code goes here ---
  // target the textarea: once user starts typing, update the keep according wordcouts;

  const handleWordCount = function(event) {
    let $textInput = $(this).val();
    let diff = 140 - $textInput.length;
    let $counter = $(".new-tweet .counter");
    $counter.text(diff);
    if (diff < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", " #545149");
    }
  };
  $(".new-tweet").on("keyup", "textarea", handleWordCount);
});
