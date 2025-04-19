const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [rows] = await db.query(
          "SELECT * FROM users WHERE oauth_id = ? AND oauth_provider = 'google'",
          [profile.id]
        );

        let user;
        if (rows.length === 0) {
          const [result] = await db.query(
            `INSERT INTO users (oauth_provider, oauth_id, email, name, profile_picture)
             VALUES (?, ?, ?, ?, ?)`,
            [
              "google",
              profile.id,
              profile.emails[0].value,
              profile.displayName,
              profile.photos[0].value,
            ]
          );
          user = {
            id: result.insertId,
            email: profile.emails[0].value,
            name: profile.displayName,
            profile_picture: profile.photos[0].value,
          };
        } else {
          user = rows[0];
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Save user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve full user from DB
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});
