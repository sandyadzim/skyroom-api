const express =require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()

const port = 7000

const AuthController = require('./controllers/auth')
const RoomController = require('./controllers/room')
const CustomerController = require('./controllers/customer')
const OrderController = require('./controllers/order')
const UserController = require('./controllers/user')

const { authenticated } = require('./middleware')

app.use(bodyParser.json())

app.group('/api/v2', (router)=>{
    
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)
    router.get('/users', UserController.index)
    router.get('/user/:user_id', UserController.showUser)
    router.put('/user/:user_id', UserController.updateUser)

    // Room
    router.get('/rooms', RoomController.index)
    router.post('/room', authenticated, RoomController.createRoom)
    router.put('/room/:room_id', authenticated, RoomController.updateRoom)
    router.delete('/room/:id', authenticated, RoomController.deleteRoom)

    //Customer
    router.get('/customers', CustomerController.index)
    router.post('/customer', authenticated, CustomerController.createCustomer)
    router.put('/customer/:customer_id', authenticated, CustomerController.updateCustomer)
    router.delete('/customer/id', authenticated, CustomerController.deleteCustomer)

    //Order
    router.get('/checkins', authenticated, OrderController.showOrder)
    router.post('/checkin', authenticated, OrderController.createCheckin)
    router.put('/checkin/:checkin_id', authenticated, OrderController.updateCheckin)
    router.delete('/checkin/:order_id', authenticated, OrderController.deleteOrder)

})

app.listen(port, () => console.log('Listening o Port ${7000}'))