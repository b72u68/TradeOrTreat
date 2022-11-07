import "./styles.css";
import CandyCard from "./card";
import Navbar from "./navbar";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import pump from "../src/Assets/pump.png";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
    background: {
      default: "#e7e3e8",
      paper: "#faedf9",
    },
  },
});

export default function Home() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [postings, setPostings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posting").then((response) => {
      if (!response.ok) {
        window.alert(`An error occurred: ${response.statusText}`);
        return;
      }
      const postingsRes = response.json();
      if (!postingsRes) {
        window.alert(`An error occurred: ${response.statusText}`);
        return;
      }
      setPostings(postingsRes);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{ backgroundColor: "#fcf7fc", overflow: "auto" }}
      >
        <Navbar style={{ width: "100%" }}></Navbar>
        {/* <h2>Start editing to see some magic happen!</h2> */}
        {isAuthenticated ? (
          <Grid container spacing={6} rowSpacing={2} columns={12}>
            {postings.map(({ offer, want }) => (
              <Grid item xs={6}>
                <CandyCard offer={offer} want={want} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper>
            <img
              src={pump}
              className="pumpkin"
              alt="Pumpkin"
              style={{
                width: 545,
                height: 545,
                opacity: 0.25,
                position: "absolute",
                marginLeft: -275,
              }}
            />
            <Button
              style={{
                position: "absolute",
                marginTop: 250,
                marginLeft: -235,
                fontSize: 50,
                opacity: 1,
              }}
              className="hero-btn"
              variant="outlined"
            >
              <Typography
                onClick={() => {
                  loginWithRedirect();
                }}
                sx={{ fontSize: 50, opacity: 1 }}
              >
                TRADE OR TREAT
              </Typography>
            </Button>
          </Paper>
        )}
      </div>
    </ThemeProvider>
  );
}
