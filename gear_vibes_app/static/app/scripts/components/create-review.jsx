/* create-review jsx */

// 3rd party
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var collection = require('../models/review-model.js');



// csrftoken
var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


var CreateReview = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      product_name: '',
      title: '',
      body: '',
      author: 1,
      block_quote: '',
      video_url: '',
      category: '',
      rating: [{title: 'Looks', value: 5}]
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var review = new collection.ReviewsCollection();

    review.create({
      "product_name": this.state.product_name,
      "title": this.state.title,
      "body": this.state.body,
      "author": this.state.author,
      "block_quote": this.state.block_quote,
      "video_url": this.state.video_url,
      "category": this.state.category,
      "rating": this.state.rating
    });
    console.log(review);




  },
  render: function(){
    return (
      <div className="col-xs-6 col-xs-offset-3 text-center">
        <form onSubmit={this.handleSubmit}>
          <Input className="center-block" type="file" help="Upload your Featured Image" />
          <Input type="text" placeholder="Product Name" valueLink={this.linkState('product_name')}/>
          <Input type="text" placeholder="Title" valueLink={this.linkState('title')}/>
          <Input type="textarea" placeholder="Body" valueLink={this.linkState('body')}/>
          <Input type="textarea" placeholder="Block Quote" valueLink={this.linkState('block_quote')}/>
          <Input type="select" defaultValue="Category" placeholder="category" valueLink={this.linkState('category')}>
            <option disabled value="Category">Category</option>
            <option value="mus">Music Gear</option>
            <option value="pho">Photography</option>
            <option value="mob">Mobile Tech</option>
          </Input>

            <TagsFormset ref={"formset"} />

          <ButtonInput value="Add Tag" />
          <h3>Rating Table</h3>

            <RatingTableFormset ref={"formset"}/>

          <ButtonInput value="Add Rating" />
          <Input type="text" placeholder="Video URL" valueLink={this.linkState('video_url')}/>
          <Input className="center-block" type="file" help="Upload to Gallery" />
          <ButtonInput type="submit" value="Publish Review" />
        </form>
      </div>
    )
  }
});


var TagsFormset = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <div>
        <Input ref={"tag"} type="text" placeholder="Tags" />
      </div>
    )
  }
});



var RatingTableFormset = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  render: function(){
    return (
      <div>
        <Input ref={"title"} type="text" placeholder="Rating Type" />
        <Input ref={"value"} type="select" defaultValue="Value" placeholder="Rating Value">
          <option disabled value="Value">Value</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Input>
      </div>
    )
  }
});



module.exports = CreateReview;
