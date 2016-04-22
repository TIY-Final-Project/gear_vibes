/* homepage jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Image = require('react-bootstrap/lib/Image');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var collection = require('../models/featuredModel.js');
var latest = require('../models/latestModel.js');



var HomePage = React.createClass({
  getInitialState: function(){
    return {
      featured: new collection.FeaturedCollection(),
      latestReviews: new latest.LatestCollection(),
      category: '',
      background: 0
    }
  },
  componentWillMount: function(){
    var self = this;
    var featured = new collection.FeaturedCollection({id: self.props.router.reviewId});
    self.latestReviews = new latest.LatestCollection({id: self.props.router.reviewId});

    featured.fetch().then(function(data){
      self.setState({featured: featured});
    });


    self.latestReviews.fetch().then(function(data){
      self.setState({latestReviews: self.latestReviews});
    });


  },
  componentDidMount: function(){
    var self = this;
    self.interval = setInterval(self.changeBackground, 10000);
  },
  componentWillUnmount: function(){
    var self = this;
    clearInterval(self.interval);
  },
  changeBackground: function(){
    var background = this.state.background;
    background += 1;
    if(this.state.background >= 2){
      background = 0;
    }
    this.setState({background: background});
  },
  latestShuffle: function(category, e){
    e.preventDefault();
    var self = this;

    self.latestReviews.category = category;
    self.latestReviews.fetch().then(function(data){
      self.setState({latestReviews: self.latestReviews});
    });

  },
  render: function(){
    var latestReviews = this.state.latestReviews || [];
    var featured = this.state.featured;
    var background = this.state.background;

    if(featured.length <= 0){
      return (<div className="hide" />);
    }

    var currentFeaturedReview =  featured.at(background);

    var jumbotron = {
      backgroundImage: 'url(' + currentFeaturedReview.get("review_images")[0] + ')',
      borderRadius: 0,
      height: '100vh',
      paddingLeft: 0,
      paddingRight: 0
    }



    return (
      <div>
        <section className="featured">
          <Jumbotron className="home-jumbotron" style={jumbotron}>
            <div className="hero">

              <div className="featured-content row-fluid">
                <div className="col-md-9">
                  <div className="featured-title-wrapper">
                    <h3 className="featured-title">{currentFeaturedReview.get('title')}</h3>
                  </div>
                  <div className="featured-bq-wrapper row-fluid">
                    <h1 className="featured-bq">
                      "{currentFeaturedReview.get('block_quote')}"
                    </h1>
                  </div>
                  <div className="featured-detail-wrapper">
                    <p>
                      <span className="featured-detail-pre">Read the
                        <a className="featured-full-review" href={"#dashboard/reviews/" + currentFeaturedReview.get('id')}> full review
                        </a> by </span>
                      <span className="featured-detail-author">{currentFeaturedReview.get('author_name')}
                      </span>
                      <span className="featured-detail-date"> {currentFeaturedReview.get('created_at')}</span>
                    </p>
                  </div>
                </div>
                <div className="featured-scroll-wrapper col-md-3">
                  <div className="featured-scroll">
                    <span className="">Scroll to discover</span>
                    <span className="featured-scroll-border"></span>
                  </div>
                </div>
              </div>
            </div>
          </Jumbotron>
        </section>
        <section className="latest">
          <div className="latest-wrapper row-fluid">
            <div className="latest-stuff-wrapper col-md-7">
              <ul className="latest-stuff-list row-fluid">
                <li className="latest-stuff-title col-md-6">
                  <h2 className="">Latest</h2>
                  <h2 className="">Stuff</h2>
                </li>

                <LatestReviews latestReviews={latestReviews}/>

              </ul>
            </div>
            <div className="latest-shuffle-wrapper col-md-5">
              <div className="latest-shuffle-inner row">
                <div className="shuffle-content-wrapper col-md-9">
                  <div className="shuffle-title">
                    <h2>Reviews by people<br/>just like you.</h2>
                  </div>
                  <ul className="shuffle-select">
                    <li className="shuffle-item">
                      <h2>
                        <span onClick={this.latestShuffle.bind(this, '')}>
                          Show all
                        </span>
                      </h2>
                    </li>
                    <li className="shuffle-item">
                      <h2>
                        <span onClick={this.latestShuffle.bind(this, 'mus')}>
                          Music Gear
                        </span>
                      </h2>
                    </li>
                    <li className="shuffle-item">
                      <h2>
                        <span onClick={this.latestShuffle.bind(this, 'pho')}>
                          Photography
                        </span>
                      </h2>
                    </li>
                    <li className="shuffle-item">
                      <h2>
                        <span onClick={this.latestShuffle.bind(this, 'mob')}>
                          Mobile Tech
                        </span>
                      </h2>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <div className="catagory-trans-wrapper">
                    <span>Categories</span>
                    <span className="side-cat-border"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    )
  }
});




var LatestReviews = React.createClass({
  render: function(){
    var self = this;
    var latest = self.props.latestReviews;


    if (latest.length <= 0){
      return (<div className="hide" />);
    }


    var latestList = latest.map(function(data){
      var latestImg = {
        backgroundImage: 'url(' + data.get('review_images') + ')'
      }
      return (
        <li className="latest-stuff-item col-md-6" key={data.cid} style={latestImg}>
          <h2 className="latest-item-title text-center">
            <a href={"#dashboard/reviews/" + data.get('id')}>{data.get('title')}</a>
          </h2>
          <div className="latest-user-detail">
            <span className="latest-by">By </span>
            <span className="latest-name">{data.get('author_name')} </span>
            <span className="latest-date">{data.get('created_at')} </span>
          </div>
        </li>
      )
    });



    return (
      <div>
        {latestList}
      </div>
    )
  }
});





module.exports = HomePage;
