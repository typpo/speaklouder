var slug = require('slug');
var util = require('util');

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
      campaign: result,
      descriptionHtml: result.descriptionHtml,

      edit: true,
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
  // FIXME(ian): You can edit anyone's post if you really wanted...
  var titleSlug = slug(req.body.title).toLowerCase();
  Campaign.update(
    {slug: titleSlug},
    {
      organizerName: req.body.organizerName,
      organizerEmail: req.body.organizerEmail,
      descriptionHtml: req.body.descriptionHtml.replace('ql-size', 'sl-ql-size')
    }, {}, function(err, result) {
      if (err) {
        res.send({
          success: false,
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
    // User is editing an existing campaign.
    return editCampaignPost(req, res);
  }

  Campaign.findOne({'slug': titleSlug}, function(err, result) {
    if (!err) {
      // Handle slug collision.
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

    req.flash('success', {
      msg: util.format('Here\'s your new campaign page!  Share it with others: http://www.speaklouder.org/%s', titleSlug),
    });
    res.send({
      success: true,
      slug: titleSlug,
    });
  });
};
