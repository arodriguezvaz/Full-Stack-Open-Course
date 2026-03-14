import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import People from "./components/People";

const App = () => {
	const [people, setPeople] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setFilter] = useState("");

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPeople(response.data);
		});
	}, []);
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
			id: people.length + 1,
			name: newName,
			number: newNumber,
		};
		if (people.some((person) => person.name === personObject.name)) {
			alert(personObject.name + " is already added to phonebook.");
		} else {
			setPeople(people.concat(personObject));
			setNewName("");
			setNewNumber("");
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
			<People people={peopleToShow} />
		</div>
	);
};

export default App;
