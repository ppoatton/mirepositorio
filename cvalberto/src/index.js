const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
//const email = require("./email")
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use(require('./routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

/* // objeto para autenticar el correo saliente
const oEmail = new email({
   "host": "outlook.es",
   "port": "3535",
   "secure": false,
   "auth": {
      "type": "login",
      "user": "ppo-dev@outlook.es",
      "pass": "alberto16586"
   }
}); */

// configuracion para el correo
app.post('/send', async function (req, res, next) {
   console.log(req.body);
   const output = `
           <div>
           <p>Correo: ${req.body.correo}</p>         
           <p>Mensaje: ${req.body.mensaje}</p>
           </div>
       `

       

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: 'smtp.live.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: "ppo-dev@outlook.es", // generated ethereal user
         pass: "alberto16586" // generated ethereal password
      },
      tls:{
         rejectUnauthorized: false
      }
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: '"Nodemailer contact" <ppo-dev@outlook.es>', // sender address
      to: 'ppoatton10@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
   });

   console.log('Message sent: %s', info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

   res.render('contacto',{ title: 'contacto' });
});

// listening the Server
app.listen(app.get('port'), () => {
   console.log('Server on port', app.get('port'));
});

