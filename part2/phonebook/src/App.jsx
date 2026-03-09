import { useState } from "react";

const Person = ({ name }) => <li>{name}</li>;

const App = () => {
	const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleInputChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			id: persons.length + 1,
			name: newName,
		};
		if (persons.some((person) => person.name === personObject.name)) {
			alert(personObject.name + " is already added to phonebook.");
		} else {
			setPersons(persons.concat(personObject));
			setNewName("");
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleInputChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>debug: {newName}</div>
			<ul>
				{persons.map((person) => (
					<Person key={person.id} name={person.name} />
				))}
			</ul>
		</div>
	);
};

export default App;
