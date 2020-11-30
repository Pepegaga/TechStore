const {Router} = require('express')
const router = Router()
const pool = require('../db') 

router.post('/addOrder', async(req,res,next)=>{

    try {
        const {id, prodId} = req.body
        console.log(req.body)
        await pool.query("INSERT INTO orders_to_moder (user_id,product_id) VALUES($1,$2)",[id,prodId])

        res.json('added')
        
    } catch (error) {
        next(error)
    }
})

router.post('/acceptedOrdersList', async(req,res)=>{

    try {
        const {id} = req.body
        
        const list = await pool.query("SELECT * FROM accepted_orders WHERE user_id = $1",[id])
        
        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

})

router.post('/cancelledOrdersList', async(req,res)=>{

    try {
        const {id} = req.body
        
        const list = await pool.query("SELECT * FROM cancelled_orders WHERE user_id = $1",[id])
        
        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

})

router.delete('/deleteOrderHistory',async(req,res)=>{
    try {
        
        const {id} = req.body
            await pool.query("DELETE FROM accepted_orders WHERE user_id = $1",[id])
            await pool.query("DELETE FROM cancelled_orders WHERE user_id = $1",[id])
        res.json('deleted')

    } catch (error) {
        
    }
})


module.exports = router