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

});
