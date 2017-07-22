$(document).ready(function() {
  var renderMarkdown = function() {
    $('#renderedContent').html(marked($('#markdownInput').val()));
    // Automatically add tabel styling.
    //
    // $('#renderedContent').find('table').addClass('table table-striped table-hover');
  };

  renderMarkdown();

  $('#markdownInput').bind('input propertychange', function() {
    renderMarkdown();
  });

  $('#renderButton').click(function() {
    // Render the Markdown.
    renderMarkdown();

    // Scroll to rendered Markdown.
    //
    // $('html, body').animate({
    //   scrollTop: $('#renderedContent').offset().top
    // }, 1000)

    // Scroll to the top of output element.
    //
    // $('#renderedContent').animate({
    //   scrollTop: 0
    // });

    // Flash the output element.
    $('#renderedContent').animate({
      opacity: 0
    }, 'fast', function() {
      $('#renderedContent').animate({opacity: 100});
    });
  });
});
