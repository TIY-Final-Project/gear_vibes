/* create-review jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var reviews = require('../models/review-model.js');
var models = require('../models/user-model.js');
var gallery = require('../models/gallery-model.js');
var tags = require('../models/tags-model.js');
var submittedRating;

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
      rating: [],
      tags: []
    }
  },
  addTag: function(newTag){
    var tag = this.state.tags;
    tag.push(newTag);
    this.setState({'tags': tag});
  },
  addRating: function(newRating){
    var rating = this.state.rating;
    rating.push(newRating);
    this.setState({'rating': rating});
  },
  handleSubmit: function(e){
    e.preventDefault();
    console.log(this.state.tags);
    var self = this;
    var review = new reviews.ReviewsModel();
    var galleryImages = new gallery.GalleryModel();
    var reviewTags = new tags.TagsModel();


    review.set({
      "product_name": this.state.product_name,
      "title": this.state.title,
      "body": this.state.body,
      "author": this.state.author,
      "block_quote": this.state.block_quote,
      "video_url": this.state.video_url,
      "category": this.state.category,
      "rating": this.state.rating,
      "tags": this.state.tags
    });

    review.save().then(function(review){
      var data = new FormData();
      data.append('image', self.refs.featuredImage.getInputDOMNode().files[0]);
      data.append('review', review.id);

      $.ajax({
        url: '/api/galleryimages/',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
          self.props.router.navigate('dashboard/reviews/' + data.id, {trigger: true});
        },
        error: function(data){
          alert('no upload');
        }
      });


    });



  },
  render: function(){

    var i = -1;
    var rating = this.state.rating.map(function(rating, index){
      i++;
      return (<RatingTableFormset ref={"formset"} key={index} addRating={this.addRating} type="render" model={rating} />)
    }.bind(this));


    var tagList = this.state.tags.map(function(tagList, index){
      return (<TagsFormset ref={"formset"} key={index} addTag={this.addTag} model={tagList}/>)
    }.bind(this));




    return (
      <div className="col-xs-6 col-xs-offset-3 text-center">
        <form onSubmit={this.handleSubmit}>
          <Input ref="featuredImage" className="center-block" type="file" help="Upload your Featured Image" />
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

            {tagList}

            <TagsFormset ref={"formset"} key={tagList.id} addTag={this.addTag} type="edit" />

          <h3>Rating Table</h3>

            {rating}

            <RatingTableFormset ref={"formset"} key={i} index={i} addRating={this.addRating} type="edit" />
          {/*<ButtonInput value="Add Rating" />*/}
          <Input type="text" placeholder="Video URL" valueLink={this.linkState('video_url')}/>
          <Input className="center-block" type="file" help="Upload to Gallery" />
          <ButtonInput type="submit" value="Publish Review" />
        </form>
      </div>
    )
  }
});


var TagsFormset = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      tag: '',
      type: this.props.type
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.addTag({"name": this.state.tag});
    this.setState({tag: ''});
  },
  render: function(){
    if (this.state.type == "edit"){
      return (
        <div>
          <Input ref={"tag"} type="text" placeholder="Tags" valueLink={this.linkState('tag')}/>
          <ButtonInput value="Add Tag" onClick={this.handleSubmit}/>
        </div>
      )
    }else{
      return (
        <div>
          <span>{this.props.model.name}</span>
        </div>
      )
    }
  }
});


var RatingTableFormset = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      ratingType: '',
      ratingValue: '',
      type: this.props.type
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.addRating({'title':this.state.ratingType, 'value': this.state.ratingValue});
    this.setState({ratingType: '', ratingValue: ''});
  },
  render: function(){
    if(this.state.type == "edit"){
      return (
        <div>
          <Input ref={"title"} type="text" valueLink={this.linkState('ratingType')} placeholder="Rating Type"/>
          <Input ref={"value"} type="select" valueLink={this.linkState('ratingValue')} defaultValue="Value" placeholder="Rating Value">
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
          <ButtonInput onClick={this.handleSubmit} value="Add Rating"/>
        </div>
      )
    }else{
      return (
        <div>
          <span>{this.props.model.title}</span>
          <span>{this.props.model.value}</span>
        </div>
      )
    }

  }
});



module.exports = CreateReview;
