const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
//Mongoose Connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/the-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20000) + 1000;
        const camp = new Campground({
            author: '64a9894526add6083c995c51',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvda6on2q/image/upload/v1689524196/CamperHeaven/w8nlsmyusud3jco859go.jpg',
                    filename: 'CamperHeaven/w8nlsmyusud3jco859go'
                },
                {
                    url: 'https://res.cloudinary.com/dvda6on2q/image/upload/v1689524197/CamperHeaven/xvuk8fhqw75t5uhpx9tq.jpg',
                    filename: 'CamperHeaven/xvuk8fhqw75t5uhpx9tq'

                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque, amet ullam id quas, porro dolorem dicta possimus, odio quod reiciendis. Quidem tempora libero possimus totam, nam nesciunt officiis officia.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})