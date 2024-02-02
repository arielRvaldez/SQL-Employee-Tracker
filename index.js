const express = require('express');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: 'Ariel8290',
    database: 'employees_db'
})

db.connect(err => {
    if (err) {throw err}
    console.log('Connected to the Employee database.')
})

const app = express();

app.get('/create-employee', (req, res) => {
    let sql = 'CREATE DATABASE employees_db';
    db.query(sql, err => {
        if (err) {throw err}
        res.send('Database created...')
    })
})

app.get('/create-table', (req, res) => {
    let sql = 'CREATE TABLE employees (id INT AUTO_INCREMENT, employee_name VARCHAR(50), department VARCHAR (255), PRIMARY KEY (id))';
    db.query(sql, err => {
        if (err) {throw err}
        res.send('Employees table created...')
    })
})

app.get('/employee1', (req, res) => {
    let post = {employee_name: 'John Doe', department: 'Marketing'}
    let sql = 'INSERT INTO employees SET ?';
    let query = db.query(sql, post, err => {
        if (err) {throw err}
        res.send('Employee added...')
    })
})

app.get('/get-employees', (req, res) => {
    let sql = 'SELECT * FROM employees';
    let query = db.query(sql, (err, results) => {
        if (err) {throw err}
        console.log(results)
        res.send('Employees fetched...')
    })
})

app.get('update-employee/:id', (req, res) => {
    let newName = 'Updated Name';
    let sql = `UPDATE employees SET employee_name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if (err) {throw err}
        res.send('Employee updated...')
    })
})

app.get('/delete-employee/:id', (req, res) => {
    let sql = `DELETE FROM employees WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if (err) {throw err}
        res.send('Employee deleted...')
    })
})

app.listen('3001', () => {
    console.log('Server started on port 3001')
})
