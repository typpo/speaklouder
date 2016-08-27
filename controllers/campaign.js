
/**
 * GET /contact
 */
exports.contactGet = function(req, res) {
  res.render('edit', {
    title: 'Create a Campaign'
  });
};

/**
 * POST /contact
 */
exports.contactPost = function(req, res) {
  res.send('placeholder');
};
