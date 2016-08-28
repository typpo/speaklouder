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
  var titleSlug = slug(req.body.title);
  var campaign = new Campaign({
    title: req.body.title,
    slug: titleSlug,

    organizerName: req.body.organizerName,
    organizerEmail: req.body.organizerEmail,

    descriptionHtml: req.body.descriptionHtml,
  });

  campaign.save();

  res.send({
    success: true,
    slug: titleSlug,
  });
};
