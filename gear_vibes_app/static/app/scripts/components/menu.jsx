/* menu jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local



var MenuComponent = React.createClass({
  render: function(){

    if(this.props.toggleMenu){
      return (
        <div className="menu-outer">
          <div className="menu-inner row-fluid">
            <div className="menu-nav-wrapper col-md-5">
              <ul className="menu-nav-list">
                <li className="menu-nav-item">
                  <a href="">Home</a>
                </li>
                <li className="menu-nav-item">
                  <a href="#" onClick={this.props.handleAccount}>Account</a>
                </li>
                <li className="menu-nav-item">
                  <a href="search/">Search</a>
                </li>
                <li className="menu-nav-item">
                  <a href="#">About</a>
                </li>
              </ul>
            </div>
            <div className="menu-slogan-wrapper col-md-7">
              <h1>find it.</h1>
              <h1>love it.</h1>
              <h1>share it.</h1>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <div className="hidden"></div>
      )
    }

  }
});






module.exports = MenuComponent;
