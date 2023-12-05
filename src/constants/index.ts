const PORT = Number(process.env.PORT) || 45009;
const ENVIRONMENT = process.env.ENVIRONMENT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const ADMIN_SDK = JSON.parse(process.env.ADMIN_SDK as string);
const PEPPER = process.env.PEPPER;
export { PORT, ENVIRONMENT, JWT_SECRET_KEY, ADMIN_SDK, PEPPER };
