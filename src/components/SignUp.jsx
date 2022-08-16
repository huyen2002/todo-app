import { Box, Container } from "@mui/system";
import { Grid, Typography, TextField, Button, inputAdornmentClasses } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";

export const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes:", newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem("loginData", newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};

function SignUp() {
 

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    // alert(result);
    console.log(result);
  };

  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", { // <-- change to /api/login
      method: "POST", // <-- change to POST
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }); 

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" sx={{ mt: 4, mb: 5 }} align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First name"
                autoFocus
                {...register("firstName", {
                  required: "Please enter your first name",
                })}
                error={!!errors?.firstName}
                helperText={errors?.firstName ? errors.firstName.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last name"
                autoFocus
                {...register("lastName", {
                  required: "Please enter your last name",
                })}
                error={!!errors?.lastName}
                helperText={errors?.lastName ? errors.lastName.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Email"
                fullWidth
                autoComplete="email"
                autoFocus
                required
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                type="password"
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                  },
                })}
                error={errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />

              <Typography
                variant="body2"
                color="textSecondary"
                align="left"
                sx={{ mt: 1 }}>
                <ArrowRightIcon />
                Password must be at least 8 characters.
              </Typography>
              <Typography variant="body2" color="textSecondary" align="left">
                <ArrowRightIcon />
                Password must contain at least one uppercase letter, one
                lowercase letter, one number and one special character.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                type="password"
                {...register("confirm_password", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                error={errors?.confirm_password}
                helperText={
                  errors?.confirm_password
                    ? errors.confirm_password.message
                    : null
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            className="submit">
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link to="/sign-in" variant="body2">
                  Sign in
                </Link>
              </Typography>
            </Grid>
          </Grid>

          {loginData ? (
            <Box>
              <Typography variant="h5" component="h1" gutterBottom>
                Welcome {loginData.email}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                You are logged in.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
             
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                  cookiePolicy={"single_host_origin"}
               
              />
            
          )}
        </Box>
      </form>
    </Container>
  );
}
export default SignUp;
