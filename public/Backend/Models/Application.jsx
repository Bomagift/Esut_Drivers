const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  license: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
