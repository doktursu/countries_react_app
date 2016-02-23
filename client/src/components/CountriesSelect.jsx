var React = require('react');

var CountriesSelect = React.createClass({

    getInitialState: function() {
        return {selectedIndex: null};
    },

    handleChange: function(e) {
        e.preventDefault();

        var index = e.target.value;
        this.setState({selectedIndex: index});

        var country = this.props.countries[index]
        this.props.onSelectCountry(country);
    },

    render: function() {

        var createOption = function(country, index) {
            return <option
                    value={index}
                    key={index}>
                {country.name}</option>
        }

        return (
            <div>
                <h4>CountriesSelect</h4>
                <select value={this.state.selectedIndex} onChange={this.handleChange}>
                    {this.props.countries.map(createOption)}
                </select>
            </div>
        );
    }
});

module.exports = CountriesSelect;