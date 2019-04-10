module.exports = (role) => {
return function(req, res, next){
    if(req.decodedJWT.roles && req.decodedJwt.roles.includes(role))
    {
        next()
    }
else{
    res.status(403).json({you: "you have no power here!"})
}
}
}