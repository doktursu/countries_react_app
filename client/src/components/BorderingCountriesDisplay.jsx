var React = require('react');

var BorderingCountriesDisplay = React.createClass({

    handleClick: function(e) {
        e.preventDefault();
        var index = e.target.value;
        var country = this.props.countries[index]

        this.props.onSelectCountry(country);
    },

    render: function() {
        var createButtons = function(country, index) {
            return <button value={index} key={index} onClick={this.handleClick}>{country.name}</button>
        }.bind(this);

        return (
            <div>
                {this.props.countries.map(createButtons)}
            </div>
        );
    }
});

module.exports = BorderingCountriesDisplay;