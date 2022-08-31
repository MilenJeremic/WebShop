//import bcrypt(pass hashing) package
const bcrypt = require("bcryptjs");

//import database helper file
const db = require("../database/database");

//creating user model for database
class User {
  constructor(email, password, fullName, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  //check for existing user in db
  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  //check for existing user in db
  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  //check for existing user password in db
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  //function for inserting/storing user when signup info is sent
  async signup(params) {
    const hashedPassword = await bcrypt.hash(this.password, 12); //hashing a password (for security) before saving

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullName: this.fullName,
      address: this.address,
    });
  }
}

module.exports = User;
