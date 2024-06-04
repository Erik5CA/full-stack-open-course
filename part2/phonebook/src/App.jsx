import { useState } from "react";

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

export const Persons = ({ personFil }) => {
  return (
    <>
      {personFil.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [personFil, setPersonFil] = useState(persons);

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
    if (personFind) return alert(`${newName} is already added to phonebook`);
    const newPerson = { name: newName, number: newPhone };
    setPersons([...persons, newPerson]);
    setPersonFil([...persons, newPerson]);
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personFil={personFil} />
    </div>
  );
};

export default App;
