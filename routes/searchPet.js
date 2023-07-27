const express=reqiure('express');
const router=express.Router();
router.get('/',(req,res)=>{
res.render('searchPage');
})

module.exports=router;