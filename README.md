GraceShopper - BottledUp
This is an example of an online store designed for our company, BottledUp to sell our eco-friendly bottles, lids, and straws. The goal is to allow customers to sign up to our site as users, shop, pay for, and submit orders, and get their products. In addition, guests who are not logged in should be able to shop as well. Shopping carts should exist for each user, and should persist beyond a single session and across devices.

Getting Started
Feel free to use this as a boilerplate code for future stores

Prerequisites
You'll need to 'npm install' and 'npm run start-dev' to test and see your project locally. We've set everythign up to work with Postgres/Sequelize, and you'll see options to use a Google Sign-in (with associated Oauth), as well as Heroku and Travis for a non-local testing experience and continuous development respectively.

Example: Google OAuth
- if using other sign-in features, be sure to account for different sign-ins in your database models, as well as routes/sessions
- Google (or your alternate login method) should give you a means of signing up, a client ID to store in your code, and instructions on how to set up their method within the code

Example: Heroku/Travis
- this is a great option for testing your app as it will exists on a non-local server and for ensuring CI/CD. If interested in using, you need to sign up for a Heroku account, link your Git repository to the app you create there, and follow Heroku/Travis instructions to ensure that everything is aligned properly.
Note: for Heroku to have proper data, you can link your Postgres to Heroku, but using 'npm run seed' will only work to populate your local database. To deploy data and see it in your online app, follow Heroku's instructions to read/sync the seed file within a Heroku Bash window.


Running the tests
Travis will automadically run your tests for you, and will halt delployment to Heroku if they fail. Else, feel free to use 'npm test' locally.


Authors
GHJen
Rachel
Stephanie
Jane
and Grace Hopper fellows/instructors

License
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments
Hat tip to MIT's boilermaker code
