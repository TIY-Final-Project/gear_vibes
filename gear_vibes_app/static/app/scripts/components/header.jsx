/* header jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var Menu = require('./menu.jsx');
var LogLink = require('./loginOut.jsx');



var HeaderComponent = React.createClass({
  getInitialState: function(){
    return {
      toggleMenu: false
    }
  },
  handleAccount: function(e){
    e.preventDefault();
    Backbone.history.navigate('dashboard', {trigger: true});
    this.setState({toggleMenu: !this.state.toggleMenu});
  },
  toggleMenu: function(e){
    e.preventDefault();
    this.setState({toggleMenu: !this.state.toggleMenu});

  },
  render: function(){


    return (
      <div className="">
        <div className="header-outer">
          <div className="header-inner row-fluid">
            <div className="logo-container col-md-3">
              <a href="">
                <img src="/static/dist/images/white-logo.png" alt=""/>
              </a>
            </div>
            <div className="header-nav-container col-md-9">
              <ul className="header-nav-list">
                <li className="header-nav-item" id="login-nav-item">
                  <LogLink user={this.props.user}/>
                </li>
                <li className="header-nav-item">
                  <span onClick={this.toggleMenu} className="hamburg-container">
                    <img  src="/static/dist/images/hamburgMenu.png" alt=""/>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Menu
          toggleMenu={this.state.toggleMenu}
          handleAccount={this.handleAccount}
        />
      </div>

    )
  }
});



module.exports = HeaderComponent;
