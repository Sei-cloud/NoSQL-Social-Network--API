# NoSQL Social Network API

![License](https://img.shields.io/badge/license-ISC-blue.svg)

### Creating the back-end for a social networking site with MongoDB


## Table of Contents

[Project Status](#project-status)

[Media of Application](#media-for-application)

[Purpose](#purpose)

[Installation](#installation)

[Usage](#usage)

[Credits](#credits)

[License](#license)

[Contributing](#contributing)

[Tests](#tests)

[Questions](#questions)


## Project Status

**Complete**

[GitHub Repository](https://github.com/aaguimond/module18-challenge-nosql-social-network-api)


## Media for Application

[A video showing the functionality of the API](https://drive.google.com/file/d/1Rdyy0TcTf4wOtP4SGOYknhOLiVcMml_E/view)


![A screenshot showing the MongoDB Compass database and collections](/assets/screenshots/NoSQLSocialNetworkAPIMongoDBCompass.png)

![A screenshot showing the get all users route in Insomnia](/assets/screenshots/NoSQLSocialNetworkAPIInsomniaUsers.png)

![A screenshot showing the get all thoughts route in Insomnia](/assets/screenshots/NoSQLSocialNetworkAPIInsomniaThoughts.png)


## Purpose

To learn how to work with MongoDB instead of SQL.


## Installation

After cloning the repository, run "npm i" in a terminal opened from within the directory. A MongoDB database service such as MongoDB Compass is required to host the database. An API service like Insomnia or Postman is required to operate the application APIs.


## Usage

Create a database named "socialNetworkDB" with collections "users" and "thoughts" within it. After [installing dependencies](#installation), seed the database from a terminal opened within the directory by entering "node utils/seed.js". The terminal console should return a "Seeding complete" message once successful. Make sure that MongoDB Compass is running and then execute "npm start" from the same terminal that the database was seeded from. Use Insomnia or Postman to operate the APIs.


## Credits

* MongoDB Compass
* Insomnia
* Mongoose
* Express.js
* VS Code


## License

This project is licensed under the [ISC](https://opensource.org/licenses/ISC) license.


## Contributing

Please feel free to use the code within the scope of the [license](#license), or contact me [here](#questions).


## Tests

There are no tests set up within the project currently, but testing inputs within Insomnia is a good way to see if any issues arise.


## Questions

Please reach out to me with any questions:

- Github: [aaguimond](https://github.com/aaguimond)
- Email: aidanguimond2024@u.northwestern.edu