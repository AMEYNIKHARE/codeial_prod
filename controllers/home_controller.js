// renders home page
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('UserID' , 'ANIKHARE');
    // res.cookie('Name' , 'Amey Nikhare');
    return res.render('home');
}

module.exports.default = function(req, res){
    return res.render('default');
}
