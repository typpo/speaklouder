var Campaign = require('../models/Campaign');

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
    title: req.body.title,
    description: req.body.description,
    organizerName: req.body.organizerName,
    email: req.body.email,
    slug: req.body.slug,
  });

  campaign.save();

  res.send({
    success: true
  });

};
