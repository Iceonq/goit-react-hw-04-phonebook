import React, { Component } from 'react';

export class Section extends Component {
  render() {
    const { title, object } = this.props;

    return (
      <>
        <h1>{title}</h1>
        <div>{object}</div>
      </>
    );
  }
}
