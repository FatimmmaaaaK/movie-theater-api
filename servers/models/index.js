const { Show } = require('./Show')
const { User } = require('./User')

Show.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Show, {foreignKey: 'userId'})

module.exports = {
    Show,
    User
};
