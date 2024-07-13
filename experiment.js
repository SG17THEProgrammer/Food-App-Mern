let jsonArray = [
    { name: "Alice", city: "New York" },
    { name: "Bob", city: "Los Angeles" },
    { name: "Charlie", city: "Chicago" }
];

// Define the age you want to add
const defaultAge = 30;

// Add the 'age' key-value pair to each object
jsonArray.forEach(obj => {
    obj.age = defaultAge;
});

// Now jsonArray will have the 'age' key added to each object
console.log(jsonArray);