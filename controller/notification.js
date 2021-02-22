const bcrypt = require("bcrypt");
const Notification = require("../model/notification");
const Course = require("../model/courses");

const User = require("../model/users");
const Images = require("../model/images");

exports.getAddNotification = (req, res, next) => {
  res.render("admin/add-notification", {
    title: "notification",
    path: "/add-notification",
  });
};

exports.postNotification = (req, res) => {
  const notification = new Notification({ notice: req.body.notice });
  notification.save().then((result) => {
    res.redirect("/notification");
  });
};
exports.getNotifications = (req, res) => {
  Notification.find().then((result) => {
    res.render("user/getNotifications.ejs", {
      title: "notice",
      allNotice: result,
    });
  });
};

exports.getGellary = (req, res) => {
  Images.find().then((result) => {
    res.render("user/gellary.ejs", {
      title: "gellary",
      images: result,
    });
  });
};

exports.getCourses = (req, res) => {
  Course.find().then((result) => {
    res.render("user/courses.ejs", {
      title: "courses",
      departments: result,
    });
  });
};

exports.getLogin = (req, res, next) => {
  res.render("admin/login", {
    title: "login",
  });
};

exports.getSignup = (req, res, next) => {
  res.render("admin/signup", {
    title: "signup",
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.redirect("/admin/signup");
    } else {
      bcrypt
        .hash(password, 12)
        .then((hashed) => {
          const user = new User({
            email: email,
            password: hashed,
          });
          user.save().then((_) => {
            res.redirect("/admin/login");
          });
        })
        .then((err) => {
          console.log("err");
        });
    }
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.redirect("/admin/login");
    }

    bcrypt.compare(password, user.password).then((isMached) => {
      if (isMached) {
        req.session.isLoggedIn = true;
        res.redirect("/");
      } else {
        res.redirect("/admin/login");
      }
    });
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

exports.getUpload = (req, res, next) => {
  res.render("admin/upload", { title: "upload" });
};

exports.postUpload = (req, res, next) => {
  for (let file of req.files) {
    const img = Images({
      url: file.filename,
    });
    img.save();
  }
  res.redirect("/gellary");
};

exports.getAddCourses = (req, res, next) => {
  res.render("admin/add-courses", { title: "add courses" });
};

exports.postCourse = (req, res, next) => {
  const department = req.body.department;
  const title = req.body.title;
  const seats = req.body.seats;
  const shift = req.body.shift;
  Course.findOne({ department: department }).then((dep) => {
    if (dep) {
      dep.course = [
        ...dep.course,
        {
          title: title,
          seats: seats,
          shift: shift,
          imgUrl: req.files[0].filename,
        },
      ];
      dep.save().then((_) => {
        res.redirect("/courses");
      });
    } else {
      const course = new Course({
        department: department,
        course: {
          title: title,
          seats: seats,
          shift: shift,
          imgUrl: req.files[0].filename,
        },
      });
      course.save().then((_) => {
        res.redirect("/courses");
      });
    }
  });
};
