var React = require('react');

var BorderingCountriesDisplay = require('./BorderingCountriesDisplay.jsx');

var CountryDisplay = React.createClass({

    findBorderingCountries: function(myCountry) {
        return this.props.countries.filter(function(country) {
            return myCountry.borders.includes(country.alpha3Code);
        });
    },

    render: function() {

        var country = this.props.country;

        var borderingCountriesDisplay;
        if (country.borders.length !== 0) {
            borderingCountriesDisplay = <BorderingCountriesDisplay countries={this.findBorderingCountries(country)} onSelectCountry={this.props.onSelectCountry}/>
        }

        return (
            <div>   
                <h4>{country.name}</h4>
                <h1>{country.nativeName}</h1>
                <h4>Lat: {country.latlng[0]} Lng: {country.latlng[1]}</h4>
                {borderingCountriesDisplay}
            </div>
        );   
    }
});

module.exports = CountryDisplay;