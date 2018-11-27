module.exports = function(sequelize, DataTypes) {
    const todo_table = sequelize.define("todo_table", {
        todoItem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 140]
        }
        },
        todoStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        }
    });
    return todo_table;
    };