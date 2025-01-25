const express = require('express');
const fetch = require('node-fetch');
const duckdb = require('duckdb');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Initialize DuckDB
const db = new duckdb.Database(':memory:');
app.use(cors());

// Endpoint to read from any CSV and query it
app.get('/query-csv', async (req, res) => {
    const { csvFile, filterColumn, filterValue, sortColumn, sortOrder, page, pageSize } = req.query;
  
    if (!csvFile) {
      return res.status(400).send({ error: 'CSV file name is required as a query parameter' });
    }
  
    const csvUrl = `https://raw.githubusercontent.com/NouiraTaher/FootballTrivia/main/${csvFile}`;
    const tableName = path.basename(csvFile, '.csv'); // Use the filename (without .csv) as the table name
    const tempFilePath = path.join(__dirname, `${tableName}.csv`);
  
    try {
      // Check if the table is already created in DuckDB
      const tableExistsQuery = `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_name = '${tableName}';`;
      const tableExists = await new Promise((resolve, reject) => {
        db.all(tableExistsQuery, (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0].count > 0);
        });
      });
  
      // If the table doesn't exist, fetch and create it
      if (!tableExists) {
        console.log(`Fetching and creating table for CSV: ${csvUrl}`);
        const response = await fetch(csvUrl);
  
        if (!response.ok) {
          return res.status(500).send({ error: `Failed to fetch CSV: ${response.status}` });
        }
  
        const csvData = await response.text();
        fs.writeFileSync(tempFilePath, csvData);
  
        const createTableQuery = `
          CREATE TABLE ${tableName} AS 
          SELECT * FROM read_csv_auto('${tempFilePath}');
        `;
        db.run(createTableQuery);
        console.log(`Table '${tableName}' created successfully.`);
      }
  
      // Build the query with filtering, sorting, and pagination
      let query = `SELECT * FROM ${tableName}`;
  
      // Add filtering
      if (filterColumn && filterValue) {
        query += ` WHERE ${filterColumn} LIKE '%${filterValue}%'`;
      }
  
      // Add sorting
      if (sortColumn) {
        query += ` ORDER BY ${sortColumn} ${sortOrder === 'DESC' ? 'DESC' : 'ASC'}`;
      }
  
      if (page || pageSize) {
        const pageNum = parseInt(page, 10) || 1;
        const size = parseInt(pageSize, 10) || 10; // Default to 10 rows per page
        const offset = (pageNum - 1) * size;
        query += ` LIMIT ${size} OFFSET ${offset}`;
      }
  
      console.log('Executing query:', query);
  
      // Execute the query
      db.all(query, (err, rows) => {
        if (err) {
          console.error('DuckDB query error:', err);
          return res.status(500).send({ error: err.message });
        }
  
        // Convert BigInt to regular numbers
        const sanitizedRows = rows.map(row => {
          const sanitizedRow = {};
          for (const key in row) {
            sanitizedRow[key] = typeof row[key] === 'bigint' ? Number(row[key]) : row[key];
          }
          return sanitizedRow;
        });
  
        res.json(sanitizedRows); // Return sanitized results
      });
    } catch (error) {
      console.error('Error in /query-csv:', error);
      res.status(500).send({ error: 'An error occurred while processing the CSV file' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
