const express = require('express');

// require the Drone model here

const router = express.Router();
const Drone = require('../models/drone');

router.get('/drones', (req, res, next) => {
  // Iteration #2
  Drone.find({}, (err, drones) => {
    if (err) {
      return next(err)
    }
    res.render('drones/index', {
      drones: drones
    });
  });
});


router.get('/drones/new', (req, res, next) => {
  // Iteration #3
  res.render('drones/new');
});

router.post('/drones', (req, res, next) => {
  // Iteration #3
  let droneInfo = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  const newDrone = new Drone(droneInfo);
  newDrone.save((err) => {
    if (err) {
      res.render('drones/new', { errors: newDrone.errors });
    } else {
      res.redirect('/drones');
    }
  });
});

router.get('/drones/:id', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findById(droneId, (err, drone) => {
    if (err) { return next(err); }
    res.render('drones/show', { drone: drone });
  });
});

router.get('/drones/:id/edit', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findById(droneId, (err, drone) => {
    if (err) { return next(err); }
    res.render('drones/edit', { drone: drone });
  });
});

router.post('/drones', (req, res, next) => {
  // Iteration #3
  let droneInfo = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  const updatedDrone = new Drone(droneInfo);
  newDrone.save((err) => {
    return next(err);
  });
  return res.redirect('/drones');
});

router.post('/drones/:id', (req, res, next) => {
  const droneId = req.params.id;

  let droneInfo = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  Drone.findByIdAndUpdate(droneId, droneInfo, (err, drone) => {
    if (err){ return next(err); }
    return res.redirect('/drones');
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findByIdAndRemove(droneId, (err, drone) => {
    if (err){ return next(err); }
    return res.redirect('/drones');
  });
});

module.exports = router;
