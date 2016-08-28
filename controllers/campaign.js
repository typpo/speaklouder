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
 * GET /campaign/:slug/edit
 */
exports.editCampaignGet = function(req, res) {
  Campaign.findOne({'slug': req.params.slug}, function(err, result) {
    if (err) {
      res.redirect('/create-campaign');
      return;
    }
    res.render('edit', {
      title: 'Edit a Campaign',
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
 * Helper function to edit a campaign.
 */
function editCampaignPost(req, res) {
  var titleSlug = slug(req.body.title).toLowerCase();
  Campaign.update(
    {'slug': titleSlug},
    {
      title: req.body.title,
      slug: titleSlug,
      organizerName: req.body.organizerName,
      organizerEmail: req.body.organizerEmail,
      descriptionHtml: req.body.descriptionHtml.replace('ql-size', 'sl-ql-size')
    }, {}, function(err, result) {
      if (err) {
        res.send({
          success: false,
          slug: titleSlug,
        });
        return;
      }
      res.send({
        success: true,
        slug: titleSlug,
      });
    }
  );
};

/**
 * POST /create-campaign
 */
exports.createCampaignPost = function(req, res) {
  var titleSlug = slug(req.body.title).toLowerCase();

  if (req.body.edit) {
    return editCampaignPost(req, res);
  }
  Campaign.findOne({'slug': titleSlug}, function(err, result) {
    if (!err) {
      titleSlug += '-' + parseInt(new Date().getTime() / 1000);
    }

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
  });
};
