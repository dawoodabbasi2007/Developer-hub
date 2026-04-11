const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    name:    { type: String, required: [true, 'Name is required'], trim: true },
    email:   { type: String, required: [true, 'Email is required'], lowercase: true, trim: true },
    phone:   { type: String, default: '' },
    date:    { type: String, required: [true, 'Date is required'] },
    time:    { type: String, required: [true, 'Time is required'] },
    topic:   { type: String, default: '' },
    status:  { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', meetingSchema);
