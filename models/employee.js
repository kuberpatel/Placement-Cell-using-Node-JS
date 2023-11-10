// Require the Mongoose module
const mongoose = require('mongoose');

// Define a schema for an employee document
const employeeSchema = new mongoose.Schema({
  // First name of the employee
  firstName: {
    type: String,
    required: true,
  },
  // Last name of the employee
  lastName: {
    type: String,
    required: true,
  },
  // Email address of the employee
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password of the employee
  password: {
    type: String,
    required: true,
  },
}, {
  // Add timestamps to the document
  timestamps: true,
});

// Create a Mongoose model for the employee schema
const Employee = mongoose.model('Employee', employeeSchema);

// Export the Employee model so that it can be used in other modules
module.exports = Employee;
