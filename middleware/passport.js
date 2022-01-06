const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../settings/db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-key'
}

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (payload, done) => {
        try {
            db.query("SELECT * FROM `Users` WHERE `id` = '" + payload.userId + "'", (err, rows, fields) => {
                if (err) {
                    console.log(err)
                    return
                }
                const user = rows
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }))
}
