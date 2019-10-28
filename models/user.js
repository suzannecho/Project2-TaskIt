module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        }, 
        phone: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.TEXT
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        email : {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password : {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        facebookId: {
            type: Sequelize.STRING
        },
        facebookPicture: {
            type: Sequelize.STRING
        },
    },
        {
            classMethods: {
                associate: function(models) {
                    User.belongsToMany(models.tasks,{through: models.user_task});
                }  
            }
        });
 
    return User;
}