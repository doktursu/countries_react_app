var React = require('react');

var RegionsSelect = React.createClass({

    getInitialState: function() {
        return {selectedIndex: null};
    },

    handleChange: function() {

    },

    filterRegions: function() {
        var regions = this.props.countries.reduce(function(regions, country) {
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
                    {this.filterRegions().map(createOption)}
                </select>
            </div>
        );
    }
});

module.exports = RegionsSelect;