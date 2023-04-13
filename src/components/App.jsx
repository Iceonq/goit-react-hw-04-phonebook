import React, { useEffect, useState } from 'react';

import '../styles.css';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Section from './Section/Section';
import PropTypes from 'prop-types';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const handleContactCreator = newContact => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <Section
        title={'Phonebook'}
        object={
          <Form contacts={contacts} onContactCreate={handleContactCreator} />
        }
      />
      <Section
        title="Contacts"
        object={<Contacts contacts={contacts} deleteContact={deleteContact} />}
      />
    </div>
  );
};

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
