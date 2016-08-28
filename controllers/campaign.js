
/**
 * GET /create-campaign
 */
exports.campaignGet = function(req, res) {
  res.render('edit', {
    title: 'Create a Campaign'
  });
};

/**
 * POST /create-campaign
 */
exports.campaignPost = function(req, res) {
  
  var campaign = new Campaign({
    
  })
};
