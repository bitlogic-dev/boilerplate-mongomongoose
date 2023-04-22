require('dotenv').config();

const mongoose = require('mongoose');

// connect to mongodb cluster
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// create schema
const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

// create model
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  // create new instance of Person model
  const person = new Person({
    name: 'name',
    age: 45,
    favoriteFoods: ['']
  });

  // use built-in mongoose method to save record
  person.save((err, data) => {
    if(err) {
      done(null);
    } else {
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  // use built-in mongoose method to create multiple instances from an array of objects
  // Model.create(docs, options, callback)
  Person.create(arrayOfPeople, (err, data) => {
    if(err) {
      done(null)
    } else {
      done(null, data)
    }
  });
};

const findPeopleByName = (personName, done) => {
  // Model.find(query, callback) accepts a query document (a JSON object) and a callback, 
  // then returns an array of matches.
  // In search methods, the callback causes the query to execute, otherwise it will just
  // return the query
  let query = {name: personName};
  Person.find(query, (err, data) => {
    if(err) {
      done(null)
    } else {
      done(null, data)
    }
  });
};

const findOneByFood = (food, done) => {
  let query = {favoriteFoods: food};
  Person.findOne(query, (err, data) => {
    if(err) done(null)
    else done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) done(null)
    else done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) {
      done(null)
    }
    else {  
      person.favoriteFoods.push(foodToAdd);
      person.save((err, data) => {
        if(err) done(null)
        else done(null, data)
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  const query = {name: personName};
  const update = {age: ageToSet};
  const options = {new: true};
  
  Person.findOneAndUpdate(query, update, options, (err, data) => {
    if(err) done(null)
    else done(null, data)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if(err) done(null)
    else done(null, data)
  });

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  const conditions = {name: nameToRemove};
  Person.deleteMany(conditions, (err, data) => {
    if(err) done(null)
    else done(null, data)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // build the query with chaining ending with .exec(callback) to execute the whole thing
  // when querying an array, passing just the element w/o brackets is like doing 'contains'
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((err, data) => {
    if(err) done(null)
    else done(null, data)
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
