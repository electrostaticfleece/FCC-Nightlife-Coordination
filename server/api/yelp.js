import Oauth from 'oauth-1.0a';
import axios from 'axios';

const baseURL = 'https://api.yelp.com/v2/';

const oauth = Oauth({
  consumer: {
    public: process.env.YELP_CONSUMER_KEY,
    secret: process.env.YELP_CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1'
});

const token = {
  public: process.env.YELP_TOKEN,
  secret: process.env.YELP_TOKEN_SECRET
}

function createTerms(query) {
  const terms = Object.keys(query).reduce((prev, next, i, arr) => {
    const amp = i < arr.length - 1 ? '&' : '';
    const formatted = query[next].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim()
    .replace(/\s{1,}/g,"%2B");
    return prev.concat(next, '=', formatted, amp);
  }, '?');

  return terms; 
}

export function getBarData(req, res, next) {
  const location = req.query.location;
  const query = { location, term: 'bars' };
  const terms = 'search' + createTerms(query);
  const method = 'GET';
  const url = baseURL + terms;
  const request_data = {
    url,
    method
  };
  const headers = oauth.toHeader(oauth.authorize(request_data, token));
  const yelp = axios.create({
    baseURL,
    headers
  });

  yelp.get(terms, {timeout: 10000})
    .then(function(response) {
      req.body.data = response.data;
      next();
      return null; 
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occured trying to obtain your search request.');
      return null;
    })
  return null;
}