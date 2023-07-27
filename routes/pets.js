const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
res.send('pets page')
})

module.exports=router;