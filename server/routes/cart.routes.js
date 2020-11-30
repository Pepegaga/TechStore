const { Router } = require('express')
const router = Router()
const pool = require('../db')

router.post('/cart', async (req, res) => {
    try {
        const { id } = req.body

        const list = await pool.query('SELECT * FROM cart WHERE user_id = $1', [
            id,
        ])

        res.json(list.rows)
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/addToCart', async (req, res) => {
    try {
        const { userId, prodId } = req.body
        console.log(req.body)
        const flag = await pool.query(
            'SELECT * FROM cart WHERE product_id=$1 AND user_id=$2',
            [prodId, userId]
        )
        console.log(flag)
        if (flag.rowCount > 0) {
            res.json({ flag: false })
        } else {
            await pool.query(
                'INSERT INTO cart (user_id, product_id) VALUES($1,$2)',
                [userId, prodId]
            )
            res.json({ flag: true })
        }
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.delete('/deleteFromDB', async (req, res) => {
    try {
        const { prodId, id } = req.body
        await pool.query(
            'DELETE FROM cart WHERE user_id = $1 AND product_id=$2',
            [id, prodId]
        )
        res.json('Данные успешно удалены!')
    } catch (err) {
        console.log(err)
    }
})

router.delete('/deleteCart', async (req, res) => {
    try {
        const { id } = req.body
        await pool.query('DELETE FROM cart WHERE user_id = $1', [id])
        res.json('Данные успешно удалены!')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
