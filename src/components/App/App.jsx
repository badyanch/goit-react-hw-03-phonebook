import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { GlobalStyle } from 'components/GlobalStyle';
import { getNormalizedName } from 'utils';
import { storageKeys } from 'constants';
import * as S from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(
      storageKeys.DATA_CONTACTS_L_STORAGE_KEY
    );

    if (!contacts) {
      return;
    }

    try {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(_, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem(
        storageKeys.DATA_CONTACTS_L_STORAGE_KEY,
        JSON.stringify(nextContacts)
      );
    }
  }

  handleChangeFilter = e => {
    const { value } = e.target;

    this.setState({ filter: value });
  };

  handleAddContact = ({ name, number }) => {
    const normalizedName = getNormalizedName(name);

    if (this.contactValidationByName(normalizedName)) {
      alert(`${normalizedName} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name: normalizedName, number };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  handleDeleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  contactValidationByName(newName) {
    const { contacts } = this.state;
    return contacts.some(({ name }) => name === newName);
  }

  getVisibleContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <S.Container>
        <GlobalStyle />

        <S.PrimaryTitle>Phonebook</S.PrimaryTitle>
        <ContactForm onSubmit={this.handleAddContact} />

        <S.SecondaryTitle>Contacts</S.SecondaryTitle>
        <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </S.Container>
    );
  }
}
