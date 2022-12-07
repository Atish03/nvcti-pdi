import { TextField, Typography, Grid, Divider } from "@mui/material";
import React from "react";

const Member = ({
  memberCount,
  handleMember2,
  handleMember3,
  member2,
  member3,
}) => {
  return (
    <>
      {memberCount === 2 && (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
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
              value={member2.name}
              onChange={handleMember2("name")}
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
              value={member2.epartmentAndYear}
              onChange={handleMember2("departmentAndYear")}
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
              value={member2.admissionNo}
              onChange={handleMember2("admissionNo")}
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
              value={member2.email}
              onChange={handleMember2("email")}
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
              value={member2.mobile}
              onChange={handleMember2("mobile")}
              fullWidth
              color="primary"
            />
          </Grid>
        </>
      )}
      {memberCount === 3 && (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
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
              value={member2.name}
              onChange={handleMember2("name")}
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
              value={member2.departmentAndYear}
              onChange={handleMember2("departmentAndYear")}
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
              value={member2.admissionNo}
              onChange={handleMember2("admissionNo")}
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
              value={member2.email}
              onChange={handleMember2("email")}
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
              value={member2.mobile}
              onChange={handleMember2("mobile")}
              fullWidth
              color="primary"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
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
              value={member3.name}
              onChange={handleMember3("name")}
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
              value={member3.departmentAndYear}
              onChange={handleMember3("departmentAndYear")}
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
              value={member3.admissionNo}
              onChange={handleMember3("admissionNo")}
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
              value={member3.email}
              onChange={handleMember3("email")}
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
              value={member3.mobile}
              onChange={handleMember3("mobile")}
              fullWidth
              color="primary"
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Member;
