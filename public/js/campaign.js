$(function() {
  $('#subscribe').on('click', function() {
    var val = $('#contact').val().trim();
    if (!val) {
      alert('Please enter your email address or phone number.');
      return;
    }

    $(this).attr('disable', true);
    $.post(window.location.pathname + '/addContact', {
      contact: val
    }, function(data) {
      $('#contact-container').html('&#x2713; Thank you for signing up').addClass('success');
    });

    return false;
  });
});
