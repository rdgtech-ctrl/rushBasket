import express from 'express'
import authMiddleware from '../middleware/auth'
import { confirmPayment,createOrder,deleteOrder,getOrderById,getOrders,updateOrder } from '../controllers/orderController'

const orderrouter = express.Router()

// PROTECTED ROUTES
orderrouter.post('/',authMiddleware,createOrder)
orderrouter.get('/confirm',authMiddleware,confirmPayment)

// PUBLIC ROUTES
orderrouter.get('/',getOrders)
orderrouter.get('/:id',getOrderById)
orderrouter.put('/:id',updateOrder)
orderrouter.delete('/:id',deleteOrder)

export default orderrouter