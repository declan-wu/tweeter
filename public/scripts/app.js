/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const daysToString = function(days) {
  const dayChart = [[365, "year"], [30, "month"], [7, "week"], [1, "day"]];
  if (days === 0) {
    return "today";
  }
  let ret = "";
  for (let size of dayChart) {
    let counter = 0;
    while (days >= size[0]) {
      counter++;
      days -= size[0];
    }
    if (counter > 1) {
      return `${counter} ${size[1]}s ago`;
    } else if (counter > 0) {
      return `${counter} ${size[1]} ago`;
    }
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const daysBetween = function(date) {
  const now = new Date();
  const diff = now.getTime() - date;
  const days = Math.round(diff / 86400000);
  return daysToString(days);
};

const createTweetElement = function(tweet) {
  const tweetContent = escape(tweet.content.text);
  const tweetLiteral = `
      <section class="tweet-feed">
        <img class="user-img"" src="${tweet.user.avatars}" alt="user image" />
        <p class="name">${tweet.user.name}</p>
        <p class="username">${tweet.user.handle}</p>
        <div class="tweet">
        <p>
            ${tweetContent}
        </p>
        </div>
        <p class="tweet-info"> ${daysBetween(Number(tweet.created_at))}</p>
        
      </section>`;
  return $(tweetLiteral);
};

const renderTweets = function(tweets) {
  const $tweetsContainer = $(".tweets-container");
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
  }
};

const loadtweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};

const handleNewTweet = function() {
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const $form = $(this),
      url = $form.attr("action"),
      term = $form.find("textarea[name='tweet']").val();
    if (term.length === 0) {
      $form
        .parent()
        .find(".error-msg")
        .html("Nothing entered!")
        .show();
    } else if (term.length > 140) {
      $form
        .parent()
        .find(".error-msg")
        .html("Too Long, respect our length limits!")
        .show();
    } else {
      $.post(url, { text: term });
      $form
        .parent()
        .find(".error-msg")
        .hide();
      // clear the textarea
      $form.find("textarea").val("");
      $(".tweets-container").empty();
      loadtweets();
    }
  });
};

const handleToggleClick = function(event) {
  event.preventDefault();
  const $newTweet = $(".new-tweet");
  if ($newTweet.css("display") == "none") {
    $newTweet.show();
  } else {
    $newTweet.hide();
  }
};

$(document).ready(function() {
  loadtweets();
  handleNewTweet();
  $("nav button").click(handleToggleClick);
});
