import "./styles.css";
import CandyCard from "./card";
import Navbar from "./navbar";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import pump from "../src/Assets/pump.png"

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

const candies = [
  {
    id: 1,
    name1: "Kit Kat",
    img1: "https://www.germanshop24.com/images/thumbnails/1024/1024/detailed/16/F090001450.jpg",
    name2: "Sour Patch",
    img2: "https://m.media-amazon.com/images/I/81SFEy-bzlL.jpg",
  },
  {
    id: 2,
    name1: "Sour Patch",
    img1: "https://m.media-amazon.com/images/I/81SFEy-bzlL.jpg",
    name2: "Kit Kat",
    img2: "https://www.germanshop24.com/images/thumbnails/1024/1024/detailed/16/F090001450.jpg",
  },
];

export default function App() {
  const { loginWithRedirect,logout,user ,isLoading,isAuthenticated} = useAuth0();

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{ backgroundColor: "#fcf7fc", overflow: "auto" }}
      >
        <Navbar style={{ width: "100%" }}></Navbar>
        {/* <h2>Start editing to see some magic happen!</h2> */}
        {isAuthenticated?(
          
        <Grid container spacing={6} rowSpacing={2} columns={12}>
          {candies.map(({ name1, name2, img1, img2 }) => (
            <Grid item xs={6}>
              <CandyCard name={name1} img={img1} />
              <CandyCard name={name2} img={img2} />
            </Grid>
          ))}
        </Grid>
        )
          :
          
          <Paper>
            <img src ={pump} style={{width:545,height:545,opacity:0.25,position:"absolute",marginLeft:-275}}/>
            <Button style={{position:"absolute",marginTop:250,marginLeft:-235,fontSize:50,opacity:1}} variant="outlined">
            <Typography   onClick={() => loginWithRedirect()} sx ={{fontSize:50,opacity:1}}>
              TRADE OR TREAT
            </Typography>
            </Button>
          </Paper>
          
          
          
          
          
          }
      </div>
    </ThemeProvider>
  );
}
