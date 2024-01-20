module.exports = (sequelize, DataTypes) =>{
    const Order = sequelize.define('Order',{
        order_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false,
        }

    });

    return Order
}