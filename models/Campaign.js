var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
  title: String,
  slug: String,

  organizerEmail: String,
  organizerName: String,
  subscriberPhones: [String],
  subscriberEmails: [String],

  descriptionHtml: String,

  editKey: String,
});

var Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
