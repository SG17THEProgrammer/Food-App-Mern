// const Menu = [
//     {
//         id: 1,
//         image: "FoodImages/Masala Dosa.jpg",
//         name: "Masala Dosa",
//         category: "Breakfast",
//         price: '8.99$',
//         description: "Thin rice crepe filled with spiced potato filling, served with coconut chutney and sambar."

//     },
//     {
//         id: 2,
//         image: "FoodImages/chicken briyani.jpg",
//         name: "Chicken Biryani",
//         category: "Dinner",
//         price: '14.999$',
//         description: "Fragrant rice dish with basmati rice, chicken, and a blend of aromatic spices."
//     },
//     {
//         id: 3,
//         image: "FoodImages/butter chicken.jpg",
//         name: "Butter Chicken",
//         category: "Dinner",
//         price: '12.999$',
//         description: "Tender chicken cooked in a rich and creamy tomato-based curry with butter and spices."

//     },
//     {
//         id: 4,
//         image: "FoodImages/Garlic Naan.jpg",
//         name: "Garlic Naan",
//         category: "Lunch",
//         price: '3.99$',
//         description: "Soft and fluffy Indian bread brushed with garlic butter, perfect for dipping in curries."
//     },
//     {
//         id: 5,
//         image: "FoodImages/Palak Paneer.jpg",
//         name: "Palak Paneer",
//         category: "Dinner",
//         price: '10.99$',
//         description: "Cottage cheese cubes in a creamy spinach sauce, flavored with Indian spices."
//     },
//     {
//         id: 6,
//         image: "FoodImages/Pani Puri.jpg",
//         name: "Pani Puri",
//         category: "Snack",
//         price: '6.99$',
//         description: "Crunchy hollow puris filled with spicy and tangy flavored water, potatoes, and chickpeas."
//     },
//     {
//         id: 7,
//         image: "FoodImages/Tandoori Chicken.jpg",
//         name: "Tandoori Chicken",
//         category: "Dinner",
//         price: '9.99$',
//         description: "Marinated chicken cooked in a tandoor, resulting in a flavorful and smoky dish."
//     },
//     {
//         id: 8,
//         image: "FoodImages/Samosa.jpg",
//         name: "Samosa",
//         category: "Snack",
//         price: '4.99$',
//         description: "Deep-fried pastry filled with spiced potatoes, peas, and sometimes meat."
//     },
//     {
//         id: 9,
//         image: "FoodImages/Mango Lassi.jpg",
//         name: "Mango Lassi",
//         category: "Breakfast",
//         price: '3.49$',
//         description: "Refreshing yogurt-based drink blended with ripe mangoes and a hint of cardamom."
//     },
//     {
//         id: 10,
//         image: "FoodImages/Idli Sambhar.jpg",
//         name: "Idli Sambhar",
//         category: "Lunch",
//         price: '13.99$',
//         description: "Slow-cooked sambhar with a rich and aromatic blend of spices.Lorem ipsum dolor sit "
//     },
//     {
//         id: 11,
//         image: "FoodImages/Chana Masala.jpg",
//         name: "Chana Masala",
//         category: "Lunch",
//         price: '11.99$',
//         description: "Spicy chickpea curry cooked with tomatoes, onions, and various spices."
//     },
//     {
//         id: 12,
//         image: "FoodImages/Chicken Butter Masala.jpg",
//         name: "Chicken Butter Masala",
//         category: "Dinner",
//         price: '15.99$',
//         description: "Tender chicken pieces in a creamy and flavorful tomato-based curry."
//     },
//     {
//         id: 13,
//         image: "FoodImages/Paneer Tikka.jpg",
//         name: "Paneer Tikka",
//         category: "Snack",
//         price: '8.99$',
//         description: "Marinated and grilled cubes of paneer (Indian cottage cheese) with spices."
//     },
//     {
//         id: 14,
//         image: "FoodImages/Rasgulla.jpg",
//         name: "Rasgulla",
//         category: "Dessert",
//         price: '4.49$',
//         description: "Spongy and sweet cottage cheese dumplings in sugar syrup.Lorem, ipsum dolor."
//     },
//     {
//         id: 15,
//         image: "FoodImages/Indian Thal.jpg",
//         name: "Indian Thali",
//         category: "Dinner",
//         price: '18.99$',
//         description: "Assorted platter with a variety of curries, rice, bread, and desserts.Lorem, ipsum dolor."
//     },
//     {
//         id: 16,
//         image: "FoodImages/Aloo Paratha.jpg",
//         name: "Aloo Paratha",
//         category: "Breakfast",
//         price: '6.99$',
//         description: "Whole wheat bread stuffed with spiced mashed potatoes, pan-fried to perfection."
//     },
//     {
//         id: 17,
//         image: "FoodImages/Kheer.jpg",
//         name: "Kheer",
//         category: "Dessert",
//         price: '5.99$',
//         description: "Rice pudding made with milk, sugar, and flavored with cardamom and nuts."
//     },
//     {
//         id: 18,
//         image: "FoodImages/Corn Soup.jpg",
//         name: "Corn Soup",
//         category: "Breakfast",
//         price: '7.49$',
//         description: "Spiced yellow peas curry often served as a street snack. Lorem, ipsum dolor."
//     },
//     {
//         id: 19,
//         image: "FoodImages/Kadai Paneer.jpg",
//         name: "Kadai Paneer",
//         category: "Dinner",
//         price: '12.49$',
//         description: "Paneer cubes cooked in a spicy and flavorful tomato-based curry with bell peppers."
//     },
//     {
//         id: 20,
//         image: "FoodImages/Jalebi.jpg",
//         name: "Jalebi",
//         category: "Dessert",
//         price: '3.99$',
//         description: "Deep-fried spiral-shaped batter soaked in sugar syrup, a sweet and tangy treat."
//     },
//     {
//         id: 21,
//         image: "FoodImages/Dhokla.jpg",
//         name: "Dhokla",
//         category: "Snack",
//         price: '5.99$',
//         description: "Steamed fermented Cake made from rice and chickpea flour, often served with chutney."
//     },
//     {
//         id: 22,
//         image: "FoodImages/Gulab Jamun.jpg",
//         name: "Gulab Jamun",
//         category: "Dessert",
//         price: '4.99$',
//         description: "Soft and spongy cottage cheese balls soaked in sugar syrup, a Bengali sweet."
//     },
//     {
//         id: 23,
//         image: "FoodImages/Seekh Kebab.jpg",
//         name: "Seekh Kebab",
//         category: "Lunch",
//         price: '9.99$',
//         description: "Minced meat skewers seasoned with spices and grilled to perfection."
//     },
//     {
//         id: 24,
//         image: "FoodImages/Rasmalai.jpg",
//         name: "Rasmalai",
//         category: "Dessert",
//         price: '6.49$',
//         description: "Deep-fried milk solids dumplings soaked in sugar syrup, a popular festive sweet."
//     },
//     {
//         id: 25,
//         image: "FoodImages/Thandai.jpg",
//         name: "Thandai",
//         category: "Breakfast",
//         price: '4.49$',
//         description: "Cold milk beverage infused with nuts, seeds, and spices, often consumed during Holi festival."
//     },
//     {
//         id: 26,
//         image: "FoodImages/Pav Bhaji.jpg",
//         name: " Pav Bhaji",
//         category: "Snack",
//         price: '8.49$',
//         description: "Spicy mashed Vegetable curry served with buttered and toasted pav (bread)."
//     },
//     {
//         id: 27,
//         image: "FoodImages/Misal Pav.jpg",
//         name: " Misal Pav",
//         category: "Breakfast",
//         price: '7.99$',
//         description: "Spicy curry made with sprouted moth beans, topped with farsan, onions, and served with pav."
//     },
//     {
//         id: 28,
//         image: "FoodImages/Pakoda.jpg",
//         name: "Pakoda",
//         category: "Snack",
//         price: '5.49$',
//         description: "Deep-fried fritters made from Vegetables or meat, coated in gram flour batter."
//     },
//     {
//         id: 29,
//         image: "FoodImages/Chaat Papdi.jpg",
//         name: "Chaat Papdi",
//         category: "Snack",
//         price: '6.99$',
//         description: "Crunchy snack with a combination of papdi,boiled potatoes and chutneys."
//     },
//     {
//         id: 30,
//         image: "FoodImages/Mutton Roast.jpg",
//         name: "Mutton Roast",
//         category: "Dinner",
//         price: '17.99$',
//         description: "Spicy and succulent mutton curry slow-cooked to perfection with aromatic spices."
//     },
//     {
//         id: 31,
//         image: "FoodImages/Mathari.jpg",
//         name: "Mathari",
//         category: "Night Munchies",
//         price: '17.99$',
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, provident!"
//     },
//     {
//         id: 32,
//         image: "images/apple1.jfif",
//         name: "Apple",
//         category: "Fruits",
//         price: '1.99$',
//         description: "Enjoy the crisp and refreshing taste of our premium apples. Perfect for snacking, baking, or enhancing your salads with natural sweetness."
//     },
//     {
//         id: 33,
//         image: "images/fresh-yellow-banana-fruit-free.png",
//         name: "Banana",
//         category: "Fruits",
//         price: '0.99$',
//         description: "Savor the tropical goodness of our ripe bananas. Packed with essential nutrients, they make a healthy and delicious addition to your daily diet."
//     },
//     {
//         id: 34,
//         image: "images/orange.avif",
//         name: "Orange",
//         category: "Fruits",
//         price: '2.49$',
//         description: "Experience the juiciness and vibrant flavor of our premium oranges. A delightful citrus treat that adds a burst of freshness to your day."
//     },
//     {
//         id: 35,
//         image: "images/Grapes.avif",
//         name: "Grapes",
//         category: "Fruits",
//         price: '3.99$',
//         description: "Indulge in the succulent sweetness of our finest grapes. Perfect for snacking, pairing with cheese, or adding a touch of luxury to any occasion."
//     },
//     {
//         id: 36,
//         image: "images/mango-png-image-mongo-clipart-ripening-of-mango.png",
//         name: "Mango",
//         category: "Fruits",
//         price: '2.99$',
//         description: "Taste the tropical paradise with our premium mangoes. Juicy, aromatic, and perfect for enjoying on their own or adding a tropical twist to your dishes."
//     },
//     {
//         id: 37,
//         image: "images/Strawberry.avif",
//         name: "Strawberry",
//         category: "Fruits",
//         price: '4.49$',
//         description: "Satisfy your sweet cravings with our plump and juicy strawberries. Whether in desserts, salads, or eaten fresh, they're a delightful treat for any occasion."
//     },
//     {
//         id: 38,
//         image: "images/pineapple-fruit-tropical-fruit-natural-foods-ananas-ananas.png",
//         name: "Pineapple",
//         category: "Fruits",
//         price: '5.99$',
//         description: "Experience the tropical sweetness of our pineapples. Versatile in both savory and sweet dishes, they add a burst of flavor to your culinary creations."
//     },
//     {
//         id: 39,
//         image: "images/watermelon - fruits.jpg",
//         name: "Watermelon",
//         category: "Fruits",
//         price: '6.49$',
//         description: "Quench your thirst and cool down with our succulent watermelons. Perfect for picnics, summer parties, or a refreshing snack on a hot day."
//     },
//     {
//         id: 40,
//         image: "images/baby kiwi - fruits.jpg",
//         name: "Kiwi",
//         category: "Fruits",
//         price: '2.79$',
//         description: "Delight in the unique combination of sweet and tangy with our baby kiwis. Small in size but big on flavor, they're a fun and nutritious addition to your fruit selection."
//     },
//     {
//         id: 41,
//         image: "images/Peach.avif",
//         name: "Peach",
//         category: "Fruits",
//         price: '3.29$',
//         description: "Enjoy the luscious taste of our premium peaches. Whether eaten fresh, grilled, or added to desserts, they bring a taste of summer to your table."
//     },
//     {
//         id: 42,
//         image: "images/carrot red per kg - vegetables.jpg",
//         name: "Carrot",
//         category: "Vegetable",
//         price: '1.5$',
//         description: "Add a pop of color and nutrition to your meals with our vibrant red carrots. Sweet and crunchy, they're a versatile vegetable for both raw and cooked dishes."
//     },
//     {
//         id: 43,
//         image: "images/Broccoli.avif",
//         name: "Broccoli",
//         category: "Vegetable",
//         price: '2.0$',
//         description: "Boost your health with our nutrient-packed broccoli. Perfect for steaming, roasting, or adding to your favorite stir-fries, it's a versatile and delicious green vegetable."
//     },
//     {
//         id: 44,
//         image: "images/Spinach.avif",
//         name: "Spinach",
//         category: "Vegetable",
//         price: '1.8$',
//         description: "Fuel your body with the goodness of our fresh spinach. Whether sautéed, blended into smoothies, or used in salads, it's a nutrient-rich choice for a healthy diet."
//     },
//     {
//         id: 45,
//         image: "images/Tomato.avif",
//         name: "Tomato",
//         category: "Vegetable",
//         price: '1.2$',
//         description: "Enhance the flavor of your dishes with our plump and juicy tomatoes. Perfect for sauces, salads, or simply enjoyed sliced with a sprinkle of salt."
//     },
//     {
//         id: 46,
//         image: "images/cabbage per pc - vegetables.jpg",
//         name: "Cabbage",
//         category: "Vegetable",
//         price: '2.5$',
//         description: "Experience the crisp and crunchy texture of our fresh cabbage. Whether used in coleslaw, soups, or stir-fries, it adds a delightful crunch to your meals."
//     },
//     {
//         id: 47,
//         image: "images/Cucumber.avif",
//         name: "Cucumber",
//         category: "Vegetable",
//         price: '1.4$',
//         description: "Stay hydrated with our crisp and refreshing cucumbers. Perfect for salads, sandwiches, or as a healthy snack, they add a cool and hydrating element to your meals."
//     },
//     {
//         id: 48,
//         image: "images/Zucchini.avif",
//         name: "Zucchini",
//         category: "Vegetable",
//         price: '1.9$',
//         description: "Add a touch of mild and versatile flavor to your dishes with our fresh zucchini. Ideal for grilling, roasting, or using in pasta dishes, it's a must-have in your kitchen."
//     },
//     {
//         id: 49,
//         image: "images/green peas - vegetables.jpg",
//         name: "Green Peas",
//         category: "Vegetable",
//         price: '2.2$',
//         description: "Enjoy the sweetness and vibrant color of our green peas. Whether added to risottos, curries, or enjoyed as a side dish, they bring a burst of freshness to your plate."
//     },
//     {
//         id: 50,
//         image: "images/cake.png",
//         name: "Chocolate Delight",
//         category: "Cake",
//         price: '15.99$',
//         description: "Indulge in the decadence of our Chocolate Delight cake. Rich, moist, and adorned with luscious chocolate, it's the perfect treat for any chocolate lover's cravings."
//     },
//     {
//         id: 51,
//         image: "images/cake1.png",
//         name: "Vanilla Bliss",
//         category: "Cake",
//         price: '12.50$',
//         description: "Experience pure bliss with our Vanilla Bliss cake. A classic choice with a heavenly vanilla flavor that satisfies your sweet tooth with every delectable bite."
//     },
//     {
//         id: 52,
//         image: "images/Strawberries & Cream - Tubzee Ice Cream.jfif",
//         name: "Strawberry Symphony",
//         category: "Cake",
//         price: '18.75$',
//         description: "Let your taste buds dance to the Strawberry Symphony. This delightful cake is a harmonious blend of sweet strawberries and moist cake layers, creating a symphony of flavors."
//     },
//     {
//         id: 53,
//         image: "images/Red Velvet Elegance.avif",
//         name: "Red Velvet Elegance",
//         category: "Cake",
//         price: '21.99$',
//         description: "Elevate your celebrations with the Red Velvet Elegance cake. A luxurious and velvety treat, each slice embodies the perfect balance of rich cocoa and cream cheese frosting."
//     },
//     {
//         id: 54,
//         image: "images/Lemon Zest Delight.avif",
//         name: "Lemon Zest Delight",
//         category: "Cake",
//         price: '14.25$',
//         description: "Brighten your day with the zesty goodness of our Lemon Zest Delight cake. A citrusy masterpiece that combines the freshness of lemons with a light and fluffy texture."
//     },
//     {
//         id: 55,
//         image: "images/Caramel Dream.avif",
//         name: "Caramel Dream",
//         category: "Cake",
//         price: '19.50$',
//         description: "Indulge in the velvety sweetness of our Caramel Dream cake. Each bite is a journey into caramel perfection, creating a dreamy and satisfying dessert experience."
//     },
//     {
//         id: 56,
//         image: "images/Blueberry Bliss.avif",
//         name: "Blueberry Bliss",
//         category: "Cake",
//         price: '16.99$',
//         description: "Experience a burst of fruity delight with our Blueberry Bliss cake. Packed with juicy blueberries, this cake is a true celebration of the vibrant and refreshing berry flavor."
//     },
//     {
//         id: 57,
//         image: "images/Hazelnut Heaven.avif",
//         name: "Hazelnut Heaven",
//         category: "Cake",
//         price: '23.75$',
//         description: "Dive into a world of exquisite taste with our Hazelnut Heaven cake. Indulge in the rich, nutty flavor that elevates every bite to a divine experience."
//     }


// ];

// export default Menu
