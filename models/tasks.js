module.exports = function(sequelize, Sequelize) {
    var Tasks = sequelize.define("tasks", {
        task_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        task_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        location: {
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
        }
    },{
        classMethods: {
            associate: function(models) {
                Tasks.belongsToMany(models.user,{through: models.user_task});
            }
        }  
    });
    return Tasks;
}