const express = require('express');
const app = express();
const port = 8080; 

app.get("/calculus", (req, res) => {

	if (Object.keys(req.query).length === 0 || req.query.query === '') {
		res.status(400);
		return res.send({
			error: true,
			message: 'Missing query. Follow format i.e /calculus?query=[base64-encoded-query]'
		});
	}

	const query = req.query.query;
	let result: string;

	// Decode base64
	let buff = Buffer.from(query, 'base64');
	let decodedQuery = buff.toString('utf-8');
	
	// Remove whitespace
	decodedQuery = decodedQuery.replace(/\s+/g, '');;

	// Check for invalid characters
	if (!decodedQuery.match('^[0-9+-\/*()]*$')) {
		res.status(400);
		return res.send({
			error: true,
			message: 'Query contains invalid characters.'
		})
	}

	try {
		result = eval(decodedQuery);
	} catch (error) {
		res.status(400);
		return res.send({
			error: true,
			message: error
		});
	}
	
	res.status(200);
	return res.send({
		error: false,
		result
	});
});

// start the Express server
app.listen(process.env.PORT|| port, () => {
	console.log( `Server started on port ${ port }` );
});


module.exports = app;



