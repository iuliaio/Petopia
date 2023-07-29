const pets = require("../repositories/petsRepository");
class PetsController {
  static index(req, res) {
    res.send("pets");
  }
  static search(req, res) {
    res.send("pets search");
  }
  static filter(req, res) {
    res.send("pets filter");
  }
  static profile(req, res) {
    res.send("pets profile");
  }
  static new(req, res) {
    res.send("pets new");
  }
  static edit(req, res) {
    res.send("pets edit");
  }
  static new_pet(req, res) {
    res.send("pets new post");
  }
  static edit_pet(req,res){
    res.send('pets edit post');
  }
}

module.exports = PetsController;
