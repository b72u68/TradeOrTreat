import * as React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

const CARD_PROPERTY = {
  borderRadius: 3,
  boxShadow: 0,
};

export default function CandyCard(props) {
  const { name, img } = props;
  return (
    <Card className="card" sx={CARD_PROPERTY}>
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
      <CardActions sx={{ pt: 0, px: 3, pb: 3 }}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
