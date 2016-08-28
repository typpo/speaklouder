var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  ownerID: {type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}
  // Supporters includes the owner
  supporters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Supporter'}],
}, schemaOptions);

var Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;