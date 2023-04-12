import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class Contacts extends Component {
  state = {
    filter: '',
    contacts: [],
  };

  deleteContact = id => {
    this.props.deleteContact(id);
  };

  handleFiltering = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <p>Find contacts name</p>
        <input value={this.state.filter} onChange={this.handleFiltering} />
        <ul>
          {this.props.contacts
            .filter(contact =>
              contact.name
                .toLowerCase()
                .includes(this.state.filter.toLowerCase())
            )
            .map(contact => {
              return (
                <li name="contact" id={nanoid()}>
                  <p>
                    {contact.name}: {contact.number}
                    <button onClick={() => this.deleteContact(contact.id)}>
                      Delete
                    </button>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

Contacts.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
