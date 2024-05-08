const router = require('express').Router()
const {login, signup, placeOrder, addAddress, getAddress, getUserOrders, oauthSuccess}  = require('../controllers/UserController')
require('../Strategies/JwtStragegy')
const authenticateJWT = require('../middleware/authenticateJwt')
// const { createToken } = require('../middleware/JWT')
const passport = require('passport')
// require('../Strategies/GoogleStrategy')


router.post("/user-login", login)
router.post("/signup", signup)


router.post('/add-address',authenticateJWT, addAddress)
router.get('/get-address',authenticateJWT,  getAddress)
router.post('/place-order',authenticateJWT,  placeOrder)
router.get('/my-orders',authenticateJWT,  getUserOrders)


module.exports = router






   
        // googlerouter.get('/auth/googleauth', passport.authenticate('google', 
        // { scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }));

     
        // googlerouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
        // async (req, res) => {
        // try {
        // const { email } = req.user;
        // let user = await User.findOne({ email });

        // if (!user) {
        // return res.status(404).json({ error: 'User not found' });
        // }
        // const data = {
        // user: {
        // id: user.id,
        // verified: user.verified,
        // email: user.email,
        // },

        // };
        // const token = jwt.sign(data, jwtSecret);

        // res.cookie('x-auth-cookie', token);

        // res.redirect(${clientUrl}/dashboard);
        // } catch (error) {

        // console.error('Error in Google OAuth callback:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
        // }
        // }
        // );



//  const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.jwtSecret;

// const authMiddleware = (req, res, next) => {
// const authHeader = req.header('Authorization');
// if (!authHeader) {
// return res.status(401).send({ error: "Access denied. No token provided." });
// }
// const token = authHeader.split(' ')[1];
// if (!token) {

// return res.status(401).send({ error: "Access denied. No token provided." });
// }
// try {
// const decoded = jwt.verify(token, jwtSecret);

// req.user = decoded.user;
// next();
// } catch (error) {
// res.status(401).send({ error: "Invalid Auth Token" });
// }
// };
// module.exports = authMiddleware;



            // And this is the frontend api handling- 

            // useEffect(() => {
            // const fetchUserDetails = async () => {
            // try {
            // const authToken = Cookies.get('x-auth-cookie');
            // localStorage.setItem('token', authToken);

            // if (!authToken) {
            // console.log('No Auth Token found');
            // const userData = JSON.parse(localStorage.getItem('user'));

            // if (userData) {
            // setUser(userData);
            // }
            // return;
            // }
            // const response = await axios.get(${SERVER_URL}/api/auth/userinfo, {
            // headers: {
            // Authorization: Bearer ${authToken},
            // },
            // });
            // const userData = http://response.data;
            // setUser(userData);
            // } catch (error) {
            // console.error('Fetch user details error:', error.message);
            // }
            // };

            // fetchUserDetails();
            // }, []);