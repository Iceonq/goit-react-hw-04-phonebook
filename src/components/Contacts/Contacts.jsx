import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, deleteContact }) => {
  const [filter, setFilter] = useState('');

  const handleFiltering = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <p>Find contacts name</p>
      <input value={filter} onChange={handleFiltering} />
      <ul>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => {
            return (
              <li name="contact" id={nanoid()}>
                <p>
                  {contact.name}: {contact.number}
                  <button onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

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

export default Contacts;
