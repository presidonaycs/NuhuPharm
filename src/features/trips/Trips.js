import React, { useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import { MdRefresh, MdOutlineSearch, MdSearch } from "react-icons/md";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import CompanyRiderCard from "common/CompanyRiderCard";
import StatusCard from "common/StatusCard";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCards";
import { AccountCircle } from "@mui/icons-material";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ToDoorSearch from "common/ToDoorSearch";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import ConfigurationCard from "common/ConfigurationCard";

function Configuration(props) {
  const [age, setAge] = React.useState("");
  const [show, setshow] = React.useState();
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };
  const history = useNavigate();

  const redirect = () => {
    history("/complete-signUp");
  };

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
              Configurations
            </Typography>
            <Typography variant="h6" >
              Configure your pharmacy application
            </Typography>
          </div>
          
        </div>
      </div>
      <div>

        <div className="w-full flex justify-between mt-4">

          <StatusCard
            cardTitle="Branding"
            cardLink= {<CreateIcon />}
            numberOfMedicine="Pharmacy ID"
            medicineGroups="Pharmacy Name"
          />
          <StatusCard
            cardTitle="Owner"
            cardLink= {<CreateIcon />}
            numberOfMedicine="Owner ID"
            medicineGroups="Owner Name"
          />
        </div>
        <div style={{maxwidth: "400px"}}>
          <ConfigurationCard 
          style={{maxwidth: 400}}
            firstColumn={"Page"}
            secondColumn={"Action"}
          />
        </div>
       
      </div>

    </div>
  );
}

export default Configuration;
