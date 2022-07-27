const userModel = require("../Models/user");

const signup = async (req, res) => {
  try {
    const isExist = await userModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!isExist) {
      const newUser = new userModel({ ...req.body });
      await newUser.save();
      return res.send(newUser);
    }
    return res.send("User Already Exists");
  } catch (err) {
    return res.sendStatus(404);
  }
};

const signin = async (req, res) => {
  try {
    const isExist = await userModel.findOne({
      email: req.body.email,
    });

    if (isExist && (await isExist.matchPassword(req.body.password))) {
      return res.send("User Exists");
    }
    return res.sendStatus(404);
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = { signup, signin };
