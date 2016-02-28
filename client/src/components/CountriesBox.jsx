var React = require('react');

var RegionsSelect = require('./RegionsSelect.jsx');
var CountriesSelect = require('./CountriesSelect.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');

var CountriesBox = React.createClass({

    getInitialState: function() {
        return {countries: [], currentCountry: null, currentRegion: 'All'};
    },

    setCurrentCountry: function(country){
        this.setState({currentCountry: country});
    },

    // setFilteredCountries: function(countries) {
    //     this.setState({filteredCountries: countries});
    // },

    setCurrentRegion: function(region) {
        this.setState({currentRegion: region});
    },

    componentWillMount: function() {
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


    filterCountriesByRegion: function(region) {
        if (region === 'All') return this.state.countries;
        console.log(region);
        if (region === 'Other') region = '';
        return this.state.countries.filter(function(country) {
            return country.region === region;
        });
    },

    render: function() {

        var countryDisplay;
        if (this.state.currentCountry) {
            countryDisplay = <CountryDisplay country={this.state.currentCountry} countries={this.state.countries} onSelectCountry={this.setCurrentCountry}/>
        }

        return (
            <div>
                <h4>CountriesBox</h4>
                <RegionsSelect countries={this.state.countries} regions={this.state.regions} onSelectRegion={this.setCurrentRegion}/>
                <CountriesSelect countries={this.filterCountriesByRegion(this.state.currentRegion)} onSelectCountry={this.setCurrentCountry}/>
                {countryDisplay}
            </div>
        );
    }
});

module.exports = CountriesBox;