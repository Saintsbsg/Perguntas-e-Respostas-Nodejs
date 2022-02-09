const Sequelize = require("sequelize");
const connection = require("../database/database");

Answer = connection.define("answers",{
    body:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Answer.sync({force: false}).then(() =>{});

module.exports = Answer;