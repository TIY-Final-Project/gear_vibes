/* tags-model js */

// 3rd party
var Backbone = require('backbone');



// local


var TagsModel = Backbone.Model.extend({
  urlRoot: '/api/tags/'
});


var TagsCollection = Backbone.Collection.extend({
  model: TagsModel,
  url: '/api/tags/'
});




module.exports = {
  TagsModel: TagsModel,
  TagsCollection: TagsCollection
};
