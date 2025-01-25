// authMiddleware.js
import jwt from 'jsonwebtoken';

const secretKey = 'tu_clave_secreta'; // Cambia esto por una clave secreta más segura

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token de autenticación no proporcionado o en formato incorrecto',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};
