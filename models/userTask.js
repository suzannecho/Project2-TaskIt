module.exports = function(sequelize, Sequelize) {
    var UserTask = sequelize.define("user_task", {
        host: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: false
        },
        attending: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        food: {
            type: Sequelize.STRING,
            allowNull: true
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
    },{
        classMethods: {
            associate: function(models) {
                UserTask.belongsTo(models.user);
                UserTask.belongsTo(models.tasks);
            }
        }  
      
    });
    return UserTask;
};

