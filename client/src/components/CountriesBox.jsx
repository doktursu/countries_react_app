var React = require('react');

var RegionsSelect = require('./RegionsSelect.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');

var CountriesBox = React.createClass({

    getInitialState: function() {
        return {countries: [], currentCountry: null, regions: []};
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
            this.setState({countries: data, currentCountry: data[0], regions: this.filterRegions(data)});
        }
        request.send(null);
    },

    filterRegions: function(countries) {
        var regions = countries.reduce(function(regions, country) {
            if (!regions.includes(country.region)) {
                regions.push(country.region);
            }
            return regions;
        }, []);

        regions.unshift('All');

        var index = regions.indexOf('');
        if (index !== -1) {
            regions[index] = 'Other';
        }

        return regions;
    },

    render: function() {

        var countryDisplay;
        if (this.state.currentCountry) {
            countryDisplay = <CountryDisplay country={this.state.currentCountry} countries={this.state.countries} onSelectCountry={this.setCurrentCountry}/>
        }

        return (
            <div>
                <h4>CountriesBox</h4>
                <RegionsSelect countries={this.state.countries} regions={this.state.regions} onSelectCountry={this.setCurrentCountry}/>
                {countryDisplay}
            </div>
        );
    }
});

module.exports = CountriesBox;