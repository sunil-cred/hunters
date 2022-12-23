// External dependencies
import React from "react";
import CarouselWidget from "react-material-ui-carousel";
import { Box } from "@mui/material";

// Local dependencies
import CenterBox from "../components/centerBox";
import first from "../asset/1.jpg";
import second from "../asset/2.jpg";
import third from "../asset/3.jpg";
import ContainedButton from "../components/containedButton";
import { Link } from "react-router-dom";
import GapStack from "../components/gapStack";

const Carousel = () => {
  return (
    <CenterBox>
      <GapStack>
        <CarouselWidget>
          <Box sx={{ textAlign: "center" }}>
            <img height="400px" style={{ objectFit: "cover" }} src={first} />
            <h3>Go easy with ReFin</h3>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img height="400px" style={{ objectFit: "cover" }} src={third} />

            <h3>Refinance your debt in few clicks</h3>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img height="400px" style={{ objectFit: "cover" }} src={second} />
            <h3>Worried about your repayment due dates? We got your back.</h3>
          </Box>
        </CarouselWidget>
        <ContainedButton sx={{ marginTop: "30px" }} component={Link} to="/login">
          Login
        </ContainedButton>
      </GapStack>
    </CenterBox>
  );
};

export default Carousel;
