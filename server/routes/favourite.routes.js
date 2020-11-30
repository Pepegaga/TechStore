const {Router} = require('express')
const router = Router()
const pool = require('../db') 

router.post('/favourite', async(req,res)=>{

    try {
        const {id} = req.body

        const list = await pool.query("SELECT * FROM favourite WHERE user_id = $1",[id])
        
        res.json(list.rows)
        
    } catch (error) {
        res.json({message: 'error'})
    }

})

router.post('/addToFavourite', async(req,res,next)=>{

    try {
        const {userId, prodId} = req.body

        const flag = await pool.query("SELECT * FROM favourite WHERE product_id=$1 AND user_id=$2",[prodId,userId])

        if(flag.rowCount>0){
            await pool.query('DELETE FROM favourite WHERE user_id = $1 AND product_id=$2', [ userId, prodId ]);
            res.json({flag: flag.rowCount})
        }else{
            await pool.query("INSERT INTO favourite (user_id, product_id) VALUES($1,$2)",[userId,prodId])
            res.json({flag: flag.rowCount})
        }

        next()
        
    } catch (error) {
        next(error)
    }
})

router.delete("/deleteFromDB", async (req, res) => {
    try {
      const { prodId, id } = req.body
      await pool.query('DELETE FROM favourite WHERE user_id = $1 AND product_id=$2', [ id, prodId ]);
      res.json("Данные успешно удалены!");
    } catch (err) {
      console.log(err);
    }
});

router.post('/isFavourite', async(req,res)=>{

    try {
        const {userId, prodId} = req.body
        console.log(req.body)
        const flag = await pool.query("SELECT * FROM favourite WHERE product_id=$1 AND user_id=$2",[prodId,userId])
        console.log(flag.rowCount)
        res.json({flag: flag.rowCount})
        
    } catch (error) {
        res.json({message: 'error'})
    }

    
})

module.exports = router