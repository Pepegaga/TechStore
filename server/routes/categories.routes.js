const {Router} = require('express')
const router = Router()
const pool = require('../db') 

router.post('/list',async(req,res)=>{
    try {
        console.log('connected')
        const list = await pool.query("SELECT * FROM categories")
        console.log(list)
        res.json(list.rows)
    } catch (error) {
        
    }
})

module.exports = router