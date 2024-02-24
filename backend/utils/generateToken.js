import jwt from 'jsonwebtoken'

const generateWebTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    })

    res.cookie('cookie', token, {
        maxAge: 15*24*60*60*1000 ,
        httpOnly: true,
        secure: true
    })
}

export default generateWebTokenAndSetCookie