import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

// express-session
//   for let system can use cookies
// "passport": "^0.7.0",
//     "passport-local": "^1.0.0",
//         for different authentication strategies
//            passport-local: a strategy for passport that uses a username and password for authentication





const app = express();
const port = 3000;
const saltRounds = 10;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// cookie setup: 1st step
app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    // one day
    maxAge: 1000 * 60 * 60 * 24,
  }
}))

// cookie setup: 2nd step
app.use(passport.initialize());
app.use(passport.session());


const password = process.env.PASSWORD;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Auth01",
  password: password,
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
})

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];

          // from password package, we're using passport-local-strategy
          req.login(user, (err) => {
            if (err) {
              console.error(err);
            }
            res.redirect("/secrets");
          })
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {

  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

passport.use(new Strategy(async function verify(username, password, cb) {

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err)
        } else {
          if (result) {
            return cb(null, user)
          } else {
            return cb("Wrong password", false)
          }
        }
      });
    } else {
      return cb("No user found", false)
    }
  } catch (err) {
    return cb(err)
  }


}))


passport.serializeUser(function (user, cb) {
  cb(null, user);
})

passport.deserializeUser(function (user, cb) {
  cb(null, user);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
