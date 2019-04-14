/* Copyright (c) 2015, 2018, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   select2.js
 *
 * DESCRIPTION
 *   Executes queries to show array and object output formats.
 *   Gets results directly without using a ResultSet.
 *   Uses Oracle's sample HR schema.
 *
 *   Scripts to create the HR schema can be found at:
 *   https://github.com/oracle/db-sample-schemas
 *
 ******************************************************************************/

var async = require('async');
var oracledb = require('oracledb');
//var dbConfig = require('./dbconfig.js');

// Oracledb properties are applicable to all connections and SQL
// executions.  They can also be set or overridden at the individual
// execute() call level

// fetchArraySize can be adjusted to tune the internal data transfer
// from the Oracle Database to node-oracledb.  The value does not
// affect how, or when, rows are returned by node-oracledb to the
// application.  Buffering is handled internally by node-oracledb.
// Benchmark to choose the optimal size for each application or query.
//
// oracledb.fetchArraySize = 100;  // default value is 100

// This script sets outFormat in the execute() call but it could be set here instead:
//
// oracledb.outFormat = oracledb.OBJECT;

oracledb.getConnection(
  {
      user          : 'riyad',
      password      : '448787',
      connectString : 'localhost:1521/xe'
    },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      // The statement to execute
      `select * from products`,

      // The "bind value" 180 for the bind variable ":id"
      [],

      // execute() options argument.  Since the query only returns one
      // row, we can optimize memory usage by reducing the default
      // maxRows value.  For the complete list of other options see
      // the documentation.
      //{ maxRows: 2
        //, outFormat: oracledb.OBJECT  // query result format
        //, extendedMetaData: true      // get extra metadata
        //, fetchArraySize: 100         // internal buffer allocation size for tuning
      //},

      // The callback function handles the SQL execution results
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
        console.log(result.rows);     // [ [ 180, 'Construction' ] ]
        doRelease(connection);
      });
  });

// Note: connections should always be released when not needed
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
