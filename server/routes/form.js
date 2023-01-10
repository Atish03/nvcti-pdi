const express = require("express");
const router = express.Router();
const Form = require("../models/form");
const User = require("../models/user");
const Evaluator = require("../models/evaluator");
const { isLoggedIn, isAuthor } = require("../middleware");
const catchAsync = require("../utilities/catchAsync");

router.route("/getform/:formId").get(
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const formId = req.params.formId;
    const resp = await Form.findById(formId);
    res.status(200).send(resp);
  })
);

router.route("/getforms/:userId").get(
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const enrolled = await User.findById(userId).populate("formSubmitted");
    res.status(200).send(enrolled);
  })
);

router.route("/submit").post(
  isLoggedIn,
  catchAsync(async (req, res) => {
    // console.log(req.body);
    const {
      projectTitle,
      members,
      mentor,
      domain,
      summary,
      objectives,
      background,
      significance,
      technologyGap,
      methodology,
      outcome,
      units,
      roleOfMembers,
      expenses,
      course,
      semester,
      session,
      department
    } = req.body;
    const userId = req.user._id;
    const newForm = new Form({
      projectTitle,
      members,
      mentor,
      domain,
      summary,
      objectives,
      background,
      significance,
      technologyGap,
      methodology,
      outcome,
      units,
      roleOfMembers,
      expenses,
      course,
      semester,
      session,
      department
    });
    await newForm.save();
    const user = await User.findById(userId);
    user.formSubmitted.push(newForm._id);
    await user.save();
    // change adminId for the id in mongodbmo
    const adminId = "6389af2b877d8f0375fec470";
    const admin = await Evaluator.findById(adminId);
    admin.applicants.push(newForm._id);
    await admin.save();
    res.status(200).send({ msg: "Form submitted successfully !" });
  })
);

module.exports = router;
