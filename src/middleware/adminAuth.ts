// Middleware
// import { errorResponse } from '../helpers';

// const adminAuth = (req, res, next) => {
//   if (req.user && req.user.email && req.user.isAdmin) {
//     return next();
//   }
//   return errorResponse(req, res, "You don't have admin access", 401);
// };

// export default adminAuth;

// Helper
// export const successResponse = (req, res, data, code = 200) => res.send({
//   code,
//   data,
//   success: true,
// });

// export const errorResponse = (
//   req,
//   res,
//   errorMessage = 'Something went wrong',
//   code = 500,
//   error = {},
// ) => res.status(500).json({
//   code,
//   errorMessage,
//   error,
//   data: null,
//   success: false,
// });
