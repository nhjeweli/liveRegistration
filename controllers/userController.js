// const User = require("../models/User")

// exports.login = function (req, res) {
//   let user = new User(req.body)
//   user
//     .login()
//     .then(function (result) {
//       req.session.user = { favColor: "blue", username: user.data.username }
//       req.session.save(function () {
//         res.redirect("/")
//       })
//     })
//     .catch(function (e) {
//       req.flash("errors", e)
//       req.session.save(function () {
//         res.redirect("/")
//       })
//     })
// }

// // logout
// exports.logout = function (req, res) {
//   req.session.destroy(function () {
//     res.redirect("/")
//   })
// }

// // register page
// exports.registerpage = function () {}

// // register page
// exports.registerpage = function (req, res) {
//   res.render("register-page")
// }

// // home page
// exports.home = function (req, res) {
//   if (req.session.user) {
//     res.render("home-dashboard", { username: req.session.user.username })
//   } else {
//     res.render("home-guest", { errors: req.flash("errors"), regErrors: req.flash("regErrors") })
//   }
// }

// // register
// exports.register = function (req, res) {
//   let user = new User(req.body)
//   user
//     .register()
//     .then(() => {
//       req.session.user = { username: user.data.username }
//       req.session.save(function () {
//         res.redirect("/")
//       })
//     })
//     .catch(regErrors => {
//       regErrors.forEach(function (error) {
//         req.flash("regErrors", error)
//       })
//       req.session.save(function () {
//         res.redirect("/")
//       })
//     })
// }

const User = require("../models/User")

exports.doesUsernameExist = function (req, res) {
  User.findByUsername(req.body.username)
    .then(function () {
      res.json(true)
    })
    .catch(function () {
      res.json(false)
    })
}

exports.doesEmailExist = async function (req, res) {
  let emailBool = await User.doesEmailExist(req.body.email)
  res.json(emailBool)
}

exports.login = function (req, res) {
  let user = new User(req.body)
  user
    .login()
    .then(function (result) {
      req.session.user = { avatar: user.avatar, username: user.data.username }
      req.session.save(function () {
        res.redirect("/")
      })
    })
    .catch(function (e) {
      req.flash("errors", e)
      req.session.save(function () {
        res.redirect("/")
      })
    })
}

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
}

exports.register = function (req, res) {
  let user = new User(req.body)
  user
    .register()
    .then(() => {
      req.session.user = { avatar: this.avatar, username: user.data.username }
      req.session.save(function () {
        res.redirect("/")
      })
    })
    .catch(regErrors => {
      regErrors.forEach(function (error) {
        req.flash("regErrors", error)
      })
      req.session.save(function () {
        res.redirect("/")
      })
    })
}

exports.home = function (req, res) {
  if (req.session.user) {
    res.render("home-dashboard", { username: req.session.user.username, avatar: req.session.user.avatar })
  } else {
    res.render("home-guest", { errors: req.flash("errors"), regErrors: req.flash("regErrors") })
  }
}
