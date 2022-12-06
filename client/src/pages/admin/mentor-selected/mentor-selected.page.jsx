import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularLoader } from "../../../components";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import { useSelector } from "react-redux";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Alert,
  Button,
} from "@mui/material";
import Wrapper from "./mentor-selected.style";

import { visuallyHidden } from "@mui/utils";
import { StatusPill } from "../../../components";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "idx",
    label: "Serial No.",
  },
  {
    id: "projectTitle",
    label: "Title",
  },
  {
    id: "domain",
    label: "Domain",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "view",
    label: "View Form",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const sortField = ["projectTitle", "domain"]; // field to sort with
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={idx}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {sortField.includes(headCell.id) ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Mentor Accepted Applications
      </Typography>
    </Toolbar>
  );
}

const EnhancedTable = ({ response }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(orderBy);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - response.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={response.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {response
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={row.name}>
                      <TableCell padding="normal" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.projectTitle}</TableCell>
                      <TableCell align="center">{row.domain}</TableCell>
                      <TableCell align="center">
                        <StatusPill color="success">Accepted</StatusPill>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/view/${row._id}`)}
                        >
                          View application
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={response.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

const MentorAcceptedDashboard = () => {
  // fetch applications for lab
  const { token } = useSelector((store) => store.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const resp = await customFetch.get(
          `/evaluator/getacceptedforms`,
          authHeader(token)
        );
        setResponses(resp.data.applications);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Somehint went wrong while fetching applicatins");
      }
    };
    fetchApplications();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <CircularLoader />;
  }

  if (responses && responses.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{ width: { xs: "90%", md: "60%" }, mx: "auto" }}
      >
        There are no responses.
      </Alert>
    );
  }

  return (
    <Wrapper>
      <EnhancedTable response={responses} />
    </Wrapper>
  );
};

export default MentorAcceptedDashboard;
