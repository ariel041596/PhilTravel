const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

exports.signInWithGoogleAccount = functions.https.onCall((data, context) => {
  // get the user and add custom claims (admin)
  // if (context.auth.token.admin !== true) {
  //   return { error: "Only admins can add other admins" };
  // }
  var provider = new firebase.auth.GoogleAuthProvider();
  return admin
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    })
    .catch(error => {
      console.log("Error fetching user data:", error);
    });
});
