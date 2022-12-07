import { useState } from "react";
import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeaders";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "./form.style";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
import { useSelector } from "react-redux";
import { CircularLoader } from "..";
import { useEffect } from "react";

const heads = [
  "Minor tools/hardware (component wise details)",
  "Consumables (with details",
  "Miscellaneous",
];

// const data = {
//   _id: {
//     $oid: "638f71e6de2ea36d9267d31b",
//   },
//   projectTitle: "project for environment variables",
//   members: [
//     {
//       name: "kunal",
//       email: "kj@kj.com",
//       departmentAndYear: "btech mechanical engineering",
//       mobile: "1280193223",
//       admissionNo: "21je0497",
//     },
//     {
//       name: "kal",
//       email: "kj@kj.com",
//       departmentAndYear: "btech",
//       mobile: "128019",
//       admissionNo: "21je0497",
//     },
//     {
//       name: "kunal",
//       email: "kj@k.com",
//       departmentAndYear: "btech",
//       mobile: "128019",
//       admissionNo: "21je97",
//     },
//   ],
//   mentor: "Mr. Pankaj Tripathi, CSE Department",
//   domain: "Robotic Technology",
//   summary:
//     "orem ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr",
//   objectives:
//     "sdLorem ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr itaque?ds",
//   background:
//     "Lorem ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr itaque?s",
//   significance:
//     "sorem ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr itaque?d",
//   technologyGap:
//     "dorem ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr itaque?",
//   methodology:
//     "ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr",
//   outcome:
//     "ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?prsd",
//   units: ["Electronics Circuits and IoT Unit", "Robotics and Automation Unit"],
//   roleOfMembers:
//     "ovident expedita iusto veritatis illo ex et quidem laudantium culpa aliquam tempore quasi, nobis nostrum dolorum consectetur quas aliquid minima eligendi ut error delectus similique. Sint at qui rem quod blanditiis error ratione cum dignissimos aliquam provident corporis quidem vel fugiat mollitia delectus voluptatem illo, adipisci reprehenderit vitae. Minima similique quasi sit veniam hic reiciendis dolore fuga neque itaque magnam voluptatibus ratione, tenetur earum aliquid accusamus, inventore corrupti vel rem quam voluptatum corporis cumque dicta est dolorum. Ipsa omnis quibusdam, optio eum doloremque facere nesciunt, sed, deserunt velit modi molestiae illum labore maiores accusantium commodi. Quia sunt aperiam, quibusdam blanditiis hic inventore dolores amet recusandae id sapiente numquam in, ducimus eos, qui explicabo illo a? Corporis minus recusandae mollitia vel iste voluptas eveniet maxime, facilis, porro repudiandae eum. Dolorum fugit itaque dolores. Rem dolore amet molestiae aut consequuntur facere assumenda provident fugit quas dolorem earum perspiciatis aliquam, asperiores officia itaque alias ullam minima nesciunt quisquam. Corrupti dolor consequuntur ullam quia error numquam debitis nam ratione ea hic qui dolorem odit, perspiciatis deserunt inventore sint nulla minima illo cum quas, illum fuga quod laboriosam! Autem praesentium illum iusto fugit obcaecati deleniti?pr",
//   expenses: [
//     {
//       number: "21",
//       cost: 1212,
//       _id: {
//         $oid: "638f71e6de2ea36d9267d31c",
//       },
//     },
//     {
//       number: "12",
//       cost: 12,
//       _id: {
//         $oid: "638f71e6de2ea36d9267d31d",
//       },
//     },
//     {
//       number: "12",
//       cost: 11,
//       _id: {
//         $oid: "638f71e6de2ea36d9267d31e",
//       },
//     },
//   ],
//   status: "Pending",
//   comments: [],
//   finalist: false,
//   created_at: {
//     $date: {
//       $numberLong: "1670345190174",
//     },
//   },
//   updated_at: {
//     $date: {
//       $numberLong: "1670345190174",
//     },
//   },
//   __v: 0,
// };

const formId = "63907d6fcf523eb2a629900a"; //! Need to be Changed!!

const ViewFormApplication = () => {
  // getting the document
  // const { formId } = useParams();
  const navigate = useNavigate();
  const { position, token } = useSelector((store) => store.user.user);
  console.log("userPos", position);
  // console.log(formId);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setIsLoading(true);
        // console.log(token);
        const resp = await customFetch.get(
          `/form/getform/${formId}`,
          authHeader(token)
        );
        setData(resp.data);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error(err.message);
      }
    };
    fetchForm();
    // eslint-disable-next-line
  }, []);

  console.log(data);

  const handleComment = async () => {
    setIsLoading(true);
    await customFetch.post(
      "/evaluator/addcomment",
      { formId, comment },
      authHeader(token)
    );
    setComment("");
    setIsLoading(false);
    toast.success("Comment added successfully !");
  };

  const handleStatus = async (status) => {
    try {
      setIsLoading(true);
      await customFetch.post(
        "/evaluator/update",
        { applicantId: formId, status },
        authHeader(token)
      );
      setIsLoading(false);
      toast.success("Status updeted successfully !");
      navigate("/superadmin");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong !");
    }
  };
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

      <Paper elevation={3} sx={{ mt: 4, p: 3, pb: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              1. Project Title :
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="projectTitle"
              type="text"
              value={data.projectTitle}
              required
              disabled
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>

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
              disabled
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
              disabled
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              <span>Semester: </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="semester"
              type="text"
              value={data.semester}
              disabled
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
          2. Details of the Applicant(s):
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, mt: 4 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Admission No</TableCell>
                <TableCell>Department and Year</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.members?.map(
                ({ name, admissionNo, departmentAndYear, email, mobile }) => (
                  <TableRow
                    key={admissionNo + name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{name}</TableCell>
                    <TableCell>{admissionNo}</TableCell>
                    <TableCell>{departmentAndYear}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{mobile}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              3. Faculty Mentor Details (if any):
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="mentor"
              multiline
              value={data.mentor}
              fullWidth
              rows={4}
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              4. Domain/Course (Please indicate one):
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="domain"
              type="text"
              value={data.domain}
              required
              disabled
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              5. Executive Summary: (With a pictorial view of the expected
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
              required
              value={data.summary}
              disabled
              fullWidth
              rows={8}
              color="primary"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              6. Objectives (2-3 bullet points):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="objectives"
              multiline
              required
              value={data.objectives}
              disabled
              fullWidth
              rows={8}
              color="primary"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              7. Background (Origin of the idea and state of art) (Max 400
              words):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="background"
              multiline
              required
              value={data.background}
              disabled
              fullWidth
              rows={8}
              color="primary"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              8. Significance/Need of the Project (Max 200 words):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="significance"
              multiline
              required
              value={data.significance}
              fullWidth
              rows={8}
              color="primary"
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              9. Technology Gap (2-3 bullet points):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="technologyGap"
              multiline
              required
              value={data.technologyGap}
              fullWidth
              rows={8}
              color="primary"
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              10. Methodology (Max 1 page including flow chart etc.):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="methodology"
              multiline
              value={data.methodology}
              required
              fullWidth
              rows={8}
              color="primary"
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              11. Deliverables/Outcomes (in bullet points):
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="outcome"
              multiline
              value={data.outcome}
              required
              fullWidth
              rows={8}
              color="primary"
              disabled
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              12. Units of NVTIL to be used:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {data?.units?.map((unit) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                  gap: "8px",
                }}
              >
                <CheckBoxIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
                {unit}
              </Box>
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              13. Please specify the role and responsibility of each team member
              in the context of the project:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="roleOfMembers"
              multiline
              value={data.roleOfMembers}
              required
              fullWidth
              rows={8}
              color="primary"
              disabled
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 2 }}>
              14. Expected Expanses:
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
              value={data?.expenses?.[0]?.number}
              required
              fullWidth
              disabled
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              type="number"
              name="cost"
              value={data?.expenses?.[0]?.cost}
              required
              fullWidth
              disabled
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
              value={data.expenses?.[1].number}
              required
              disabled
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="cost"
              type="number"
              value={data.expenses?.[1].cost}
              required
              fullWidth
              disabled
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
              value={data.expenses?.[2].number}
              required
              fullWidth
              disabled
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              name="cost"
              type="number"
              value={data.expenses?.[2].number}
              required
              fullWidth
              disabled
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
              value={data?.expenses
                ?.map(({ cost, number }) => cost * number)
                .reduce((acc, i) => acc + i, 0)}
              required
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>

      {position === 2 && (
        <Paper sx={{ m: 2, p: 3 }}>
          <Typography variant="h4" gutterBottom align="left">
            Add Comment -
          </Typography>
          <TextField
            name="projectObjective"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Comment will be visible to super admin (optional) "
            multiline
            fullWidth
            rows={8}
          />
          <Button variant="contained" onClick={handleComment} sx={{ m: 2 }}>
            Add Comment
          </Button>
        </Paper>
      )}
      {position === 3 && (
        <Paper sx={{ m: 2, p: 3 }}>
          <Typography variant="h5" gutterBottom align="left">
            Mentors' Comments -
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {data?.comments?.map((u, idx) => (
              <Paper
                key={idx}
                sx={{
                  width: { lg: "30%", sm: "45%", xs: "90%" },
                  m: 2,
                  p: 2,
                  height: "max-content",
                  boxShadow: "var(--shadow-2)",
                  backgroundColor: "#f9f1e66c",
                }}
              >
                {u}
              </Paper>
            ))}
          </Box>
        </Paper>
      )}
      {position === 3 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            color="error"
            onClick={() => handleStatus("REJECTED")}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            color="success"
            onClick={() => handleStatus("ACCEPTED")}
          >
            Accept
          </Button>
        </Box>
      )}
    </Wrapper>
  );
};

export default ViewFormApplication;
