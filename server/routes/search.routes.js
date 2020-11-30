const {Router} = require('express')
const router = Router()
const pool = require('../db') 

router.post('/search', async(req,res)=>{

    try {
        const {search} = req.body
        const list = await pool.query(`SELECT * FROM products WHERE product_title ~~ '%${search}%' OR product_name ~~ '%${search}%' OR product_brand ~~ '%${search}%'`)
        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})

router.post('/addToHistory', async(req,res)=>{

    try {
        const {search, id} = req.body
        console.log(search)
        await pool.query('INSERT INTO search_history (search_text,user_id) VALUES($1,$2)',[search,id])
        res.json("added")
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})

router.post('/historyList', async(req,res)=>{

    try {
        const {id} = req.body
        const list = await pool.query("SELECT * FROM search_history WHERE user_id=$1", [id])
        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})

module.exports = router