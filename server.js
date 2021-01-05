// gcloud auth application-default login

const express = require('express');
const { Spanner } = require('@google-cloud/spanner');

const spanner = new Spanner({
	projectId: 'jmakeig-progenitor',
});
const instance = spanner.instance('sandbox');
const database = instance.database('progenitor');

const app = express();

app.get('/', async (req, res) => {
	// The query to execute
	const query = {
		sql: 'SELECT 1 AS value',
	};

	try {
		// Execute a simple SQL statement
		const [rows] = await database.run(query);
		return res.send(
			`Rows: ${rows.map((row) => JSON.stringify(row)).join(', ')}`
		);
	} catch (err) {
		res.status(500).send({ message: String(err) });
	}
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
