const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set imgUrl true in production
const formSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    members: [
      {
        name: {
          type: String,
          required: true,
        },
        departmentAndYear: {
          type: String,
          required: true,
        },
        admissionNo: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        mobile: {
          type: String,
          required: true,
        },
      },
    ],
    mentor: {
      type: String,
      required: false,
    },
    domain: {
      type: String,
      enum: [
        "Robotic Technology",
        "Electronics and IoT",
        "Animation and Game Design",
        "Electric Mobility",
        "Aeronautics and Space Technology",
        "Smart Manufacturing",
        "Financial Technology",
        "Data and Software Technology",
      ],
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    significance: {
      type: String,
      required: true,
    },
    technologyGap: {
      type: String,
      required: true,
    },
    methodology: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    units: [
      {
        type: String,
        required: true,
      },
    ],
    roleOfMembers: {
      type: String,
      required: true,
    },
    expenses: [
      {
        number: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
        },
      },
    ],
    course: {
      type: String,
    },
    semester: {
      type: String,
      enum: ["Summer", "Winter", "Monsoon"]
    },
    session: {
      type: String
    },
    status: {
      type: String,
      default: "Pending",
    },
    department: {
      type: String
    },
    comments: [
      {
        type: String,
      },
    ],
    finalist: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

module.exports = mongoose.model("Form", formSchema);
