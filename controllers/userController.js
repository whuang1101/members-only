const User = require('../models/users');
const Messages = require("../models/messages");
const express = require("express")
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require('passport');

exports.get_index = asyncHandler(async(req,res,next) => {
  // retrieve messages from database.
  const messages = await Messages.find().populate("user").exec();
  res.render('index',{ loggedIn: req.user, messages: messages});
})
exports.sign_up_get = asyncHandler(async(req,res,next) => {
  // retrieve messages from database.
  const messages = await Messages.find().populate("user").exec();
  res.render('index',{ loggedIn: req.user, messages: messages});
})
// handle login_button
exports.login_post = async function(req, res, next) {
  passport.authenticate("local", async function(err, user, info) {
      if (err) {
          return next(err);
      }
      if (!user) {
          try {
              const messages = await Messages.find().populate("user").exec();
              console.log(info.message);
              return res.render('index', { loggedIn: req.user, messages: messages, sign_up_error: true, info: info });
          } catch (error) {
              console.error(error);
              return res.redirect("/");
          }
      }
      req.login(user, function(err) {
          if (err) {
              return next(err);
          }
          return res.redirect("/");
      });
  })(req, res, next);
};
exports.sign_out = asyncHandler(async(req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
// handling the sign_up_button
exports.sign_up_post = [

    body("firstName", "First name must have at least 1 character").trim().isLength({ min: 1 }).escape(),
    body("lastName", "Last name must have at least 1 character").trim().isLength({ min: 1 }).escape(),
    body("username", "Username must have at least 5 character").trim().isLength({ min: 5 }).escape(),
    body("username", "Username can't have spaces").trim().custom((value) => {
        if (/\s/.test(value)) {
            throw new Error('Spaces are not allowed in username');
          }
          return true;
    }),
    body("password", "Password must have at least 8 character").trim().isLength({ min: 8 }).escape(),
    body('confirm-password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }), 
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const capitalFirst = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);
        const capitalLast = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);
        const lowerUsername = req.body.username.toLowerCase();
        // declare new user
        const newUser = new User({
            first_name: capitalFirst,
            last_name: capitalLast,
            username: req.body.username,
        })


        if(!errors.isEmpty()){
            console.log("no")
            //reloading form for user ease of use
            const messages = await Messages.find().exec();
            res.render("index", {loggedIn: req.user,user:newUser,messages: messages, errors: errors.array(), sign_up_error: true});
        }
        else{
            const betterPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                first_name: capitalFirst,
                last_name: capitalLast,
                username: lowerUsername,
                password: betterPassword,
                messages: [],
                is_member: false,
                is_admin: false,
            })
            const userExists = await User.findOne({username:req.body.username});
            if(userExists){
                errors.errors.push({msg: 'Username is already in use'});
                console.log(errors);
                const messages = await Messages.find().exec();
                res.render("index", {loggedIn: false, messages: messages,user:newUser,errors: errors.array(), sign_up_error: true});
            }
            else {
                console.log("saved")
                await newUser.save();
                res.redirect("/")
            }
        }
      })
    ];
exports.become_member_post = asyncHandler(async(req,res,next) => {
  const secretKey = "apples";
  const attemptedKey = req.body.secret;
  const loggedInUser = req.user;
  if(attemptedKey === secretKey){
    const findUser = await User.findOne({_id: loggedInUser._id});
    const updateUser = await User.updateOne(
      { _id: loggedInUser._id },
      { $set: { is_member: true } }
    );
    res.redirect("/")
  }
  else{
    res.redirect("/")
  }
})
    
exports.add_message_post = asyncHandler(async (req, res) => {
  const newTitle = req.body.messageTitle;
  const newText = req.body.messageText;
  const loggedInUser = req.user;
  
  try {
    const userFound = await User.findOne({ _id: req.user._id });
    if (userFound) {
      const newMessage = new Messages({
        title: newTitle,
        text: newText,
        user: userFound._id,
        time_stamp: new Date()
      });
      await newMessage.save();
      await User.updateOne({ _id: userFound._id }, { $push: { messages: newMessage._id } });
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
  }
  
});

exports.delete_message_post = asyncHandler(async (req, res) => {
  const messageId = req.body.confirmation;
  const message = await Messages.findOne({ _id: messageId });
  const newUser = await User.findOne({ _id: message.user });
  
  console.log(message);
  console.log(newUser);
  
  const newUserRemoveId = await User.updateOne(
    { _id: message.user },
    { $pull: { messages: messageId } }
  );
  const deleteOne = await Messages.deleteOne({ _id: messageId });
  
  res.redirect('/');
});