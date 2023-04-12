module.exports.home = function(req, res){
    return res.render('home');
}

module.exports.completehome = function(req, res){
    // return res.send('<h1>Home conroller function complete home</h1>');
    return res.render('home');
}
