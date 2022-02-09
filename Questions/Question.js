const Sequelize = require("sequelize");
const connection = require("../database/database");


const Question = connection.define("questions", {
    body:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    }
});


Question.sync({force: false}).then(() =>{});

module.exports = Question;