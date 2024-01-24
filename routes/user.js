const router = require('express').Router()
// const { Teachers, post } = require('../models')
const controller  = require('../controllers/UserController')
const {validateToken} = require('../middleware/JWT')

router.get("/login", controller.login)
router.post("/register", controller.register)
router.get("/users", validateToken, controller.getUsers)
// router.get("/test", controller.test)


// router.post('/insert', (req, res) => {
//     const { name, address } = req.body
//     try {
//         Teachers.create({ t_name: name, t_address: address })
//             .then((data) => {
//                 res.send(data)
//             })
//     } catch (err) {
//         res.send(err)
//     }
// })

// router.get('/all', (req, res) => {
//     Teachers.findAll({ 
        
//         include: [{ model: post, required: true}],
//         order: [['t_id', 'DESC']],
//         limit: 2
//     }).then(teachers => {
//         res.json(teachers)
//     }).catch(err => {
//         res.status(404).json({error:err})
//     })
// })


// router.get("/allp", async(req,res)=>{
//     const sqlQuery = `SELECT * FROM posts
//     INNER JOIN teachers ON post.teacher_id = teachers.t_id
//     ORDER BY DESC
//     LIMIT 2`
// try {
//    const teachers = await db.query(sqlQuery)
//     res.json(teachers)
// } catch (err) {
//     res.status(404).json({error:err})
   
// }
// })


// router.get("/teacher/:id", (req, res) => {
//     const id = req.params.id
//     Teachers.findOne({ where: { id: id } }).then(teacher => {
//         res.send(teacher)
//     }).catch(err => {
//         res.send(err)
//     })
// })


// router.delete("/delete/:id", (req, res) => {
//     const id = req.params.id
//     Teachers.destroy({ where: { t_id: id } }).then((data) => {
//         res.send('deleted')
//     }).catch(err => {
//         res.send(err)
//     })
// })


// router.put("/update/:id", (req, res) => {
//     const teacher_id = req.params.id
//     const { name, address } = req.body
//     Teachers.update({ t_name: name, t_address: address }, { where: { t_id: teacher_id } }).then(() => {
//         res.send('Teacher Updated')
//     }).catch(err => {
//         res.send(err)
//     })
// })


module.exports = router