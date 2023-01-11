import React, { useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ManageCompanyCard from 'common/ManageCompanyCard'
// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import gigLogo from "images/Ellipse 56.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import ManageCompanyCard from "./ManageCompanyCard";
import { RiArrowLeftSLine } from "react-icons/ri";
import ManageCompaniesTable from "./ManageCompaniesTable";
import NewWallCards from "common/NewWallCards";
import ToDoorSearch from "common/ToDoorSearch";
import { Add } from "@mui/icons-material";

function ManageCompanies(props) {
  const [show, setShow] = useState(false);
  const handleShow = (event) => {
    setShow(!show);
  };
  const history = useNavigate();

  const redirect = () => {
    history("/complete-signUp");
  };

  const top100Films = [
    { label: "Edo State", year: 1994 },
    { label: "Oredo", year: 1972 },
  ];

  const tableArray = [
    {
      image: gigLogo,
      name: "Nickky Samuel jonas  ",
      company: "GIG Logistics",
      Id: "2234456",
      ratings: "4",
    },

    {
      image: gigLogo,
      name: "John jimmy Samuel  ",
      company: "GIG Logistics",
      Id: "2234456",
      ratings: "4",
    },
  ];

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // localStorage.setItem('location', values.location)
      redirect();

      try {
        const data = await loginMuation({ data: values }).unwrap();
        // TODO extra login
        // redirect()
        enqueueSnackbar("Logged in successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(error?.data?.message, "Failed to login", {
          variant: "error",
        });
      }
    },
  });

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }

  return (
    <div>
      <div className="">
        {/* <span className="text-xs mr-1 opacity-50">
          <MdRefresh />
        </span> */}
        <ToDoorSearch />
        <div className="flex justify-between ">
          <div>
            <Typography variant="h4" className="font-bold">
              Inventory
            </Typography>
            <Typography variant="h6" className="font-bold">
              List of Medicine Available For sales
            </Typography>
          </div>
          <div>
            <Button style={{ width: "250px", height: "50px" }} variant="contained" startIcon={<Add />}>
              <Typography variant="h6">
                Add New Item
              </Typography>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <div className="mr-3">
          <WallCards
            mainInfo="Good"
            subInfo="Inventory Status"
            icon={<HealthAndSafetyIcon sx={{ fontSize: "xxx-large" }} />}
            bottom="View Detailed Report"
            color="20"
          />
        </div>
        <div className="mr-3">
          <WallCards
            mainInfo="Good"
            subInfo="Inventory Status"
            icon={<HealthAndSafetyIcon sx={{ fontSize: "xxx-large" }} />}
            bottom="View Detailed Report"
            color="20"
          />
        </div>
        <div className="mr-3">
          <WallCards
            mainInfo="Good"
            subInfo="Inventory Status"
            icon={<HealthAndSafetyIcon sx={{ fontSize: "xxx-large" }} />}
            bottom="View Detailed Report"
            color="20"
          />
        </div>
        
      </div>
    </div>
  );
}

export default ManageCompanies;