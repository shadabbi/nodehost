const nodemailer = require("nodemailer");
const sandgrid = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport(
  sandgrid({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.sandMail = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const message = req.body.message;
  const contact = req.body.contact;
  transport.sendMail({
    to: email,
    from: "shadab.ali7503@gmail.com",
    subject: "sent message",
    html: "<h1>success!</h1>",
  });

  transport
    .sendMail({
      to: "lucky.boss7011@gmail.com",
      from: "shadab.ali7503@gmail.com",
      subject: "sent message",
      html: `<h1>${message} from ${email}</h1>`,
    })
    .then((result) => {
      res.redirect("/contact");
    });
};
