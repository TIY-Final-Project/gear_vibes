/* latestModel js */

// 3rd party
var Backbone = require('backbone');



// local




var LatestModel = Backbone.Model.extend({

});




var LatestCollection = Backbone.Collection.extend({
  model: LatestModel,
  url: '/api/reviews/latest/',
  // queryString: function(elementId){
  //
  //
  //   switch (elementId){
  //     case 'musicGear':
  //       return (
  //         'category=Music%20Gear'
  //       );
  //     case 'photography':
  //       return (
  //         'category=Photography'
  //       );
  //     case 'mobileTech':
  //       return (
  //         'category=Mobile%20Tech'
  //       );
  //
  //   }
  // },
  parse: function(data){
    return data;
  }
});




module.exports = {
  LatestModel: LatestModel,
  LatestCollection: LatestCollection
};
