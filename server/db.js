import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
    process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    }
);

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 3,
            max: 20
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stream_key: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'users',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
        }

    },
    hooks: {
        afterCreate: async (user, options) => {
            await user.reload();
        }
    }
});

//User.prototype.toJSON = function () {
//    let values = Object.assign({}, this.get());
//    delete values.password;
//    return values;
//}


export { sequelize, User };