const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/UsuarioModel');
const Session = require('../models/session');
const { authenticate } = require('../middleware/authenticate');
const { csrfCheck } = require('../middleware/csrfCheck');
const { initSession, isEmail } = require('../utils/utils');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isEmail(email)) {
      throw new Error('Tienes que poner una direccion de Email valida');
    }
    if (typeof password !== 'string') {
      throw new Error('La constrseña debe contener letras');
    }
    const user = new User({ 
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        email, 
        password });
    const persistedUser = await user.save();
    const userId = persistedUser._id;

    const session = await initSession(userId);

    res
      .cookie('token', session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1209600000,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(201)
      .json({
        title: 'Usuario registrado con exito',
        detail: 'Usuario registrado con exito',
        csrfToken: session.csrfToken,
      });
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          title: 'Ocurrio un error el registro',
          detail: 'Algo salio durante el registro',
          errorMessage: err.message,
        },
      ],
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isEmail(email)) {
      return res.status(400).json({
        errors: [
          {
            title: 'Bad Request',
            detail: 'Tienes que poner una direccion de Email valida',
          },
        ],
      });
    }
    if (typeof password !== 'string') {
      return res.status(400).json({
        errors: [
          {
            title: 'Bad Request',
            detail: 'La contrasela debe contener caracteres',
          },
        ],
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }
    const userId = user._id;

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      throw new Error();
    }

    const session = await initSession(userId);

    res
      .cookie('token', session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1209600000,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        title: 'Inicio de sesion exitoso',
        detail: 'Credenciales Validadas',
        csrfToken: session.csrfToken,
      });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Credenciales Incorrectas',
          detail: 'Verifica el email y que la contrasela sean correctas',
          errorMessage: err.message,
        },
      ],
    });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });

    res.json({
      title: 'Autenticacion Exitosa',
      detail: 'Usuario Autenticado',
      user,
    });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Sin autorizacion',
          detail: 'No tienes acceso',
          errorMessage: err.message,
        },
      ],
    });
  }
});

router.delete('/me', authenticate, csrfCheck, async (req, res) => {
  try {
    const { userId } = req.session;
    const { password } = req.body;
    if (typeof password !== 'string') {
      throw new Error();
    }
    const user = await User.findById({ _id: userId });

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      throw new Error();
    }

    await Session.expireAllTokensForUser(userId);
    res.clearCookie('token');
    await User.findByIdAndDelete({ _id: userId });
    res.json({
      title: 'Cuenta eliminada',
      detail: 'La cuenta ha sido eliminada',
    });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Credenciales Incorrectas',
          detail: 'Verifica el email y que la contraseña sean correctas',
          errorMessage: err.message,
        },
      ],
    });
  }
});

router.put('/logout', authenticate, csrfCheck, async (req, res) => {
  try {
    const { session } = req;
    await session.expireToken(session.token);
    res.clearCookie('token');

    res.json({
      title: 'Cierre de sesion exitoso',
      detail: 'Tu sesion ha expirado',
    });
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          title: 'Ocurrio un error',
          detail: 'Algo ocurrio durante el proceso',
          errorMessage: err.message,
        },
      ],
    });
  }
});

module.exports = router;
