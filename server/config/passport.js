const { Member } = require('../models/model');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

const PUB_KEY = "super-secret-key"; // Ideally, use environment variables for sensitive data

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['HS256'] // Use HS256 for a symmetric key
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                console.log("🟢🤖 JWT Payload:", jwt_payload);

                // We will assign the `sub` property on the JWT to the database ID of the user
                const user = await Member.findOne({ _id: jwt_payload._id });
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
