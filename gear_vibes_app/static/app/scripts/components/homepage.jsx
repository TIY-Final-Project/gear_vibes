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


var HomePage = React.createClass({
  render: function(){
    var jumbotron = {
      borderRadius: 0,
      height: '100vh'
    }
    return (
      <div>
        <Jumbotron className="jumbotron" style={jumbotron}>
          <div className="hero">
            <div className="header-outer">
              <div className="header-inner row-fluid">
                <div className="logo-container col-md-3">
                  <img src="/static/dist/images/white-logo.png" alt=""/>
                </div>
                <div className="header-nav-container col-md-9">
                  <ul className="header-nav-list">
                    <li className="header-nav-item">
                      <span className="login-container">
                        <a className="login-link" href="#" >Login</a>
                      </span>
                    </li>
                    <li className="header-nav-item">
                      <span className="login-container">
                        <img src="/static/dist/images/hamburgMenu.png" alt=""/>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Jumbotron>
        <ButtonInput onClick={this.props.createAccount} value="Create Account"/>
      </div>
    )
  }
});


module.exports = HomePage;
