const admin = require("firebase-admin");

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key:
        process.env.FIREBASE_ADMIN_PRIVATE_KEY[0] === "-"
          ? process.env.FIREBASE_ADMIN_PRIVATE_KEY
          : JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
      client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
  });
};

module.exports = initFirebase;
