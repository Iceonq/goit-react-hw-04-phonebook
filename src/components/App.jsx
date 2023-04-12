import React, { Component } from 'react';

import '../styles.css';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Section } from './Section/Section';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleContactCreator = newContact => {
    const updatedContacts = [...this.state.contacts, newContact];
    this.setState({
      contacts: updatedContacts,
    });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  constructor(props) {
    super(props);
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.state = {
        contacts: JSON.parse(storedContacts),
      };
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <div>
        <Section
          title={'Phonebook'}
          object={
            <Form
              contacts={this.state.contacts}
              onContactCreate={this.handleContactCreator}
            />
          }
        />
        <Section
          title="Contacts"
          object={
            <Contacts
              contacts={this.state.contacts}
              deleteContact={this.deleteContact}
            />
          }
        />
      </div>
    );
  }
}
export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),

  filter: PropTypes.string,
};
