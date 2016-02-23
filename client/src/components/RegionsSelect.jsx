var React = require('react');

var CountriesSelect = require('./CountriesSelect.jsx');

var RegionsSelect = React.createClass({

    getInitialState: function() {
        return {selectedIndex: null, filteredCountries: []};
    },

    handleChange: function(e) {
        e.preventDefault();
        var index = e.target.value;

        var region = this.props.regions[index];
        var countries = this.filterCountriesByRegion(region)
        this.setState({filteredCountries: countries});
    },

    filterCountriesByRegion: function(region) {
        if (region === 'All') return this.props.countries;
        console.log(region);
        if (region === 'Other') region = '';
        return this.props.countries.filter(function(country) {
            return country.region === region;
        });
    },

    componentDidMount: function() {
        this.setState({filteredCountries: this.props.countries});
    },

    render: function() {
        var createOption = function(region, index) {
            return <option
                    value={index}
                    key={index}>
                {region}</option>
        }

        return (
            <div>
                <h4>RegionsSelect</h4>
                <select value={this.state.selectedIndex} onChange={this.handleChange}>
                    {this.props.regions.map(createOption)}
                </select>
                <CountriesSelect countries={this.state.filteredCountries} onSelectCountry={this.props.onSelectCountry}/>
            </div>
        );
    }
});

module.exports = RegionsSelect;