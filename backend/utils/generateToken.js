import jwt from 'jsonwebtoken';

const generateToken = (res,userId) => {
    //creating a token
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    //savign the token in a cookie
    //jwt - name , token - data that goes in cookie, {} - options
    res.cookie('jwt',token,{ 
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'developement',
        sameSite:'strict', //prevent csrf attacks
        maxAge: 30*24*60*60*1000 //30 days in seconds
    })
}

export default generateToken;  