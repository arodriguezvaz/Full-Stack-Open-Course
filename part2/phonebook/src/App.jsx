import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import People from "./components/People";
import personService from "./services/persons";

const App = () => {
	const [people, setPeople] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setFilter] = useState("");

	useEffect(() => {
		console.log("effect");
		personService.getAll().then((persons) => setPeople(persons));
	}, []);
	const handleInputNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleInputNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		console.log(event.target.value);
		setFilter(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
		};
		if (people.some((person) => person.name === personObject.name)) {
			alert(personObject.name + " is already added to phonebook.");
		} else {
			personService.create(personObject).then((newPerson) => {
				setPeople(people.concat(newPerson));
				setNewName("");
				setNewNumber("");
			});
		}
	};
	const deletePerson = (id) => {
		const personToDelete = people.find((person) => person.id === id);
		if (window.confirm(`Delete ${personToDelete.name} ?`)) {
			personService.drop(id).then(() => {
				setPeople(people.filter((p) => p.id !== id));
			});
		}
	};

	const peopleToShow = people.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase()),
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} onChange={handleFilterChange} />

			<h2>add a new</h2>
			<Form
				onSubmit={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleInputNameChange={handleInputNameChange}
				handleInputNumberChange={handleInputNumberChange}
			/>

			<h2>Numbers</h2>
			<People people={peopleToShow} handleDelete={deletePerson} />
		</div>
	);
};

export default App;
