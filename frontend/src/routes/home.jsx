// External dependencies
import React from "react";
import { Box, Card, CardActionArea, CardContent, Chip } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

// Local dependencies
import PaddedBox from "../components/paddedBox";
import GapStack from "../components/gapStack";
import formatter from "../lib/formatter";

// Helpers
const renderAmount = (amount, colorValue) =>
  formatter
    .format(amount)
    .split(".")
    .map((item, index) => (
      <span style={{ color: index === 1 && colorValue }}>{index === 0 ? item : "." + item}</span>
    ));

export async function loader() {
  const mobile = JSON.parse(localStorage.getItem("mobile"));

  try {
    const {
      data: { success, data },
    } = await axios.post("http://admins-macbook-pro-2.local:8003/hunters/accounts/details", {
      mobile: parseInt(mobile),
    });

    if (success) return data;
    return {};
  } catch (error) {
    return {};
  }
}

const Home = () => {
  const { name, total_amount_to_be_paid, accounts_details: cards } = useLoaderData();
  const navigate = useNavigate();

  const handleClick = (accountId) => {
    navigate(`/account/${accountId}`);
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#3862F8",
          color: "white",
          borderRadius: "40px",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          padding: "16px",
          paddingBottom: "40px",
        }}
      >
        <h1>Welcome, {name}</h1>
        <h1 style={{ marginBottom: 0 }}>
          {renderAmount(total_amount_to_be_paid, "rgba(255, 255, 255, 0.4)")}
        </h1>
        <h5 style={{ margin: 0 }}>Total amount to be paid</h5>
      </Box>
      <PaddedBox>
        <Box>
          <h3>My Loans ({cards.length})</h3>
          <GapStack>
            {cards.map((card) => {
              const { loan_id, amount_remaining, due_date, lending_company, installment_number } =
                card;

              return (
                <Card
                  key={loan_id}
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: "#F1F3FA",
                    boxShadow: "none",
                  }}
                  onClick={() => handleClick(loan_id)}
                >
                  <CardActionArea sx={{ padding: "8px", fontFamily: "DM Sans" }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 style={{ color: "rgba(18, 3, 58, 0.4)", margin: 0 }}>Amount</h2>
                        <Chip
                          sx={{
                            fontWeight: "bold",
                            color: "#0047FF",
                            backgroundColor: "#E1E3FF",
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                          label="Pay Now"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/qr");
                          }}
                        />
                      </Box>
                      <h1 style={{ marginTop: "10px" }}>
                        {renderAmount(amount_remaining, "rgba(18, 3, 58, 0.2)")}
                      </h1>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <h3
                            style={{ color: "rgba(18, 3, 58, 0.4)", margin: 0, marginTop: "16px" }}
                          >
                            Loan ID
                          </h3>
                          <h3 style={{ marginTop: "10px" }}>{loan_id}</h3>
                        </Box>
                        <Box>
                          <h3
                            style={{ color: "rgba(18, 3, 58, 0.4)", margin: 0, marginTop: "16px" }}
                          >
                            Due Date
                          </h3>
                          <h3 style={{ marginTop: "10px" }}>{due_date}</h3>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <h3
                            style={{ color: "rgba(18, 3, 58, 0.4)", margin: 0, marginTop: "16px" }}
                          >
                            Lending Company
                          </h3>
                          <h3 style={{ marginTop: "10px" }}>{lending_company}</h3>
                        </Box>
                        <Box>
                          <h3
                            style={{ color: "rgba(18, 3, 58, 0.4)", margin: 0, marginTop: "16px" }}
                          >
                            EMI Number
                          </h3>
                          <h3 style={{ marginTop: "10px" }}>{installment_number}</h3>
                        </Box>
                      </Box>
                      <h5 style={{ textAlign: "right", color: "rgba(18, 3, 58, 0.4)" }}>
                        Choose your plan here ➔
                      </h5>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </GapStack>
        </Box>
      </PaddedBox>
    </>
  );
};

export default Home;
