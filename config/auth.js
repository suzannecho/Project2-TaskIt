module.exports = {

    'facebookAuth': {
        'clientID': 528272114416595, // your App ID
        'clientSecret': "de37e76e0b25e74d620bbc2289f4dfcf", // your App Secret
        'callbackURL': 'https://taskit-yourdailytaskplanner.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    }

};