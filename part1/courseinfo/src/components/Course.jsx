const Course = ({ course }) => {
	const total = course.parts.reduce(
		(accumulator, part) => accumulator + part.exercises,
		0,
	);
	return (
		<div>
			<h2>{course.name}</h2>
			{course.parts.map((part) => (
				<p key={part.id}>
					{part.name} {part.exercises}
				</p>
			))}
			<h3>total of {total} exercices</h3>
		</div>
	);
};

export default Course;
