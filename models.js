'use strict';

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const blogSchema = mongoose.Schema({
  title: {type: String, require: true},
  content: {type: String, require: true},
  author: {
      {firstName: {type: String, require: true}},
      {lastName: {type: String, require: true}}
      }
});

blogSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.fullName,
  };
};

const Blogposts = mongoose.model("Blogposts", blogSchema);

module.exports = { Blogposts };
