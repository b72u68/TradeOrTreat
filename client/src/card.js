import * as React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GroupedButtons from "./GroupedButtons";
import OfferModal from "./modal";

const CARD_PROPERTY = {
  borderRadius: 3,
  boxShadow: 0,
};

export default function CandyCard(props) {
  const { name, img } = props;
  const [count, setCount] = React.useState(0)
  const [offer, setOffer] = React.useState("");

  const handleChange = (event) => {
    setOffer(event.target.value);
  };

  return (
    <Card className="card" sx={CARD_PROPERTY} style={{ margin: "10px" }}>
      <CardMedia component="img" height="194" image={img} />
      <CardContent sx={{ p: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component="div"
        >
          {name}
        </Typography>
        <Typography className="info" variant="body1" color="text.secondary">
          Candy is good because it is often bright colors, which are attractive
          to our eyes. Much like birds are drawn to shiny objects.
        </Typography>
      </CardContent>
      <CardActions style={{ display: "inline", width: "100%" }}>
        <FormControl style={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">Candy</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={offer}
            onChange={handleChange}
            label="Offer"
          >
            <MenuItem value="">
              <em>Pick Candy</em>
            </MenuItem>
            <MenuItem value={"Snickers"}>Snickers</MenuItem>
            <MenuItem value={"Twix"}>Twix</MenuItem>
            <MenuItem value={"Kit kat"}>Kit kat</MenuItem>
            <MenuItem value={"Reese's Cups"}>Reese's Cups</MenuItem>
            <MenuItem value={"Skittles"}>Skittles</MenuItem>
            <MenuItem value={"Starburst"}>Starburst</MenuItem>
          </Select>
          <GroupedButtons setCount={setCount}/>
          <OfferModal candy={offer} count={count} />
        </FormControl>
      </CardActions>
    </Card>
  );
}
