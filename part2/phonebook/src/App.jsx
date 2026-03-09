import { useState } from "react";

const Person = ({ name, number }) => (
	<li>
		{name} {number}
	</li>
);

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setFilter] = useState("");

	const handleInputNameChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleInputNumberChange = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		console.log(event.target.value);
		setFilter(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			id: persons.length + 1,
			name: newName,
			number: newNumber,
		};
		if (persons.some((person) => person.name === personObject.name)) {
			alert(personObject.name + " is already added to phonebook.");
		} else {
			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
		}
	};

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase()),
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with{" "}
				<input value={newFilter} onChange={handleFilterChange} />
			</div>
			<h2>add a new</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleInputNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleInputNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{personsToShow.map((person) => (
					<Person key={person.id} name={person.name} number={person.number} />
				))}
			</ul>
		</div>
	);
};

export default App;
