var React = require('react');

var RegionsSelect = require('./RegionsSelect.jsx');
var CountriesSelect = require('./CountriesSelect.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');

var CountriesBox = React.createClass({

    getInitialState: function() {
        return {countries: [], currentCountry: null, regions: [], filteredCountries: []};
    },

    setCurrentCountry: function(country){
        this.setState({currentCountry: country});
    },

    setFilteredCountries: function(countries) {
        this.setState({filteredCountries: countries});
    },

    componentWillMount: function() {
        var url = 'https://restcountries.eu/rest/v1/all';
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            var data = JSON.parse(request.responseText);
            console.log('got data', data);
            console.log('this', this);
            this.setState({countries: data, currentCountry: data[0], regions: this.filterRegions(data), filteredCountries: data});
        }
        request.send(null);
    },

    filterRegions: function(countries) {
        var regions = countries.reduce(function(regions, country) {
            if (!regions.includes(country.region)) {
                regions.push(country.region);
            }
            return regions;
        }, ['All']);

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
                <RegionsSelect countries={this.state.countries} regions={this.state.regions} onSelectRegion={this.setFilteredCountries}/>
                <CountriesSelect countries={this.state.filteredCountries} onSelectCountry={this.setCurrentCountry}/>
                {countryDisplay}
            </div>
        );
    }
});

module.exports = CountriesBox;