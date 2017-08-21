var express = require('express');
var User = require('./users');

var router = express.Router();
router.route('/users')
    .post(function(req,res){
    
        var user = new User();
        user.name = req.body.name; 
        user.email = req.body.email; 
        user.save(function(err){
            if (err) { res.send(err); }
    
            res.json({ message: 'We have created a new user!' });
        });
    })
    
    .get(function(req,res){
    
        User.find(function(err, users){
            if (err){ res.send(err); }
    
            res.json(users);
        });
    
    })
router.route('/users/:user_id')
    .get(function (req,res){
    
        User.findById(req.params.user_id, function(err, user){
            if (err){ res.send(err); }
    
            res.json(user);
        });
    })
    .put(function(req,res){
        User.findById(req.params.user_id, function(err, user){
            if (err){ res.send(err); }
    
            user.name = req.body.name;
            user.email = req.body.email;
            user.save(function(err){
                if (err) { res.send(err); }
    
                res.json({ message: 'User Updated!' });
            });
        });
    })
    
    .delete(function(req, res){
        User.remove({_id:req.params.user_id}, function(err, user){
            if (err){ res.send(err); }
    
            res.json({ message: 'Successfully removed!' });
        });
    })


module.exports = router;