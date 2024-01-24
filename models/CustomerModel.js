module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        customer_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail:{
                    msg:"Please enter a valid email!"
                }
            }
       
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false 
        }
    }, {
        timestamps:false
    });

    // Customer.associate = (models)=>{
    // Customer.hasMany(models.Order, {
    //     foreignKey:{
    //         name:"c_id",
    //         type:DataTypes.INTERGER,
    //         allowNull:false
    //     }
    // })
    // }
    return Customer
}

