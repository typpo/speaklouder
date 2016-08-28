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
  var slug = slug(req.body.title);
  var campaign = new Campaign({
    title: req.body.title,
    descriptionHtml: req.body.descriptionHtml,
    organizerName: req.body.organizerName,
    email: req.body.email,
    slug: slug,
  });

  campaign.save();

  res.send({
    success: true,
    slug: slug,
  });
};
