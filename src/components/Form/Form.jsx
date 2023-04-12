import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleContactCreator = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const newContact = { id: nanoid(), name, number };
    if (this.props.contacts.find(contact => contact.name === name)) {
      alert(`Contact ${name} is in your contact list`);
    } else if (name === '') {
      alert('Type name and number for a new contact below');
    } else {
      this.props.onContactCreate(newContact);
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleContactCreator}>
        <label className={css.label}>
          <h3 className={css.labeltitle}>Name</h3>
          <input
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <h3 className={css.labeltitle}>Number</h3>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
          <button>Add contact</button>
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
