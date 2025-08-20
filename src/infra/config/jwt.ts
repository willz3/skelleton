export const jwtConfig = Object.freeze({
  secretKey: String(process.env.JWT_SECRET_KEY),
  publicKey: String(process.env.JWT_PUBLIC_KEY),
  defaultOptions: {
    algorithm: String(process.env.JWT_ALGORITHM),
    expiresIn: String(process.env.JWT_EXPIRES_IN),
  },
});
