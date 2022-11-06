import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const QRcode = require("qrcode");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OfferModal(props) {
  const data = props;
  const [open, setOpen] = React.useState(false);
  const [svg, setSvg] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, candy } = props;
  var temp = document.createElement("div");
  var t2 = temp.firstChild;
  //console.log(props)
  const handleGenerate = () => {
    var hiddenInfo = {
      Date: new Date(),
      Generated_ID: 123,
      Candy: candy,
      Amount: props.count,
      Buyer: user.name,
    };
    hiddenInfo = JSON.stringify(hiddenInfo);
    var encrypt = btoa(hiddenInfo);
    console.log(encrypt);
    console.log("Time to decrypt!");
    var decrypted_string = atob(encrypt);
    // console.log(JSON.parse(encrypt));
    QRcode.toDataURL("http://localhost:3000/thanks", function (err, url) {
      console.log(url);
      setSvg(url);
    });

    console.log("Candy sold: " + JSON.parse(decrypted_string).Amount);
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        className="buy-btn"
        size="small"
        style={{ marginTop: "5px" }}
      >
        Offer
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Order Summary
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Here is your offer summary!
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Candy</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {props.candy}
                    </TableCell>
                    <TableCell align="right">{props.count}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              sx={{
                display: "block",
                margin: "auto",
                padding: "10px",
              }}
              onClick={handleGenerate}
            >
              Generate QR
            </Button>
            <img src={svg} alt="QR CODE" />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
