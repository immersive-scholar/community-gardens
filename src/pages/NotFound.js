import React, { Component } from "react";
import { textContainer } from "styles";

class NotFound extends Component {
  render() {
    return [
      <div {...textContainer} key="sadface">
        <h1>Sorry, that page doesn't exist. :(</h1>
      </div>
    ];
  }
}

export default NotFound;
