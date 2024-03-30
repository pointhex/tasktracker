const getTaskModel = (sequelize, { DataTypes }) => {
    const Task = sequelize.define('task', {
      id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });

    Task.findTaskById = async (id) => {
        return await Task.findByPk(id);
    }
  
    return Task;
  };

  // { id: '1', name: 'task1', description: 'description1', done: false },
  
  export default getTaskModel;
