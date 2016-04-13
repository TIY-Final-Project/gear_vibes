/* gallery-model js */

// 3rd party
var Backbone = require('backbone');



// local


var GalleryModel = Backbone.Model.extend({
  urlRoot: '/api/galleryimages/'
});


var GalleryCollection = Backbone.Model.extend({
  model: GalleryModel,
  url: '/api/galleryimages/'
});



module.exports = {
  GalleryModel: GalleryModel,
  GalleryCollection: GalleryCollection
};
