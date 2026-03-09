import Person from "./Person";

const People = ({ people }) => {
	return (
		<ul>
			{people.map((person) => (
				<Person key={person.id} name={person.name} number={person.number} />
			))}
		</ul>
	);
};
export default People;
