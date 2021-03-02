require('dotenv').config();

export const config = {
  dbName: `boilerplateDB`,
  superAdmin: {
    superAdminEmail: process.env.SUPERADMIN_EMAIL,
    superAdminFirstName: process.env.SUPERADMIN_FNAME,
    superAdminLastName: process.env.SUPERADMIN_LNAME,
    superAdminPassword: process.env.SUPERADMIN_PASS,
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET,
  },
  mailchimp: {
    secret: process.env.MAILCHIMP_SECRET,
  },

  jwtSecret: process.env.SUPERSECRET,
  port: process.env.PORT,
};
