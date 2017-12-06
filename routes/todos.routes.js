const { Router } = require('express');

const todos = Router();

// [{'id': number, title: string}]
let id = 3;
const todosArray = [
	{ id: 1, title: "Lorem ipsum dolor sit amet, vel ea dolore apeirian."},
	{ id: 2, title: "Lorem ipsum dolor sit amet, quo et sumo mucius molestiae."},
];

todos.get('/', (req, res) => {
	res.render('index',{ title: "TODO - Homepage", todos: todosArray });
});

todos.get('/new', (req, res) => res.render('new', { title: "TODO - Create" }));

todos.post('/new', (req, res) => {
	const newTodo = {
		id: id++,
		title: req.body.title
	};

	todosArray.push(newTodo);
	res.redirect('/');
});

todos.get('/edit/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const todo = todosArray.find( i => i.id === id );

	if (todo === undefined) {
		res.sendStatus(404);
		return;
	}

	res.render('edit', { title: "TODO - Edit", todo: todo })
});

todos.put('/:id', (req, res) => {
	const id = parseInt(req.params.id);
    const index = todosArray.findIndex(i => i.id === id);

    if (index === -1) {
        res.sendStatus(404);
        return;
    }

    todosArray[index].title = req.body.title;
	res.redirect('/');
});

todos.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = todosArray.findIndex( todo => todo.id === id);

	if (index === -1) { 
		res.json({success: false, message: "TODO is not found."});
		return;
	}

	todosArray.splice(index, 1);
	res.json({ success: true, message: "TODO was successfully deleted."});
});

module.exports = todos;
