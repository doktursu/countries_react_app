var React = require('react');

var CountriesSelect = require('./CountriesSelect.jsx');

var RegionsSelect = React.createClass({

    getInitialState: function() {
        return {selectedIndex: null};
    },

    handleChange: function(e) {
        e.preventDefault();

        var region = e.target.value
        // var countries = this.filterCountriesByRegion(region)

        this.props.onSelectRegion(region);
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

    // filterCountriesByRegion: function(region) {
    //     if (region === 'All') return this.props.countries;
    //     console.log(region);
    //     if (region === 'Other') region = '';
    //     return this.props.countries.filter(function(country) {
    //         return country.region === region;
    //     });
    // },

    render: function() {
        var createOption = function(region) {
            return <option
                    value={region}
                    key={region}>
                {region}</option>
        }

        return (
            <div>
                <h4>RegionsSelect</h4>
                <select value={this.state.selectedIndex} onChange={this.handleChange}>
                    {this.filterRegions(this.props.countries).map(createOption)}
                </select>
            </div>
        );
    }
});

module.exports = RegionsSelect;