var User = require('../models/user.js');

exports.create = function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if(user != null) {
      res.send('user exists');
      return false;
    }

    new User({
      name: req.body.fullName,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).save();

    res.send('success');
  });
}

exports.read = function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    res.send(user);
  });
}


exports.update = function(req, res) {
  User.update({ _id: req.params.id }, {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    }
  }).exec();

  return res.send('success');
}

exports.delete = function(req, res) {
  return User.findById(req.body.id, function(err, user) {
    return user.remove(function (err) {
      if (!err) {
        return res.send('removed');
      } else {
        return res.send(err);
      }
    });
  });
}