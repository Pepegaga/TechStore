const { Router } = require('express')
const router = Router()
const pool = require('../db')

router.post('/users', async (req, res) => {
    try {
        const list = await pool.query('SELECT * FROM users')
        res.json(list.rows)
    } catch (error) {}
})

router.put('/changeRole', async (req, res) => {
    try {
        const { user_isadmin, user_id } = req.body
        const changedRole = !user_isadmin
        await pool.query('UPDATE users SET user_isadmin=$1 WHERE user_id=$2', [
            changedRole,
            user_id,
        ])
        res.json(true)
    } catch (error) {
        console.log(error)
        res.json(false)
    }
})

module.exports = router
