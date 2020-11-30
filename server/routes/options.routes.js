const { Router } = require('express')
const router = Router()
const pool = require('../db')
const bcrypt = require('bcryptjs')

//api/options/editPass
router.put('/editPass', async (req, res) => {
    try {
        const { id, currentPass, newPass } = req.body
        console.log(req.body)

        const user = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [id]
        )

        const isMatch = bcrypt.compareSync(currentPass, user.rows[0].user_pass)
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Incorrect current password' })
        }

        const hashPassword = await bcrypt.hash(newPass, 12)

        await pool.query('UPDATE users SET user_pass = $1 WHERE user_id = $2', [
            hashPassword,
            id,
        ])

        res.status(201).json({ message: 'Password edited' })
    } catch (e) {
        res.status(500).json({ message: 'Edit error' })
    }
})

router.put('/editName', async (req, res) => {
    try {
        const { id, name } = req.body

        await pool.query('UPDATE users SET user_name = $1 WHERE user_id = $2', [
            name,
            id,
        ])

        const user = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [id]
        )

        res.status(201).json({
            message: 'Name edited',
            name: user.rows[0].user_name,
        })
    } catch (error) {
        res.status(500).json({ message: 'Edit error' })
    }
})

router.put('/editAddress', async (req, res) => {
    try {
        const { id, address } = req.body
        console.log(req.body)

        await pool.query(
            'UPDATE users SET user_address = $1 WHERE user_id = $2',
            [address, id]
        )

        const user = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [id]
        )

        res.status(201).json({
            message: 'Address edited',
            address: user.rows[0].user_address,
        })
    } catch (error) {
        res.status(500).json({ message: 'Edit error' })
    }
})

module.exports = router
