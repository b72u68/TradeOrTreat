import "./styles.css";
import React, { useState, useEffect } from "react";
import CandyCard from "./card";
import Navbar from "./navbar";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import pump from "../src/Assets/pump.png";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    background: {
      default: "#e7e3e8",
      paper: "#faedf9",
    },
  },
});

export default function App() {
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } =
    useAuth0();

  const [postings, setPostings] = useState([]);

  useEffect(() => {
    async function getPostings() {
      const response = await fetch("http://localhost:5000/posting");

      if (!response.ok) {
        window.alert(`An error occurred: ${response.statusText}`);
        return;
      }

      const postingsRes = await response.json();

      if (!postingsRes) {
        window.alert(`An error occurred: ${response.statusText}`);
        return;
      }

      setPostings(postingsRes);
    }
    getPostings();
    return;
  }, [postings]);

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
            {postings.map((posting) => (
              <Grid key={posting._id} item xs={6}>
                <CandyCard
                  name={posting.offer.name}
                  img={posting.offer.imgSrc}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper>
            <img
              src={pump}
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
              variant="outlined"
            >
              <Typography
                onClick={() => loginWithRedirect()}
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
