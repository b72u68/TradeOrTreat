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
import { useAuth0 } from "@auth0/auth0-react";
const CARD_PROPERTY = {
  borderRadius: 3,
  boxShadow: 0,
};

export default function CandyCard(props) {
  const { offer, want, buyer, seller } = props;
  const [count, setCount] = React.useState(0);
  const [deal, setDeal] = React.useState(want.length ? want[0] : "");

  const handleChange = (event) => {
    setDeal(event.target.value);
  };
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } =
    useAuth0();
  return (
    <Card className="card" sx={CARD_PROPERTY} style={{ margin: "10px" }}>
      <CardMedia component="img" height="194" image={offer.imgSrc} />
      <CardContent sx={{ p: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component="div"
        >
          {offer.name}
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
            value={deal}
            onChange={handleChange}
            label="Offer"
          >
            {want.map((candy, k) => (
              <MenuItem key={k} value={candy}>
                {candy}
              </MenuItem>
            ))}
          </Select>
          <GroupedButtons setCount={setCount} />
          <OfferModal candy={deal} user={user} count={count} />
        </FormControl>
      </CardActions>
    </Card>
  );
}
