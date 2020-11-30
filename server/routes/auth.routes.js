const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/default.json')
const pool = require('../db')

//api/auth/signup
router.post(
    '/signup',
    [
        check('login', 'incorrect login'),
        check('password', 'minimum lenght of password is 6 letters').isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        try {
            console.log('Body', req.body)

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data due registration',
                })
            }

            const { login, password, name, address } = req.body

            const candidate = await pool.query(
                'SELECT * FROM users WHERE user_login = $1',
                [login]
            )

            if (candidate.rows.length) {
                return res.status(400).json({ message: 'already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            await pool.query(
                'INSERT INTO users (user_login, user_pass, user_name, user_address) VALUES($1,$2,$3,$4)',
                [login, hashedPassword, name, address]
            )

            res.status(201).json({ message: 'user created' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'smthg went wrong' })
        }
    }
)

//api/auth/signin
router.post(
    '/signin',
    [
        check('login', 'Enter login'),
        check('password', 'Enter password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data due login',
                })
            }

            const { login, password } = req.body

            const user = await pool.query(
                'SELECT * FROM users WHERE user_login = $1',
                [login]
            )

            if (!user.rows) {
                return res.status(400).json({ message: 'User not found' })
            }

            const isMatch = bcrypt.compareSync(password, user.rows[0].user_pass)

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' })
            }

            const token = jwt.sign({ userId: user.user_id }, jwtSecret, {
                expiresIn: '3s',
            })

            res.json({
                token,
                id: user.rows[0].user_id,
                name: user.rows[0].user_name,
                address: user.rows[0].user_address,
            })
        } catch (error) {
            res.status(500).json({ message: 'smthg went wrong' })
            console.log(error)
        }
    }
)

router.put('/forgot', async (req, res) => {
    try {
        const { id, password } = req.body

        const hashPassword = await bcrypt.hash(password, 12)

        await pool.query('UPDATE users SET user_pass=$1 WHERE user_id=$2', [
            hashPassword,
            id,
        ])

        res.status(201).json({ message: 'Password edited' })
    } catch (error) {
        res.status(500).json({ message: 'Edit error' })
    }
})

//get api/auth/

router.post('/', async (req, res) => {
    try {
        const { login } = req.body
        console.log(req.body)
        const allData = await pool.query(
            'SELECT * FROM users WHERE user_login=$1',
            [login]
        )
        res.json({
            login: allData.rows[0].user_login,
            id: allData.rows[0].user_id,
        })
    } catch (e) {
        res.status(500).json({ message: 'Getting users error' })
    }
})

router.put('/:login', async (req, res) => {
    try {
        const { login } = req.params
        const { lastPassword, newPassword } = req.body

        const user = await pool.query(
            'SELECT * FROM users WHERE user_login = $1',
            [login]
        )

        const isMatch = bcrypt.compareSync(lastPassword, user.rows[0].password)
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Incorrect current password' })
        }

        const hashPassword = await bcrypt.hash(newPassword, 12)

        await pool.query(
            'UPDATE users SET user_password = $1 WHERE user_login = $2',
            [hashPassword, login]
        )

        res.status(201).json({ message: 'User creadted' })
    } catch (e) {
        res.status(500).json({ message: 'Signup error' })
    }
})

router.delete('/:login', async (req, res) => {
    try {
        const { login } = req.params
        await pool.query('DELETE FROM users WHERE login = $1', [login])
        res.json('User deleted!')
    } catch (err) {
        res.status(404).json('Deleting error')
    }
})

module.exports = router
