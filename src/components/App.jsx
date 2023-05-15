import { Component } from 'react';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';
import shortid from 'shortid';
import { H1, H2, Message } from './App/App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number === newContact.number
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts]
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const getVisibleContacts = this.getVisibleContacts();
    return (
      <>
        <H1>PhoneBook</H1>
        <ContactForm onSubmit={this.addContact} />
        {this.state.contacts.length > 0 ? (
          <div>
            <Filter value={filter} onChange={this.changeFilter} />
            <H2>Contacts</H2>
            {this.getVisibleContacts().length !== 0 ? (
              <Contacts
                contacts={getVisibleContacts}
                onDeleteContact={this.deleteContact}
              />
            ) : (
              <Message>No contacts found for your request</Message>
            )}
          </div>
        ) : (
          <Message>No contacts yet</Message>
        )}
      </>
    );
  }
}
