const { Router } = require('express')
const router = Router()
const pool = require('../db')

router.post('/addOrder', async (req, res, next) => {
    try {
        const { id, prodId, date, prodTitle, img, name, address } = req.body
        console.log(req.body)
        await pool.query(
            'INSERT INTO orders_to_moder (user_id,product_id,date, product_title, img, name,address) VALUES($1,$2,$3,$4,$5,$6,$7)',
            [id, prodId, date, prodTitle, img, name, address]
        )

        res.json('added')
    } catch (error) {
        next(error)
    }
})

router.post('/acceptedOrdersList', async (req, res) => {
    try {
        const { id } = req.body

        const list = await pool.query(
            'SELECT * FROM accepted_orders WHERE user_id = $1',
            [id]
        )

        res.json(list.rows)
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/cancelledOrdersList', async (req, res) => {
    try {
        const { id } = req.body

        const list = await pool.query(
            'SELECT * FROM cancelled_orders WHERE user_id = $1',
            [id]
        )

        res.json(list.rows)
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.delete('/deleteOrderHistory', async (req, res) => {
    try {
        const { id } = req.body
        await pool.query('DELETE FROM accepted_orders WHERE user_id = $1', [id])
        await pool.query('DELETE FROM cancelled_orders WHERE user_id = $1', [
            id,
        ])
        res.json('deleted')
    } catch (error) {}
})

router.post('/orders', async (req, res) => {
    try {
        const list = await pool.query('SELECT * FROM orders_to_moder')
        res.json(list.rows)
    } catch (error) {}
})

router.post('/approveOrder', async (req, res) => {
    try {
        const { user_id, product_id, date, order_id } = req.body
        console.log(req.body)
        const flag = await pool.query(
            'INSERT INTO accepted_orders (user_id,product_id,date,order_id) VALUES($1,$2,$3,$4)',
            [user_id, product_id, date, order_id]
        )
        await pool.query('DELETE FROM orders_to_moder WHERE order_id=$1', [
            order_id,
        ])
        if (flag.rowCount > 0) {
            res.json(true)
        } else {
            res.json(false)
        }
    } catch (error) {}
})

router.delete('/refuseOrder', async (req, res) => {
    try {
        const { user_id, product_id, date, order_id } = req.body

        const flag = await pool.query(
            'INSERT INTO cancelled_orders (user_id,product_id,date,order_id) VALUES($1,$2,$3,$4)',
            [user_id, product_id, date, order_id]
        )
        await pool.query('DELETE FROM orders_to_moder WHERE order_id=$1', [
            order_id,
        ])
        if (flag.rowCount > 0) {
            res.json(true)
        } else {
            res.json(false)
        }
    } catch (error) {}
})

module.exports = router
