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





Question.belongsTo(User, {foreignkey: 'userId'});
Answer.belongsTo(User,{foreignkey: 'userId'})
Answer.belongsTo(Question, {foreignkey: 'questionId'});
Question.hasMany(Answer)




User.sync({force: false}).then(()=>{});
Question.sync({force: false}).then(() =>{});
Answer.sync({force: false}).then(() =>{});



module.exports = {
    User,
    Answer,
    Question
}
