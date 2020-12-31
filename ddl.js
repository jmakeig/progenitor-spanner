// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';



async function createDatabase(instanceId, databaseId, projectId) {
	const { Spanner } = require('@google-cloud/spanner');

	/**
	 * TODO(developer): Uncomment the following lines before running the sample.
	 */
	// const projectId = 'my-project-id';
	// const instanceId = 'my-instance';
	// const databaseId = 'my-database';

	const spanner = new Spanner({
		projectId: projectId,
	});

	const instance = spanner.instance(instanceId);

	// Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so they
	// must be converted to strings before being inserted as INT64s
	const request = {
		schema: [
			`CREATE TABLE Singers (
        SingerId    INT64 NOT NULL,
        FirstName   STRING(1024),
        LastName    STRING(1024),
        SingerInfo  BYTES(MAX)
      ) PRIMARY KEY (SingerId)`,
			`CREATE TABLE Albums (
        SingerId    INT64 NOT NULL,
        AlbumId     INT64 NOT NULL,
        AlbumTitle  STRING(MAX)
      ) PRIMARY KEY (SingerId, AlbumId),
      INTERLEAVE IN PARENT Singers ON DELETE CASCADE`,
		],
	};

	// Creates a database
	const [database, operation] = await instance.createDatabase(
		databaseId,
		request
	);

		const x = instance.database('asdf').updateSchema
	console.log(`Waiting for operation on ${database.id} to complete...`);
	await operation.promise();

	console.log(`Created database ${databaseId} on instance ${instanceId}.`);
	// [END spanner_create_database]
}

