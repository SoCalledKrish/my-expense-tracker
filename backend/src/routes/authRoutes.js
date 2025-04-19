// const express = require("express");
// const passport = require("passport");

// const router = express.Router();

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get('/google/callback',
//     passport.authenticate('google', {
//       failureRedirect: '/auth/failed',
//       successRedirect: 'http://localhost:5173/' // 👈 Redirect to frontend Home page after login
//     })
//   );

// router.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.redirect("/");
//   });
// });

// router.get("/user", (req, res) => {
//   res.send(req.user || null);
// });

// module.exports =  router;



const express = require("express");
const passport = require("passport");
const router = express.Router();

// Start OAuth
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// OAuth Callback
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/", // Your frontend route
    failureRedirect: "http://localhost:5173/login"
  })
);

// Get current user
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "Lax", // Use "None" + secure: true for HTTPS
        secure: false,
      });
      res.status(200).json({ message: "Logged out successfully" });
    });
});

module.exports = router;
