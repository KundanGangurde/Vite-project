import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Button,
  Typography,
  Box,
  TextField,
  useTheme,
} from "@mui/material";

const steps = ["Personal Information", "Address Information", "Confirmation"];

const Form = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveStep(newValue);
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      alert("Form submitted: " + JSON.stringify(formData, null, 2));
      setActiveStep(0);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    switch (activeStep) {
      case 0:
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email format is invalid";
        }
        if (!formData.phone) newErrors.phone = "Phone is required";
        else if (!/^\d+$/.test(formData.phone))
          newErrors.phone = "Please enter a valid phone number";
        break;
      case 1:
        if (!formData.address1)
          newErrors.address1 = "Address Line 1 is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zip) newErrors.zip = "Zip Code is required";
        else if (!/^\d+$/.test(formData.zip))
          newErrors.zip = "Please enter a valid zip code";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Address Line 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              error={!!errors.address1}
              helperText={errors.address1}
            />
            <TextField
              label="Address Line 2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            />
            <TextField
              label="Zip Code"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              error={!!errors.zip}
              helperText={errors.zip}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography>Name: {formData.name}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Phone: {formData.phone}</Typography>
            <Typography>Address Line 1: {formData.address1}</Typography>
            <Typography>Address Line 2: {formData.address2}</Typography>
            <Typography>City: {formData.city}</Typography>
            <Typography>State: {formData.state}</Typography>
            <Typography>Zip Code: {formData.zip}</Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container
      sx={{
        maxWidth: "md",
        padding: 2,
        margin: "40px auto",
        [theme.breakpoints.down("sm")]: {
          padding: 1,
          margin: "20px auto",
        },
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeStep}
          onChange={handleTabChange}
          aria-label="form tabs"
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexWrap: "wrap",
            },
          }}
        >
          {steps.map((label, index) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>

      <Box>
        {steps.map((step, index) => (
          <TabPanel value={activeStep} index={index} key={step}>
            {renderStepContent(index)}
          </TabPanel>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.8rem",
            },
          }}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Form;
