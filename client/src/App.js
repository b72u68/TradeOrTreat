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

const postings = [
  {
    id: 1,
    name: "Kit Kat",
    imgSrc:
      "https://www.germanshop24.com/images/thumbnails/1024/1024/detailed/16/F090001450.jpg",
    amount: 10,
  },
  {
    id: 2,
    name: "Sour Patch",
    imgSrc: "https://m.media-amazon.com/images/I/81SFEy-bzlL.jpg",
    amount: 10,
  },
  {
    id: 3,
    name: "Snickers",
    imgSrc:
      "https://www.snickers.com/cdn-cgi/image/width=472,height=472,f=auto,quality=90/sites/g/files/fnmzdf616/files/migrate-product-files/dryeqrv2efldaaoyceat.png",
    amount: 10,
  },
  {
    id: 4,
    name: "Twix",
    imgSrc:
      "https://www.twix.com/sites/g/files/fnmzdf236/files/migrate-product-files/pm57alsea7mspqhhgfuf.png",
    amount: 10,
  },
  {
    id: 5,
    name: "Reese's Cups",
    imgSrc:
      "https://s7d2.scene7.com/is/image/hersheysassets/0_34000_00440_9_701_44000_136_Item_Front?fmt=png-alpha&hei=908",
    amount: 10,
  },
  {
    id: 6,
    name: "Skittles",
    imgSrc:
      "https://www.skittles.com/sites/g/files/fnmzdf586/files/migrate-product-files/bam8afcev37jvz2mfpnk.png",
    amount: 10,
  },
  {
    id: 7,
    name: "Starburst",
    imgSrc:
      "https://images.heb.com/is/image/HEBGrocery/000121398?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
    amount: 10,
  },
  {
    id: 8,
    name: "Galaxy Chocolate",
    imgSrc:
      "https://cdn.trendhunterstatic.com/thumbs/galaxy-chocolatey-moments.jpeg?auto=webp",
    amount: 10,
  },
];

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
            {postings.map(({ offer, want, location }) => (
              <Grid item xs={6}>
                <CandyCard name={offer.name} img={offer.imgSrc} />
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
