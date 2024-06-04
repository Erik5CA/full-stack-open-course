import { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";

export const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shonw with: <input onChange={handleFilter} />
    </div>
  );
};

export const PersonForm = ({
  handleSubmit,
  handleNewName,
  handleNewPhone,
  newPhone,
  newName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handleNewPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export const Persons = ({ personFil, handleDelete }) => {
  return (
    <>
      {personFil.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDelete(person)}>Delete</button>
        </div>
      ))}
    </>
  );
};

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null;
  }

  if (message) {
    return <div className="message">{message}</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [personFil, setPersonFil] = useState(persons);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersonFil(initialPersons);
      setPersons(initialPersons);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilter = (event) => {
    const filter = event.target.value;
    const personsFiltered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (filter === "") {
      setPersonFil(persons);
    } else {
      setPersonFil(personsFiltered);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personFind = persons.find((person) => person.name === newName);
    if (personFind) {
      const res = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one.`
      );
      if (res) {
        const personUpdated = { ...personFind, number: newPhone };
        personService
          .update(personFind.id, personUpdated)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setPersonFil(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewPhone("");
            setMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => setMessage(null), 3000);
          })
          .catch((err) => {
            setError(
              `Information of ${personFind.name} has already been removed from server.`
            );
            setTimeout(() => setError(null), 3000);
            setPersons(persons.filter((person) => person.id !== personFind.id));
            setPersonFil(
              persons.filter((person) => person.id !== personFind.id)
            );
          });
      } else {
        return;
      }
    } else {
      const newPerson = { name: newName, number: newPhone };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setPersonFil([...persons, returnedPerson]);
        setNewName("");
        setNewPhone("");
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => setMessage(null), 3000);
      });
    }
  };

  const handleDelete = (person) => {
    const res = window.confirm(`Delete ${person.name}`);
    if (res) {
      personService.deletePerson(person.id).then((personDeleted) => {
        setPersons(persons.filter((person) => person.id !== personDeleted.id));
        setPersonFil(
          persons.filter((person) => person.id !== personDeleted.id)
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter handleFilter={handleFilter} />

      <h2>Add New</h2>
      <PersonForm
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>
      <Persons personFil={personFil} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
