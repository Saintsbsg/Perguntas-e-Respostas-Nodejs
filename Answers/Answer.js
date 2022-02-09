const Sequelize = require("sequelize");
const connection = require("../database/database");

const Answer = connection.define("answers",{
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

Answer.sync({force: false}).then(() =>{});

module.exports = Answer;