const Item = require('../models/ItemsModel')
const User = require('../models/UserModel')
const Category = require('../models/CategoryModel')
const { createToken } = require('../middleware/JWT')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')
const uploadFunction = require("../supabaseConfig")

module.exports = {

    // LOGIN ADMIN 
    login: async (req, res) => {
        const { email, password } = req.body
        // check if ADMIN with info provided exists 
        Admin.findOne({ where: { email: email } }).then(admin => {
            if (admin) {
            //    if the ADMIN exists compare the provided password with the hashed password in the database 
                bcrypt.compare(password, admin.password).then(match => {
                    if (match) {
                        // if there is a match asign  token to that ADMIN 
                        const accessToken = createToken(admin)
                       
                        res.status(200).json({ message: "Login successful" })
                    } else {
                        res.status(400).json({ message: "Incorrect password" })
                    }
                }).catch(err => {
                    res.send(err)
                })

            } else {
                res.status(404).json({ message: "Admin with email doesn't exist" })
            }
        }).catch(err => {
            res.status(404).json({ error: err })
        })
    },

    authAdmin : (req,res)=>{
        const info = req.data
        res.json({info:info})
    },


    addCategory: async(req, res) => {
        const { categoryName } = req.body
        try {
         const newCategory = await Category.create({ categoryName })
         res.json(newCategory)
        } catch (err) {
            res.send(err)
        }      
    },

    getCategories: async(req, res) => {
        try {
          const categories =  Category.find() 
           res.status(200).json(categories)
        } catch (err) {
           res.status(404).json({msg:err}) 
        }
    },


addItems: async(req,res)=>{
const {itemName, price, category} = req.body
if (!itemName || !price || !category) {
   return res.json("All fields must be provided")
}
try {
const data = await uploadFunction(req.file.originalname, req.file.buffer, req.file.mimetype) 
const imageURL = `${process.env.supabaseUrl}/storage/v1/object/public/${data.fullPath}`

const newItem = await Item.create({
    itemName,
    price, 
    img:imageURL,
    category
    })  
res.status(200).json({msg:"Item added successfully"})
} catch (error) {
   
   res.json(error) 
}


},

// GET All ITEMs
getItems: async(req,res)=>{
  try {
    const items = await  Item.find()
    .populate('category')
    .exec()
    res.json(items)
  } catch (err) {
     res.json({msg:err})
  }
              
},

// GET SINGLE ITEM 
getItem: async(req,res)=>{
    const {id} = req.params
    try {
        const item = await  Item.findOne({_id:id})
        .populate('category')
        .exec()
        res.json(item)
      } catch (err) {
         res.json(err)
      }
},

deleteItem: async(req,res)=>{
    const {id} = req.params
    try {
      Item.findByIdAndDelete({_id:id})
      res.status(200).json({msg:"Item deleted successfully!"})
    } catch (err) {
        res.json({msg:"An error occured"})
    }
},

    // GET ALL USERS 
    getUsers: async(req, res) => {
        try {
         const users =  UserModel.find() 
           res.json(users)
        } catch (error) {
            res.status(404).json({msg:err})
        }
    },



}
