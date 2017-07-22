$(document).ready(function() {
  // Set up the ACE editor.
  var editor = ace.edit('markdownInput');
  // Make the output window scroll to the bottom automatically whenever the
  // editor content changes.
  var isFollowing = false;
  var isAutosaving = false;

  var initEditor = function() {
    editor.getSession().setMode('ace/mode/markdown');

    editor.commands.addCommand({
      name: 'toggleReplaceForm',
      bindKey: 'Alt-r',
      exec: toggleReplaceForm,
      readOnly: false
    });

    // Retrieve saved Markdown from `localStorage'.
    if (localStorage.getItem('markdown')) {
      editor.setValue(localStorage.getItem('markdown'));
    }
  };

  var renderMarkdown = function() {
    $('#renderedContent').html(marked($('#markdownInput').val()));
    $('#renderedContent').html(marked(editor.getValue()));

    // Remove everything frmo the editor when clicking the welcom button.
    $('.js-welcomeButton').click(function() {
      $('#renderedContent').animate({'opacity': 0}, 'fast', function() {
	editor.setValue('');
	$(this).css({'opacity': 1})
      });
      editor.focus();
    });

    // Automatically add tabel styling.
    //
    $('#renderedContent').find('table').addClass(
      'table table-striped table-hover table-condensed');
  };

  editor.getSession().on('change', function() {
    renderMarkdown();
    if (isFollowing) {
      $('#renderedContent').animate({scrollTop: $('#renderedContent')
				     .height() * 9999}, 100);
    }

    // Save the current Markdown to `localStorage'.
    if (isAutosaving) {
      localStorage.setItem('markdown', editor.getValue());
      // Flash the saving indicator.
      $('#js-savingIndicator').html('Saving...');
      window.setTimeout(function() {
	$('#js-savingIndicator').html('');
      }, 1000);
    }
  });

  $('#renderButton').click(function() {
    // Render the Markdown.
    renderMarkdown();

    // Flash the output element.
    $('#renderedContent').animate({
      opacity: 0
    }, 'fast', function() {
      $('#renderedContent').animate({opacity: 100});
    });
  });

  var toggleReplaceForm = function() {
    $('#js-replaceForm').slideToggle(90).toggleClass('hidden');
    // $('#js-replaceForm').toggleClass('hidden');
    $('#js-replaceForm #js-replaceFrom').focus();
  };

  $('.js-replaceFormToggle').click(function() {
    toggleReplaceForm();
  });

  var replaceText = function() {
    var from = $('#js-replaceFrom').val();
    var to = $('#js-replaceTo').val();
    var caseSensitive = $('#js-replaceCase').is(':checked');
    var regExp = $('#js-replaceRegExp').is(':checked');

    editor.find(from, {
      caseSensitive: caseSensitive,
      regExp: regExp
    });
    editor.replaceAll(to);

    toggleReplaceForm();

    editor.focus();
  };

  $('#js-replaceButton').click(function() {
    replaceText();
  });

  $('#js-replaceForm input').keyup(function(e) {
    if (e.keyCode === 13) { // Enter
      replaceText();
    }
  });

  $('#js-undoButton').click(function() {
    editor.undo();
  });

  $('#js-redoButton').click(function() {
    editor.redo();
  });

  $('#js-keybindingsSelect').change(function() {
    var layout = $(this).val();
    if (layout === 'ace') {
      editor.setKeyboardHandler(null);
    } else {
      editor.setKeyboardHandler('ace/keyboard/' + layout);
    }
  });

  $('#js-isFollowingButton').change(function() {
    isFollowing = $(this).is(':checked');
  });

  $('#js-deleteDocumentButton').click(function() {
    localStorage.removeItem('markdown');
    location.reload();
  });

  $('#js-autosaveButton').click(function() {
    isAutosaving = $(this).is(':checked');
  });


  // Initial render.
  renderMarkdown();
  initEditor();
});
