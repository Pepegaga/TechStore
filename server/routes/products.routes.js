const { Router } = require('express')
const router = Router()
const pool = require('../db')

router.post('/productsList', async (req, res) => {
    try {
        const { category } = req.body

        const list = await pool.query(
            'SELECT * FROM products WHERE category = $1',
            [category]
        )

        res.json(list.rows)
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/renderAll', async (req, res) => {
    try {
        const list = await pool.query('SELECT * FROM products')
        console.log(list)
        res.json(list.rows)
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/rating', async (req, res) => {
    try {
        const { id } = req.body
        const rating = await pool.query(
            'SELECT AVG(rating) FROM comments WHERE product_id=$1',
            [id]
        )
        res.json(rating.rows[0])
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/addRating', async (req, res) => {
    try {
        const { id, rating } = req.body
        await pool.query(
            'INSERT INTO rating (product_id,rating) VALUES($1,$2)',
            [id, rating]
        )
        res.json('added')
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/cartList', async (req, res) => {
    try {
        const { id } = req.body

        const list = await pool.query(
            'SELECT * FROM products WHERE product_id = $1',
            [id]
        )

        res.json({ item: list.rows[0] })
    } catch (error) {
        res.json({ message: 'error' })
    }
})

router.post('/title', async (req, res) => {
    try {
        const { id } = req.body
        console.log(id)
        const title = await pool.query(
            'SELECT product_title FROM products WHERE product_id=$1',
            [id]
        )
        res.json(title.rows[0].product_title)
    } catch (error) {}
})

router.post('/addItem', async (req, res) => {
    try {
        const {
            name,
            title,
            description,
            brand,
            os,
            size,
            resolution,
            ram,
            memory,
            camera,
            sim,
            cost,
            category,
            image,
        } = req.body

        await pool.query(
            'INSERT INTO products (product_name,product_title,product_description,product_brand,product_os,product_size,product_resolution,product_ram,product_memory,product_camera,product_sim,product_cost,category,product_thumb) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
            [
                name,
                title,
                description,
                brand,
                os,
                size,
                resolution,
                ram,
                memory,
                camera,
                sim,
                cost,
                category,
                image,
            ]
        )
        res.json(true)
    } catch (error) {
        res.json(false)
    }
})

router.put('/editItem', async (req, res) => {
    try {
        const {
            name,
            title,
            description,
            brand,
            os,
            size,
            resolution,
            ram,
            memory,
            camera,
            sim,
            cost,
            category,
            image,
            id,
        } = req.body
        console.log(req.body)
        await pool.query(
            'UPDATE products SET product_name=$1, product_title=$2, product_description=$3, product_brand=$4, product_os=$5, product_size=$6, product_resolution=$7, product_ram=$8, product_memory=$9, product_camera=$10, product_sim=$11, product_cost=$12, category=$13, product_thumb=$14 WHERE product_id=$15',
            [
                name,
                title,
                description,
                brand,
                os,
                size,
                resolution,
                ram,
                memory,
                camera,
                sim,
                cost,
                category,
                image,
                id,
            ]
        )
        res.json(true)
    } catch (error) {
        res.json(false)
    }
})

router.delete('/deleteItem', async (req, res) => {
    try {
        const { id } = req.body
        await pool.query('DELETE FROM products WHERE product_id=$1', [id])
        res.json(true)
    } catch (error) {}
})

module.exports = router
