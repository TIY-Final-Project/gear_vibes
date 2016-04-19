/* featuredModel js */

// 3rd party
var Backbone = require('backbone');



// local




var FeaturedModel = Backbone.Model.extend({
  urlRoot: '/api/reviews/'
});



var  FeaturedCollection = Backbone.Collection.extend({
  model: FeaturedModel,
  url: '/api/reviews/',
  parse: function(data){
    return data.reviews;
  }
});





module.exports = {
  FeaturedModel: FeaturedModel,
  FeaturedCollection: FeaturedCollection
};
