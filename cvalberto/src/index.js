const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const email = require("./email")

var badyParser = require("body-parser");

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(badyParser.json());
app.use(badyParser.urlencoded({ extended: true }));

// middlewares
app.use(morgan('dev'));

// routes
app.use(require('./routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// objeto para autenticar el correo saliente
const oEmail = new email({
  "host":"tu-host",
  "port":"3535",
  "secure":false,
  "auth":{
      "type":"login",
      "user":"ppoatton@hotmail.com",
      "pass":""
  }
});

// correo
app.post('/api/contacto', function (req, res, next) {
  let email ={
      from:"ppoatton@hotmail.com",
      to:"ppoatton10@gmail.com",
      subject:"Nuevo mensaje de usuario",
      html:`
          <div>
          <p>Correo: ${req.body.c}</p>         
          <p>Mensaje: ${req.body.m}</p>
          </div>
      `
  };

  oEmail.enviarCorreo(email);
  res.send("ok");
});

// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

