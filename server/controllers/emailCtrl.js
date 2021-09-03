const nodemailer = require("nodemailer");
const { EMAIL, ENTRY_KEY } = process.env;

module.exports = {
  sendEmail: async (req, res) => {
    const { first_name, email } = req.query;
console.log(first_name,email)
    try {
      //invoke the createTransport function passing in your email information.
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: ENTRY_KEY,
        },
      });

      //invoke the sendMail function with the info in the email
      let info = await transporter.sendMail(
        {
          from: `'Gather 🥳🎈🎁' <${EMAIL}>`, //This will show up when you go into the email
          to: email,
          subject: `${first_name} You've been registered to Gather!`, //This will show on the subject of the email
          text: "thanks for joining gather!", //for clients with plaintext support only
          html: `<div>${"Thanks for joining gather!"}<div> 
                  <img src="cid:unique@nodemailer.com"/>`,
          attachments: [
            {
              //this is the attachment of the document
              filename: "license.txt",
              path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
            },
            //   {
            //     cid: 'unique@nodemailer.com', //same cid value as in the html img src
            //     path:image
            //   }
          ],
        },
        (err, res) => {
          if (err) {
            console.log("err", err);
          } else {
            console.log("res", res);
            res.status(200).send(info);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
