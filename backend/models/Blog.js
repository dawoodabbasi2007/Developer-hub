const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title:       { type: String, required: [true, 'Title is required'], trim: true },
    slug:        { type: String, unique: true },
    content:     { type: String, required: [true, 'Content is required'] },
    summary:     { type: String, default: '' },
    image:       { type: String, default: '' },
    author:      { type: String, default: 'Admin' },
    tags:        [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug from title before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
