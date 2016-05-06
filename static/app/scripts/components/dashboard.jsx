/* dashboard jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Image = require('react-bootstrap/lib/Image');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var models = require('../models/userProfileModel.js');
var collection = require('../models/userReviewsModel.js');

var Dashboard = React.createClass({
  getInitialState: function(){
    return {
      profile: new models.UserProfile(),
      reviews: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var profile = new models.UserProfile();
    var reviews = new collection.UserReviewsCollection();
    profile.fetch().then(function(data){
      self.setState({profile: profile});
    });
    reviews.fetch().then(function(data){
      self.setState({reviews: reviews});
    });
    
  },
  render: function(){
    var profile = this.state.profile;
    var reviews = this.state.reviews;




    if (!profile){
      return (<div className="hide" />);
    }

    var dashButton = {
      borderRadius: 'none'
    }



    return (

      <div>

        <div className="profile-header row-fluid">

          <div className="avatar-wrapper col-md-5 col-lg-5">
            <Image id="avatar" src={profile.get('profile_photo')} responsive />
          </div>
          <div className="header-content col-md-7 col-lg-7">
            <p className="dash-username">{profile.get('username')}</p>
            <h1>{profile.get('first_name')} {profile.get('last_name')}</h1>
            <p className="vibing-date">Vibing since {profile.get('joined')}</p>
          </div>
        </div>

          <div className="dash-content row-fluid">
            <div className="dash-sidebar-wrapper col-xs-2 col-lg-2">
              <div className="total-posts">
                <h3>{profile.get('total_posts')}</h3>
                <p>posts</p>
              </div>
              <div className="bio">
                <h3 className="bio-about">About <span className="bio-name">{profile.get('first_name')}</span></h3>
                <p>
                  {profile.get('bio')}
                </p>
              </div>
              <div className="profile-catagories">
                <h3>
                  <span className="contributed">Contributed</span>
                  <span className="contributed-to"> to</span>
                </h3>
                <ul className="contributions-list">
                  <ContributionComponent profile={profile}/>
                </ul>
              </div>
            </div>
            <div className="posts-content col-xs-6 col-lg-6">
              <h1 className="dash-reviews">Reviews:</h1>
              <ul className="posts-list">
                <ReviewListComponent reviews={reviews} />
              </ul>
            </div>
            <div className="col-md-4">
              <div className="dash-button-wrapper">
                <div className="create-wrapper">
                  <ButtonInput className="center-block" id="dash-button" onClick={this.props.createReview} value="Create Review" style={dashButton}/>
                </div>
                <div className="logout-wrapper">
                  <ButtonInput className="center-block" id="dash-button" onClick={this.props.logout} value="Logout" style={dashButton}/>
                </div>
                <div className="edit-wrapper">
                  <ButtonInput className="center-block" id="dash-button" onClick={this.props.editDash} value="Account Edit" style={dashButton}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row-fluid">

          </div>
      </div>
    )
  }
});



var ReviewListComponent = React.createClass({
  render: function(){
    var reviews = this.props.reviews;
    var reviewListing = reviews.map(function(review){
      return (
        <li className="posts-list-item" key={review.get('id')}>
          <span className="posts-list-catagory">{review.get('category_long_form')}</span>
          <a className="edit-link" href={"#dashboard/review/" + review.get('id') + "/edit"}>Edit</a>
          <div className="post-title-wrapper">
            <h3 className="post-item-title">
              <a href={"#dashboard/reviews/" + review.get('id')}>{review.get('title')}</a>
            </h3>
          </div>
          <span className="post-item-time">{review.get('created_at')}</span>
        </li>
      )
    });



    return (
      <div>
        {reviewListing}
      </div>
    )
  }
});


var ContributionComponent = React.createClass({
  render: function(){
    var contributions = this.props.profile.get('contributed_to');

    if (!contributions){
      return (<div className="hide" />);
    }

    var contribuitionListing = contributions.map(function(data, index){
      console.log(data);
      return (
        <li className="contributions-list-item" key={index}>
          <p>{data}</p>
        </li>
      )

    });

    return (
      <div>
        {contribuitionListing}
      </div>
    )
  }
});



module.exports = Dashboard;
