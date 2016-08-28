var slug = require('slug');
var Campaign = require('../models/Campaign');

/**
 * GET /campaign/XXX
 */
exports.viewCampaignGet = function(req, res) {
  res.render('campaign', {
    // Judy TODO
  });
};

/**
 * GET /create-campaign
 */
exports.createCampaignGet = function(req, res) {
  res.render('edit', {
    title: 'Create a Campaign'
  });
};

/**
 * POST /create-campaign
 */
exports.createCampaignPost = function(req, res) {
  var campaign = new Campaign({
    title: req.body.title,
    description: req.body.description,
    organizerName: req.body.organizerName,
    email: req.body.email,
    slug: slug(req.body.title),
  });

  campaign.save();

  res.send({
    success: true
  });
};
