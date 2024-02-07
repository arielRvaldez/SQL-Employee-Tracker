const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: 'Ariel8290',
  database: 'employees_db'
})

db.query('SELECT * FROM employees', function (err, results) {
  console.log(results);
});

db.connect(err => {
  if (err) {throw err}
  console.log('Connected to the Employee database.')
})

app.get('/create-employee', (req, res) => {
  let sql = 'CREATE DATABASE employees_db';
  db.query(sql, err => {
      if (err) {throw err}
      res.send('Database created...')
  })
})

//create table
app.get('/create-table', (req, res) => {
  let sql = 'CREATE TABLE employees (id INT AUTO_INCREMENT, employee_name VARCHAR(50), department VARCHAR (255), PRIMARY KEY (id))';
  db.query(sql, err => {
      if (err) {throw err}
      res.send('Employees table created...')
  })
})

//insert employee 
app.get('/employee1', (req, res) => {
  let post = {employee_name: 'John Doe', department: 'Marketing'}
  let sql = 'INSERT INTO employees SET ?';
  let query = db.query(sql, post, err => {
      if (err) {throw err}
      res.send('Employee added...')
  })
})

//select employees
app.get('/api/employees', (req, res) => {
  let sql = 'SELECT * FROM employees';
  let query = db.query(sql, (err, results) => {
      if (err) {throw err}
      console.log(results)
      res.send('Employees fetched...')
  })
})

// //select employees by department  
// app.get('/api/employees/:department', (req, res) => {
//   let sql= `SELECT * FROM employees WHERE department = '${req.params.department}'`;
//   let query = db.query(sql, (err, results) => {
//     if (err) {throw err}
//     console.log(results)
//     res.send('Employees in department fetched...')
//   })
// })

//select employees by manager
app.get('/api/employees/:manager', (req, res) => {
  let sql= `SELECT * FROM employees WHERE manager = '${req.params.manager}'`;
  let query = db.query(sql, (err, results) => {
    if (err) {throw err}
    console.log(results)
    res.send('Employees by selected manager fetched...')
  })
})

//update employee
app.put('/api/employee/:id', (req, res) => {
  let newName = 'Updated Name';
  let sql = `UPDATE employees SET employee_name = '${newName}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, err => {
      if (err) {throw err}
      res.send('Employee updated...')
  })
})

//delete employee
app.delete('/api/employee/:id', (req, res) => {
  let sql = `DELETE FROM employees WHERE id = ${req.params.id}`;
  let query = db.query(sql, err => {
      if (err) {throw err}
      res.send('Employee deleted...')
  })
})

app.use((req, res) => {
  res.status(404).end();
});

app.listen('3001', () => {
  console.log('Server started on port 3001')
})