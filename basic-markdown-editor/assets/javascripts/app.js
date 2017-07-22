$(document).ready(function() {
  $('#renderButton').click(function() {
    // Render Markdown.
    $('#renderedContent').html(marked($('#markdownInput').val()));
    // Scroll to rendered Markdown.
    $('html, body').animate({
      scrollTop: $('#renderedContent').offset().top
    }, 1000)
  });
});
