var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  organizerName: String,
  email: String,
  slug: String,
});

var Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;