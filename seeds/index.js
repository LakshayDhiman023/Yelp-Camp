const cities = require('./cities');
const mongoose = require('mongoose');
const { places, descriptors} = require("./seedHelpers")
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp '
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errors:"));
db.once("open", () =>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for (let i = 0; i < 50 ;i++){
        const random100 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20)+10; 
        const camp = new Campground({
            location: `${cities[random100].city},${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, molestiae necessitatibus. Magni hic voluptas iste voluptates? Accusantium veritatis debitis cumque expedita provident reiciendis, vel dolores neque esse labore quia ex!',
            price
        })
        await camp.save(); 
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});