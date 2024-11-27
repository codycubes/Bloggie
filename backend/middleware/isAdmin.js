import asyncHandler from 'express-async-handler';

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.email.endsWith('@admin.com')) {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Admins only');
  }
});

export { isAdmin };
