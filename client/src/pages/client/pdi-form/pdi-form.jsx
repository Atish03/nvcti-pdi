import { useState } from "react";
import React from "react";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  Grid,
  InputLabel,
  Divider,
} from "@mui/material";
import Wrapper from "./pdi-form.styles";
import CircularLoader from "../../../components/loader/circular-loader.component";
import Member from "./member";
import { useSelector } from "react-redux";

const NVCTIunit = [
  "Mechanical and Rapid Prototyping Unit",
  "Electronics Circuits and IoT Unit",
  "Gaming and Animation Design Unit",
  "Pouch Battery Cell Assembly Unit",
  "Robotics and Automation Unit",
];

const PdiApplicationForm = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState([false, false, false, false, false]);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((store) => store.user.user);

  const [cost, setCost] = useState([
    { number: "", cost: "" },
    { number: "", cost: "" },
    { number: "", cost: "" },
  ]);
  const [data, setData] = useState({
    projectTitle: "",
    mentor: "",
    domain: "Robotic Technology",
    summary: "",
    objectives: "",
    background: "",
    significance: "",
    technologyGap: "",
    methodology: "",
    outcome: "",
    roleOfMembers: "",
    course: "",
    session: "",
    semester: "Monsoon",
    // expenses:""
  });

  const handleChange = (prop) => (event) => {
    console.log(prop, event.target.value);
    setData({ ...data, [prop]: event.target.value });
  };

  const handleUnit = (idx) => {
    const units = unit.map((el, i) => (i === idx ? !el : el));
    setUnit(units);
  };

  const [memberCount, setMemberCount] = useState(1);
  const [member1, setMember1] = useState({
    name: "",
    departmentAndYear: "",
    admissionNo: "",
    email: "",
    mobile: "",
  });
  const handleMember1 = (prop) => (event) => {
    setMember1({ ...member1, [prop]: event.target.value });
  };

  const [member2, setMember2] = useState({
    name: "",
    departmentAndYear: "",
    admissionNo: "",
    email: "",
    mobile: "",
  });
  const handleMember2 = (prop) => (event) => {
    setMember2({ ...member2, [prop]: event.target.value });
  };

  const [member3, setMember3] = useState({
    name: "",
    departmentAndYear: "",
    admissionNo: "",
    email: "",
    mobile: "",
  });
  const handleMember3 = (prop) => (event) => {
    setMember3({ ...member3, [prop]: event.target.value });
  };

  const handleCost = (e, idx) => {
    let newArr = cost.map((el, index) => {
      let obj = el;
      if (index === idx) {
        obj = { ...obj, [e.target.name]: e.target.value };
      }
      return obj;
    });
    console.log(newArr);
    let total = 0;
    newArr.forEach((el) => {
      total += el.number * el.cost;
    });
    setTotalCost(total);
    setCost(newArr);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let unitObj = unit.map((e, i) => e && NVCTIunit[i]);
      unitObj = unitObj.filter((e) => {
        if (e) return e;
      });

      const members = [];
      if (memberCount >= 1) members.push(member1);
      if (memberCount >= 2) members.push(member2);
      if (memberCount >= 3) members.push(member3);
      const obj = {
        units: unitObj,
        ...data,
        members,
        expenses: cost,
      };
      // To check if the object has all the required fields are filled!

      console.log(obj);
      // await customFetch.post(`/form/submit`, obj, authHeader(token));
      setIsLoading(false);
      // navigate("/client");
      toast.success("Form submitted successfully !");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error("Something went wrong while submitting !");
    }
  };

  // console.log("rr = ", cost);
  // console.log(applicants);

  return (
    <Wrapper sx={{ width: { lg: "75%", md: "80%", sm: "85%", xs: "95%" } }}>
      {isLoading && <CircularLoader />}
      <Box>
        <Typography
          variant="h1"
          gutterBottom
          align="center"
          color="primary"
          fontSize={40}
        >
          Naresh Vashisht Centre for Tinkering and Innovation Indian School of
          Technology (Indian School of Mines) Dhanbad
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          Minor In <br />
          <strong style={{ fontSize: "35px" }}> Product Development</strong>
          <br /> Internship
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Project Title :
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="projectTitle"
              type="text"
              value={data.projectTitle}
              onChange={handleChange("projectTitle")}
              label="Project Title"
              required
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3, pb: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              <span>Course: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="course"
              type="text"
              value={data.course}
              onChange={handleChange("course")}
              placeholder="e.g. B.tech/M.Tech/Ph.D..."
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              <span>Session: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="session"
              type="text"
              value={data.session}
              onChange={handleChange("session")}
              placeholder="e.g. 2022-23"
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Semester:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="leader-Semester-select">Semester</InputLabel>
              <Select
                labelId="leader-Semester-select"
                id="demo-simple-select"
                required
                name="Semester"
                value={data.semester}
                onChange={handleChange("semester")}
                label="Domain"
                fullWidth
              >
                <MenuItem value="Summer">Summer</MenuItem>
                <MenuItem value="Winter">Winter</MenuItem>
                <MenuItem value="Monsoon">Monsoon</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
          Details of the Applicant(s):
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "10px",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography variant="span">
            (In case of a team, please add same details for each member by
            clicking the "plus" icon below.)
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="leader-team-select">No. of Team Members</InputLabel>
            <Select
              labelId="leader-team-select"
              id="demo-simple-select"
              value={memberCount}
              required
              onChange={(e) => setMemberCount(e.target.value)}
              label="No. of team member"
              fullWidth
              defaultValue={1}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span>Name: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="name"
              type="text"
              value={member1.name}
              onChange={handleMember1("name")}
              label="Name"
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span>Department and Year: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="admissionNo"
              type="text"
              value={member1.departmentAndYear}
              onChange={handleMember1("departmentAndYear")}
              label="Department and Year"
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span>Admission No: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="admissionNo"
              type="text"
              value={member1.admissionNo}
              onChange={handleMember1("admissionNo")}
              label="Admission No."
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p" gutterBottom align="left" sx={{ mb: 2 }}>
              Contact details
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span>Email : </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="email"
              type="text"
              label="Email Address"
              value={member1.email}
              onChange={handleMember1("email")}
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span>Phone No: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="mobile"
              type="tel"
              label="Phone No."
              required
              value={member1.mobile}
              onChange={handleMember1("mobile")}
              fullWidth
              color="primary"
            />
          </Grid>
          <Member
            memberCount={memberCount}
            handleMember2={handleMember2}
            handleMember3={handleMember3}
            member2={member2}
            member3={member3}
          />
        </Grid>
        <Divider />
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Faculty Mentor Details (if any):
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="mentor"
              label="Faculty Mentor Details (if any):"
              multiline
              value={data.mentor}
              onChange={handleChange("mentor")}
              fullWidth
              rows={4}
              inputProps={{
                maxLength: 35,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Domain/Course (Please indicate one):
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="leader-domain-select">Domain</InputLabel>
              <Select
                labelId="leader-domain-select"
                id="demo-simple-select"
                required
                name="domain"
                value={data.domain}
                onChange={handleChange("domain")}
                label="Domain"
                fullWidth
              >
                <MenuItem value="Robotic Technology">
                  Robotic Technology
                </MenuItem>
                <MenuItem value="Electronics and IoT">
                  Electronics and IoT
                </MenuItem>
                <MenuItem value="Animation and Game Design">
                  Animation and Game Design
                </MenuItem>
                <MenuItem value="Electric Mobility">Electric Mobility</MenuItem>
                <MenuItem value="Aeronautics and Space Technology">
                  Aeronautics and Space Technology
                </MenuItem>
                <MenuItem value="Smart Manufacturing">
                  Smart Manufacturing
                </MenuItem>
                <MenuItem value="Financial Technology">
                  Financial Technology
                </MenuItem>
                <MenuItem value="Data and Software Technology">
                  Data and Software Technology
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Executive Summary: (With a pictorial view of the expected
              prototype/design/Front-End, if possible) (Max 200 words, clearly
              write how your idea solves the real-world problem related to the
              domain)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="summary"
              multiline
              label="Executive Summary"
              required
              value={data.summary}
              onChange={handleChange("summary")}
              fullWidth
              rows={4}
              color="primary"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Objectives (2-3 bullet points):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="objectives"
              multiline
              label="Objectives"
              required
              value={data.objectives}
              onChange={handleChange("objectives")}
              fullWidth
              rows={4}
              color="primary"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Background (Origin of the idea and state of art) (Max 400 words):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="background"
              multiline
              label="Background"
              required
              value={data.background}
              onChange={handleChange("background")}
              fullWidth
              rows={8}
              color="primary"
              inputProps={{
                maxLength: 400,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <input type="file" />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Significance/Need of the Project (Max 200 words):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="significance"
              multiline
              label="Significance"
              required
              value={data.significance}
              onChange={handleChange("significance")}
              fullWidth
              rows={4}
              color="primary"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Technology Gap (2-3 bullet points):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="technologyGap"
              multiline
              label="Technology Gap"
              required
              value={data.technologyGap}
              onChange={handleChange("technologyGap")}
              fullWidth
              rows={4}
              color="primary"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Methodology (Max 1 page including flow chart etc.):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="methodology"
              multiline
              value={data.methodology}
              onChange={handleChange("methodology")}
              label="Methodology"
              required
              fullWidth
              rows={4}
              color="primary"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <input type="file" />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Deliverables/Outcomes (in bullet points):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="outcome"
              multiline
              value={data.outcome}
              onChange={handleChange("outcome")}
              label="Outcomes"
              required
              fullWidth
              rows={8}
              color="primary"
              inputProps={{
                maxLength: 400,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Select the units of NVTIL to be used (you can tick more than one
              unit):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={unit[0]} onChange={() => handleUnit(0)} />
                }
                label="Mechanical and Rapid Prototyping Unit"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={unit[1]} onChange={() => handleUnit(1)} />
                }
                label="Electronics Circuits and IoT Unit"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={unit[2]} onChange={() => handleUnit(2)} />
                }
                label="Gaming and Animation Design Unit"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={unit[3]} onChange={() => handleUnit(3)} />
                }
                label="Pouch Battery Cell Assembly Unit"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={unit[4]} onChange={() => handleUnit(4)} />
                }
                label="Robotics and Automation Unit"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={unit[5]} onChange={() => handleUnit(5)} />
                }
                label="Any other lab of the institute (specify)"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Please specify the role and responsibility of each team member in
              the context of the project:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="roleOfMembers"
              multiline
              value={data.roleOfMembers}
              onChange={handleChange("roleOfMembers")}
              label="Role Of Members"
              required
              fullWidth
              rows={8}
              color="primary"
              inputProps={{
                maxLength: 400,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              Expected Expanses:
            </Typography>
          </Grid>
          <Grid item xs={4} align="center">
            <strong>Head</strong>
          </Grid>
          <Grid item xs={4} align="center">
            <strong>Number</strong>
          </Grid>
          <Grid item xs={4} align="center">
            <strong>Cost</strong>
          </Grid>

          <Grid item xs={4}>
            Minor tools/hardware (component wise details)
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="number"
              type="text"
              value={cost[0].number}
              onChange={(e) => handleCost(e, 0)}
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              type="number"
              name="cost"
              value={cost[0].cost}
              onChange={(e) => handleCost(e, 0)}
              required
              fullWidth
              color="primary"
            />
          </Grid>

          <Grid item xs={4}>
            Consumables (with details)
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="number"
              type="text"
              value={cost[1].number}
              onChange={(e) => handleCost(e, 1)}
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="cost"
              type="number"
              value={cost[1].cost}
              onChange={(e) => handleCost(e, 1)}
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            Miscellaneous
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="number"
              type="text"
              value={cost[2].number}
              onChange={(e) => handleCost(e, 2)}
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="cost"
              type="number"
              value={cost[2].cost}
              onChange={(e) => handleCost(e, 2)}
              required
              fullWidth
              color="primary"
            />
          </Grid>

          <Grid item xs={8} align="right">
            <strong>Total</strong>
          </Grid>
          <Grid item xs={4} align="center">
            <TextField
              size="small"
              name="cost"
              type="text"
              disabled
              value={totalCost}
              required
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 4 }}>
          Submit
        </Button>
      </Box>
    </Wrapper>
  );
};

export default PdiApplicationForm;
