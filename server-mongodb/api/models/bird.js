const { init } = require("../dbConfig");
const { ObjectId } = require("mongodb");

class Bird {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.age = data.age;
    this.breed = data.breed;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const birdsData = await db.collection("birds").find().toArray();
        const birds = birdsData.map((d) => new Bird({ ...d, id: d._id }));
        resolve(birds);
      } catch (err) {
        console.log(err);
        reject("Error retrieving birds");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let birdData = await db
          .collection("birds")
          .find({ _id: ObjectId(id) })
          .toArray();
        let bird = new Bird({ ...birdData[0], id: birdData[0]._id });
        resolve(bird);
      } catch (err) {
        reject("Bird not found");
      }
    });
  }

  static create(name, age, breed) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let birdData = await db
          .collection("birds")
          .insertOne({ name, age, breed });
        let newBird = new Bird(birdData.ops[0]);
        resolve(newBird);
      } catch (err) {
        reject("Error creating bird");
      }
    });
  }

  update() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let updatedBirdData = await db
          .collection("birds")
          .findOneAndUpdate(
            { _id: ObjectId(this.id) },
            { $inc: { age: 3 } },
            { returnOriginal: false }
          );
        let updatedBird = new Bird(updatedBirdData.value);
        resolve(updatedBird);
      } catch (err) {
        reject("Error updating bird");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        await db.collection("birds").deleteOne({ _id: ObjectId(this.id) });
        resolve("Bird was deleted");
      } catch (err) {
        reject("Bird could not be deleted");
      }
    });
  }
}

module.exports = Bird;
