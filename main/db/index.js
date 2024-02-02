const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ariel8290",
  database: "employees_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a-based connection from the pool
const connection = pool.promise();

// const connection = require("./connection");

class DB {
  //  connect class 
  constructor(connection) {
    this.connection = connection;
  }
  // find all employees
  findAllEmployees() {
    return this.connection.query(
      "SELECT * from employee"
    );
  }
  // find all managers
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }
  // create new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  // remove employee with id
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }
  // update employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
  // update employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }
  // find all roles with the departments
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // create new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }
  // remove role with id
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }
  // list all departments
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name FROM department;"
    );
  }
  // list departments with employees, their roles, and utilized department budget
  viewDepartmentBudgets() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }
  // create new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }
  // remove department with id
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }
  // find employees by department with role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }
  // find employees by manager, with departments and roles titles
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}
module.exports = new DB(connection);








