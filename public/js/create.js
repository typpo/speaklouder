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
      organizerEmail: email,
      descriptionHtml: desc,
    }, function(data) {
      if (data.success) {
        alert('Sorry, something went wrong and we could not create your campaign :( Please try again later.');
        return;
      }
      // Redirect to created page.
      window.location.href = '/campaign/' + data.slug;
    });
    return false;
  });
});
