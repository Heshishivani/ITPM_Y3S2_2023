import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// @desc  Fetch validate the user in Login credentials and then send a token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
      },
      accessToken: generateToken(user._id),
    });
  } else {
    res.status(401).send({ message: "Invalid Credentials." });
  }
});

// @desc  Get user profile
// @route GET /api/users/view/:id

const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } else {
    res
      .status(200)
      .send({ success: false, message: "User account not found." });
  }
});

// @desc  Add a new user
// @route POST /api/users/register

const createUser = asyncHandler(async (req, res) => {
  const { name, fname, lname, email, password, role, image } = req.body;

  const chk_user_existence = await User.findOne({ email: email });

  if (chk_user_existence) {
    res.status(400).send({
      message: "There's a member already registered with that email.",
    });
  }

  const user = await User.create({
    name,
    fname,
    lname,
    email,
    password,
    role,
    image,
  });
  if (user) {
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      accessToken: generateToken(user._id),
    });
  } else {
    // throw new Error('This user account cannot be created. Try again')
    res.status(200).send({ message: "Error.Please Try again" });
  }
});

// @desc  Get request to all users
// @route PUT /api/users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "CUSTOMER" }, { password: 0 });
  res.json(users);
});

// @desc  check user token
// @route POST /api/users/profile/auth

const checkTokenExpiration = asyncHandler(async (req, res) => {
  const JWTToken = req.body.accessToken;

  try {
    var expTime = jwt.decode(JWTToken).exp;
    var timeNow = Date.now() / 1000;
    // console.log(expTime, timeNow);

    if (expTime > timeNow) {
      const decodedData = jwt.decode(JWTToken);
      const user = await User.findById(decodedData.id);
      // console.log(user);

      if (user) {
        res.status(200).send({
          user: {
            _id: user._id,
            name: user.name,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            role: user.role,
            image: user.image,
          },
          accessToken: JWTToken,
          message: "Success",
        });
      } else {
        res.status(200).send({ message: "Not found" });
      }
    } else {
      res.status(200).send({ message: "Expired" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message, message: "Error" });
  }
});

// @desc  Delete user by id
// @route DELETE /api/users/delete/:id

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const data = await User.deleteOne({ _id: req.params.id });
    // console.log(data);
    res.status(200).send({ success: true, message: "success" });
  } else {
    res.status(200).send({ success: false, message: "failed" });
  }
});

const updateCustomerData = asyncHandler(async (req, res) => {
  if (req.body && req.params) {
    const query = { _id: req.params.id };

    const user = await User.findById(req.params.id);
    
    user.fname = req.body.fname;
    user.name = req.body.name;
    user.lname = req.body.lname;
    
    if(req.body.image && req.body.image.length > 0){
      let img = req.body.image[0];
      user.image = img;
    }

    await User.updateOne(query, user)
      .then((result) => {
        res
          .status(200)
          .send({ success: true, message: "User Updated Successfully!" });
      })
      .catch((error) => {
        res.status(200).send({ success: false, message: error });
      });
  } else {
    res.status(200).send({ success: false, message: "No Data Found" });
  }
});

export default {
  getUserByID,
  createUser,
  getUsers,
  authUser,
  checkTokenExpiration,
  deleteUser,
  updateCustomerData,
};
