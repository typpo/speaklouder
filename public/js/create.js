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
      editKey: getUrlParameter('key')
    }, function(data) {
      if (!data.success) {
        analytics.track('create', {
          success: false,
          err: 'something went wrong'
        });
        alert('Sorry, something went wrong and we could not create your campaign :( Please try again later.');
        return;
      }
      // Redirect to created page.
      analytics.track('create', {
        success: true
      });
      window.location.href = '/campaign/' + data.slug;
    });
    analytics.track('create - submit');
    analytics.identify(name, {
      name: name,
      email: email
    });
    return false;
  });
});

function getUrlParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
