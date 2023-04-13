import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css';

const Form = ({ contacts, onContactCreate }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleContactCreator = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name, number };
    if (contacts.find(contact => contact.name === name)) {
      alert(`Contact ${name} is in your contact list`);
    } else if (name === '') {
      alert('Type name and number for a new contact below');
    } else {
      onContactCreate(newContact);
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleContactCreator}>
      <label className={css.label}>
        <h3 className={css.labeltitle}>Name</h3>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <h3 className={css.labeltitle}>Number</h3>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <button>Add contact</button>
      </label>
    </form>
  );
};

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Form;
