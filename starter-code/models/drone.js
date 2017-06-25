const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DroneSchema = new Schema ({
  droneName: {type: String, required: [true, 'Please enter a name']},
  propellers: Number,
  maxSpeed: Number
});

const Drone = mongoose.model('Drone', DroneSchema);

module.exports = Drone;
