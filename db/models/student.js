'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true}
    }
});

Student.beforeSave((student) => {
    student.firstName = capitalize(student.firstName),
    student.lastName = capitalize(student.lastName);
})

const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  };

module.exports = Student;
