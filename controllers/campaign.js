var slug = require('slug');
var Campaign = require('../models/Campaign');

/**
 * GET /campaign/:slug
 */
exports.viewCampaignGet = function(req, res) {
  Campaign.findOne({'slug': req.params.slug}, function(err, result) {
    if (err) {
      res.redirect('/create-campaign');
      return;
    }
    res.render('campaign', {
      campaign: result
    });
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
  var titleSlug = slug(req.body.title).toLowerCase();
  var campaign = new Campaign({
    title: req.body.title,
    slug: titleSlug,

    organizerName: req.body.organizerName,
    organizerEmail: req.body.organizerEmail,

    descriptionHtml: req.body.descriptionHtml.replace('ql-size', 'sl-ql-size'),
  });

  campaign.save();

  res.send({
    success: true,
    slug: titleSlug,
  });
};
