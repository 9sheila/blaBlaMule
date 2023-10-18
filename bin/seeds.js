require('dotenv').config();

const mongoose = require('mongoose');
const travels = require('../data/travels.json');
const Travel = require('../models/travel.model');
const User = require('../models/user.model');


require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => User.create({
          name: 'Robin Scherbatsky',
          email: 'robin@gmail.com',
          password: '123456789',
          phoneNumber: '641033838',
          profilePicture:"https://depor.com/resizer/Ch_OY3jcK5FBxlChG8KmMu8o1l4=/620x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/SVYYUUKCKZDYHF7VWCS2PSCYBI.jpg",
          city: 'Madrid'
         
        })
    )
    .then(userCreated => {
      console.log(`- Created user ${userCreated.name}`);
      travels.forEach(travel => travel.user = userCreated._id);
      return Travel.create(travels);
    })
    .then(travelsCreated => {
      console.log(`- Created ${travelsCreated.length} travels`);
    })
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});