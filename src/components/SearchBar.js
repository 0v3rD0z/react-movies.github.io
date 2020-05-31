import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      intervalBeforeRequest: 1500,
      lockRequest: false
    };
  }

  handleChange = event => {
    this.setState({ searchText: event.target.value });
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true });
      setTimeout(() => {
        this.search();
      }, this.state.intervalBeforeRequest);
    }
  };

  handleClick = event => {
    this.search();
  };

  search() {
    this.props.callback(this.state.searchText);
    this.setState({ lockRequest: false });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input
            className="form-control input-lg"
            placeholder=
            "Tapez Votre film"
            onChange={this.handleChange.bind(this)}
            type="text"
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              onClick={this.handleClick.bind(this)}
            >
              GO
            </button>
          </span>
          <p> {this.state.searchText} </p>
        </div>
      </div>
    );
  }
}
