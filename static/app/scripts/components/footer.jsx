/* homepage jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
require('backbone-react-component');


// local


var FooterComponent = React.createClass({
  render: function(){
    return (
      <footer>
        <div className="footer-bg-img row-fluid">
          <div className="col-md-4">
            <ul className="footer-social-nav row-fluid">
              <li className="footer-facebook footer-nav-item col-md-4">
                <a href="https://www.facebook.com/Brandon.Emerson77" className="center-block">
                  Facebook
                </a>
              </li>
              <li className="footer-twitter footer-nav-item col-md-4">
                <a href="https://twitter.com/?lang=en" className="center-block">
                  Twitter
                </a>
              </li>
              <li className="footer-instagram footer-nav-item col-md-4">
                <a href="https://www.instagram.com/izzbrancuh/" className="center-block">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ButtonInput className="center-block" id="account-create-btn" onClick={this.props.createAccount} value="Create Account"/>
          </div>
          <div className="col-md-4">
            <ul className="footer-cat-nav row-fluid">
              <li className="cat-mus footer-nav-item col-md-4">
                <a href="#" className="center-block">
                  Music Gear
                </a>
              </li>
              <li className="cat-phot footer-nav-item col-md-4">
                <a href="#" className="center-block">
                  Photography
                </a>
              </li>
              <li className="cat-mob footer-nav-item col-md-4">
                <a href="#" className="center-block">
                  Mobile Tech
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
});





module.exports = FooterComponent;
