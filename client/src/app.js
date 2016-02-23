var React = require('react');
var ReactDOM = require('react-dom');

var CountriesBox = require('./components/CountriesBox.jsx');

window.onload = function(){
    console.log("webpack app started");

    ReactDOM.render(
      <CountriesBox/>,
      document.getElementById('app')
    );
};
