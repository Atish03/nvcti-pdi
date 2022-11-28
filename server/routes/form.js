const express = require("express");
const router = express.Router();
const Form = require("../models/form");
const User = require("../models/user");
const Evaluator = require("../models/evaluator")
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
)

router.route("/submit").post(
  isLoggedIn,
  catchAsync(async (req, res) => {
    // console.log(req.body);
    const {
      projectTitle,
      name,
      departmentAndYear,
      admissionNo,
      email,
      mobile,
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
      expenses
    } = req.body;
    const userId = req.user._id;
    const newForm = new Form({
      projectTitle,
      name,
      departmentAndYear,
      admissionNo,
      email,
      mobile,
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
      expenses
    });
    await newForm.save();
    const user = await User.findById(userId);
    user.formSubmitted.push(newForm._id);
    await user.save();
    // change adminId for the id in mongodb
    const adminId = '636947907d962995838c3a69'
    const admin = await Evaluator.findById(adminId);
    admin.applicants.push(newForm._id);
    await admin.save()
    res.status(200).send({ msg: "Form submitted successfully !" });
  })
);

module.exports = router;