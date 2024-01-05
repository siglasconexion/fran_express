// authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = 'tu_clave_secreta'; // Cambia esto por una clave secreta más segura

exports.authenticateUser = (req, res, next) => {
  // Obtener el token de la cabecera de autorización (Bearer token)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Token de autenticación no proporcionado o en formato incorrecto' 
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      message: 'Token de autenticación no proporcionado' 
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user; // Añadir el usuario decodificado al objeto de solicitud
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};
