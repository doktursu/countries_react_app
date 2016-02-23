var React = require('react');

var CountriesSelect = require('./CountriesSelect.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');

var CountriesBox = React.createClass({

    getInitialState: function() {
        return {countries: [], currentCountry: null};
    },

    setCurrentCountry: function(country){
        this.setState({currentCountry: country});
    },

    componentDidMount: function() {
        var url = 'https://restcountries.eu/rest/v1/all';
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            var data = JSON.parse(request.responseText);
            console.log('got data', data);
            console.log('this', this);
            this.setState({countries: data, currentCountry: data[0]});
        }
        request.send(null);
    },

    render: function() {

        var countryDisplay;
        if (this.state.currentCountry) {
            countryDisplay = <CountryDisplay country={this.state.currentCountry} countries={this.state.countries} onSelectCountry={this.setCurrentCountry}/>
        }

        return (
            <div>
                <h4>CountriesBox</h4>
                <CountriesSelect countries={this.state.countries} onSelectCountry={this.setCurrentCountry}/>
                {countryDisplay}
            </div>
        );
    }
});

module.exports = CountriesBox;