const Sequelize = require("sequelize");
const connection = require("../database/database");

User = connection.define("users", {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },

    admin:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    
});

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

    },

    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'questions',
            key: 'id'
        }

    }

    
});

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
        },

        
    },
});




Answer.belongsTo(User,{foreignkey: 'userId'})
Question.belongsTo(User, {foreignkey: 'userId'});




User.sync({force: false}).then(()=>{});
Answer.sync({force: false}).then(() =>{});
Question.sync({force: false}).then(() =>{});

module.exports = {
    User,
    Answer,
    Question
}
