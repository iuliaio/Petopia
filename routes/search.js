const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
res.send('search page')
})

module.exports=router;