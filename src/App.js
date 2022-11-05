import "./styles.css";
import CandyCard from "./card";
import Navbar from "./navbar";
import { Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{ backgroundColor: "#fcf7fc", overflow: "auto" }}
      >
        <Navbar style={{ width: "100%" }}></Navbar>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Grid container spacing={6} rowSpacing={2} columns={12}>
          {candies.map(({ name1, name2, img1, img2 }) => (
            <Grid item xs={6}>
              <CandyCard name={name1} img={img1} />
              <CandyCard name={name2} img={img2} />
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  );
}
