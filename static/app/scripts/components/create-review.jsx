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
      intro: '',
      body: '',
      author: 1,
      block_quote: '',
      video_url: '',
      category: '',
      rating: [],
      tags: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var getData = new reviews.ReviewsModel({id: self.props.router.reviewId});

    if (!self.props.router.reviewId){
      return;
    }


    getData.fetch().then(function(review){
      self.setState({
        product_name: review.product_name,
        title: review.title,
        intro: review.intro,
        body: review.body,
        author: review.author,
        block_quote: review.block_quote,
        video_url: review.video_url,
        category: review.category,
        rating: review.rating,
        tags: review.tags
      });
    });

    console.log(getData);


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

    var galleryImages = new gallery.GalleryModel();
    var reviewTags = new tags.TagsModel();
    var review;

    if (self.props.router.reviewId){
      review = new reviews.ReviewsModel({id: self.props.router.reviewId});
    }else{
      review = new reviews.ReviewsModel();
    }


    review.set({
      "product_name": this.state.product_name,
      "title": this.state.title,
      "body": this.state.body,
      "intro": this.state.intro,
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
          console.log(data);
          self.props.router.navigate('dashboard/reviews/' + data.review, {trigger: true});
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
      return (<RatingTableFormset key={index} addRating={this.addRating} type="render" model={rating} />)
    }.bind(this));


    var tagList = this.state.tags.map(function(tagList, index){
      return (<TagsFormset key={index} addTag={this.addTag} model={tagList}/>)
    }.bind(this));


    var mainInput = {
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'rgba(241, 241, 241, 1)',
      height: '60px',
      fontSize: '20px'
    }

    var textArea = {
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'rgba(241, 241, 241, 1)',
      height: '150px',
    }

    var blockQuote = {
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'rgba(241, 241, 241, 1)',
    }

    var publishButton = {
      borderRadius: 0
    }


    return (
      <div className="create-page">
        <div className="create-header row-fluid">

        </div>
        <div className="form-body container">
          <h1 className="create-title">Create a review...</h1>
          <form className="form-body-wrapper" onSubmit={this.handleSubmit}>
            <Input ref="featuredImage" id="featured-image" className="center-block" type="file"  />
            <div className="name-title-wrapper row">
              <div className="name-title-inner col-md-6 col-md-offset-3">
                <Input className="create-input" type="text" placeholder="Product Name" valueLink={this.linkState('product_name')} style={mainInput}/>
                <Input className="create-input" type="text" placeholder="Title" valueLink={this.linkState('title')} style={mainInput}/>
              </div>
            </div>
            <div className="review-text-wrapper row">
              <div className="review-text-inner col-md-6 col-md-offset-3">
                <h3>Intro</h3>
                <Input className="create-input" type="textarea" valueLink={this.linkState('intro')} style={textArea}/>
                <Input className="create-input" type="textarea" placeholder="Block Quote" valueLink={this.linkState('block_quote')} style={blockQuote}/>
                <h3>Body</h3>
                <Input className="create-input" type="textarea" valueLink={this.linkState('body')} style={textArea}/>
              </div>
            </div>
            <div className="review-cat-wrapper row">
              <div className="review-cat-inner col-md-6 col-md-offset-3">
                <div className="row">
                  <div className="col-md-3">
                    <Input style={mainInput} className="create-input" type="select" defaultValue="Category" placeholder="category" valueLink={this.linkState('category')}>
                      <option disabled value="Category">Category</option>
                      <option value="mus">Music Gear</option>
                      <option value="pho">Photography</option>
                      <option value="mob">Mobile Tech</option>
                    </Input>
                  </div>
                  <div className="col-md-9">
                    <Input className="create-input" type="text" placeholder="Video URL" valueLink={this.linkState('video_url')} style={mainInput}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="tag-rating-wrapper row">
              <div className="tag-rating-inner col-md-6 col-md-offset-3">
                <div className="row">
                  <div className="col-md-3">
                    {tagList}

                    <TagsFormset ref={"formset"} key={tagList.id} addTag={this.addTag} type="edit" />
                  </div>
                  <div className="col-md-9">
                    {rating}

                    <RatingTableFormset ref={"formset"} key={i} index={i} addRating={this.addRating} type="edit" />
                  </div>
                </div>
              </div>
            </div>
            <div className="publish-wrapper row">
              <h3>Ready for the world to see your review?</h3>
              <div className="publish-inner col-md-6 col-md-offset-3">
                <ButtonInput className="publish-button center-block" id="publish-button" type="submit" value="Publish Review" style={publishButton}/>
              </div>
            </div>
          </form>
        </div>
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

    var mainInput = {
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'rgba(241, 241, 241, 1)',
      height: '60px',
    }

    var tagAdd = {
      borderRadius: 0
    }

    if (this.state.type == "edit"){
      return (
        <div>
          <Input className="create-input" ref={"tag"} type="text" placeholder="Tags" valueLink={this.linkState('tag')} style={mainInput}/>
          <ButtonInput value="Add Tag" onClick={this.handleSubmit} id="add-tag" style={tagAdd}/>
        </div>
      )
    }else{
      return (
        <div className="tag-wrapper">
          <span className="tag-name">{this.props.model.name}</span>
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
      ratingValue: 5,
      type: this.props.type
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.addRating({'title':this.state.ratingType, 'value': this.state.ratingValue});
    this.setState({ratingType: '', ratingValue: ''});
  },
  render: function(){

    var mainInput = {
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'rgba(241, 241, 241, 1)',
      height: '60px',
    }

    var reviewAdd = {
      borderRadius: 0
    }

    var fader = {
      borderRadius: 0
    }

    if(this.state.type == "edit"){
      return (
        <div>
          <Input className="create-input" ref={"title"} type="text" valueLink={this.linkState('ratingType')} placeholder="Rating Type" style={mainInput}/>
          <h5 className="fader-numbers">
            <span className="one">1</span>
            <span className="ten">10</span>
          </h5>
          <Input className="create-input" id="fader" type="range" min="0" max="10" step=".1" valueLink={this.linkState('ratingValue')} style={fader}/>
          <ButtonInput onClick={this.handleSubmit} value="Add Rating" className="center-block" id="add-rating" style={reviewAdd}/>
        </div>
      )
    }else{
      return (
        <div className="create-rating-wrapper">
          <span className="create-rating-title">{this.props.model.title}</span>
          <span className="create-rating-value">{this.props.model.value}</span>
        </div>
      )
    }

  }
});



module.exports = CreateReview;
