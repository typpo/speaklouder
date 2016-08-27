$(function() {
  var quill = new Quill('#editor', {
    modules: {
      toolbar: true,
    },
    placeholder: 'Tell the world what you\'re doing...',
    theme: 'snow'
  });

});
