/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import { getBarData } from '../api/yelp';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const barsController = controllers && controllers.bars;
export default (app) => {

  if(barsController  && usersController) {
    app.get('/location', usersController.addSearch, getBarData, barsController.get);
    app.put('/location', barsController.add);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupprotedMessage('users or bars routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/'
      }), (req, res) =>
        req.session.save((err) => {
          if(err){
            console.log('Error: unable to save session before redirect');
          } else {
            res.redirect('/')
          }
        })
    );
  }
};
