var randomstring = require('randomstring');
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
  Campaign.findOne({
    slug: req.params.slug,
    editKey: req.query.key,
  }, function(err, result) {
    if (err || !result) {
      res.redirect('/create-campaign');
      return;
    }

    // Reverse the class renaming so Quill can understand it.
    result.descriptionHtml = result.descriptionHtml.replace('"sl-ql-', '"ql-');
    res.render('edit', {
      title: 'Edit a Campaign',
      campaign: result,

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
    {
      slug: titleSlug,
      editKey: req.body.editKey,
    },
    {
      organizerName: req.body.organizerName,
      organizerEmail: req.body.organizerEmail,
      descriptionHtml: req.body.descriptionHtml.replace('"ql-', '"sl-ql-')
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

  if (req.body.editKey) {
    // User is editing an existing campaign.
    return editCampaignPost(req, res);
  }

  Campaign.findOne({'slug': titleSlug}, function(err, result) {
    if (result) {
      // Handle slug collision.
      titleSlug += '-' + parseInt(new Date().getTime() / 1000);
    }

    var editKey = randomstring.generate(7);

    var campaign = new Campaign({
      title: req.body.title,
      slug: titleSlug,

      organizerName: req.body.organizerName,
      organizerEmail: req.body.organizerEmail,

      descriptionHtml: req.body.descriptionHtml.replace('"ql-', '"sl-ql-'),

      editKey: editKey,
    });

    campaign.save();

    var campaignUrl = util.format('http://www.speaklouder.org/campaign/%s', titleSlug);
    var editUrl = util.format('http://www.speaklouder.org/campaign/%s/edit?key=%s', titleSlug, editKey);

    var successFlashHtml =
      util.format('Here\'s your new campaign page!  Share it with others: <a href="%s">%s</a>', campaignUrl, campaignUrl);

    var editFlashHtml =
      util.format('To edit this page in the future, save this URL: <a href="%s">%s</a>.', editUrl, editUrl);

    req.flash('info', {
      msg: util.format('<p>%s</p><p>%s</p>', successFlashHtml, editFlashHtml),
    });

    res.send({
      success: true,
      slug: titleSlug,
    });
  });
};

/**
 * POST /campaign/:slug/addContact
 */
exports.addCampaignContact = function(req, res) {
  var titleSlug = slug(req.params.slug).toLowerCase();
  var contact = req.body.contact.trim();
  var isEmail = false;
  if (contact.indexOf('@') > -1) {
    isEmail = true;
  }

  var pushObj = {};
  pushObj[isEmail ? 'subscriberEmails' : 'subscriberPhones'] = contact;

  Campaign.update(
    { slug: titleSlug },
    { $push: pushObj },
    {}, function(err, result) {
      if (err) {
        res.send({
          success: false,
        });
        return;
      }
      res.send({
        success: true,
      });
    }
  );
}
