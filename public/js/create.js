$(function() {
  var quill = new Quill('#editor', {
    modules: {
      toolbar: {
        container: '#toolbar'
      }
    },
    placeholder: 'Tell the world what you\'re doing...',
    theme: 'snow'
  });

  $('#submit').on('click', function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var title = $('#issue').val();
    var desc = $('#editor').find('.ql-editor').html();

    $.post('/create-campaign', {
      title: title,
      organizerName: name,
      email: email,
      descriptionHtml: desc,
    }, function(data) {
      // TODO(judy): redirect to created page.
    });
    return false;
  });
});
