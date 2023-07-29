const pets=require('../repositories/petsRepository');
class PetsController{
static index(req,res){
    res.send('pets');
}
}
module.exports=PetsController