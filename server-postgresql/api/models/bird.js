const db = require("../dbConfig");

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
        const birdsData = await db.query(`SELECT * FROM birds;`);
        const birds = birdsData.rows.map((d) => new Bird(d));
        resolve(birds);
      } catch (err) {
        reject("Error retrieving birds");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let birdData = await db.query(`SELECT * FROM birds WHERE id = $1;`, [
          id,
        ]);
        let bird = new Bird(birdData.rows[0]);
        resolve(bird);
      } catch (err) {
        reject("Bird not found");
      }
    });
  }

  static create(name, age, breed) {
    return new Promise(async (resolve, reject) => {
      try {
        let birdData = await db.query(
          `INSERT INTO birds (name, age, breed) VALUES ($1, $2, $3) RETURNING *;`,
          [name, age, breed]
        );
        let newBird = new Bird(birdData.rows[0]);
        resolve(newBird);
      } catch (err) {
        reject("Error creating bird");
      }
    });
  }

  update() {
    return new Promise(async (resolve, reject) => {
      try {
        let updatedBirdData = await db.query(
          `UPDATE birds SET age = age + 1 WHERE id = $1 RETURNING *;`,
          [this.id]
        );
        let updatedBird = new Bird(updatedBirdData.rows[0]);
        resolve(updatedBird);
      } catch (err) {
        reject("Error updating bird");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query(`DELETE FROM birds WHERE id = $1;`, [this.id]);
        resolve("Bird was deleted");
      } catch (err) {
        reject("Bird could not be deleted");
      }
    });
  }
}

module.exports = Bird;
