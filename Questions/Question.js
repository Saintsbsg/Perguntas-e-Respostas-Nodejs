const Sequelize = require("sequelize");
const connection = require("../database/database");


Question = connection.define("questions", {
    body:{
        type: Sequelize.STRING,
        allowNull: false
    }
});


Question.sync({force: false}).then(() =>{});

module.exports = Question;