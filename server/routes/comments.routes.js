const {Router} = require('express')
const router = Router()
const pool = require('../db') 

router.post('/commentsList', async(req,res)=>{

    try {
        const {prodId} = req.body
        
        const list = await pool.query("SELECT * FROM comments WHERE product_id = $1",[prodId])

        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})

router.post('/counter', async(req,res)=>{

    try {
        const {id} = req.body
        
        const list = await pool.query("SELECT COUNT(*) FROM comments WHERE product_id = $1",[id])
        console.log(list.rows[0].count)
        res.json(list.rows[0].count)
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})

router.post('/addComment', async(req,res)=>{

    try {
        const {name,title,rating,comment,pluses,minuses,date,id} = req.body

        console.log(req.body)

        await pool.query("INSERT INTO comments_to_moderate (comment, rating, date,product_id, user_name, pluses, minuses, comment_title) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
        [comment,rating,date,id,name,pluses,minuses,title])

        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})


module.exports = router