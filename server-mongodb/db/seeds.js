const db = connect("mongodb://localhost:27017/birds");

db.birds.drop();

db.birds.insertMany([
  { name: "Bella", age: 15, breed: "parrot" },
  { name: "Benji", age: 3, breed: "potoo" },
  { name: "Don", age: 12, breed: "pelican" },
  { name: "Christopher", age: 18, breed: "parrot" },
]);
