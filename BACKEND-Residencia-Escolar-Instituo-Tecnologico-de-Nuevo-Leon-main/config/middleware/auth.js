// validar la cookie, si no se encuentra, devolver 403 para manejarlo en el front-end
function checkAdminCookie(req, res, next) {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ message: "Usuario no proporcionado" });
  }

  const expectedCookieName = `sessionId-admin-${usuario}`;

  // Logs para depuración
  console.log(`Expected Cookie Name: ${expectedCookieName}`);
  console.log(`Cookies: `, req.cookies);

  if (req.cookies[expectedCookieName]) {
    next();
  } else {
    return res.status(403).json({ message: "Acceso no autorizado. Cookie no encontrada." });
  }
}

module.exports = checkAdminCookie;





// function checkAdminCookie(req, res, next) {
//   const adminCookieName = Object.keys(req.cookies).find((cookie) =>
//     cookie.startsWith("sessionId-admin")
//   );

//   if (adminCookieName && req.cookies[adminCookieName]) {
//     next();
//   } else {
//     return res.status(403).json({ message: "Acceso no autorizado. Cookie no encontrada." });
//   }
// }


// module.exports = checkAdminCookie;
