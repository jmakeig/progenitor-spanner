const express = require('express');
const { Spanner } = require('@google-cloud/spanner');

const spanner = new Spanner({
  projectId: 'handy-limiter-230400',
});
const instance = spanner.instance('sandbox');
const database = instance.database('progenitor');

const app = express();

app.get('/', async (req, res) => {
  // The query to execute
  const query = {
    sql: 'SELECT 1',
  };

  // Execute a simple SQL statement
  const [rows] = await database.run(query);

  res.send(`Rows: ${rows.join(', ')}`);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
