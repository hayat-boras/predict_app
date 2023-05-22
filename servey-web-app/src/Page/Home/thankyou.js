import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import LoadingSpinner from "../../Component/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";

const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ThankYouHeading = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Emoji = styled(motion.span)`
  font-size: 5rem;
`;

const ThankYouMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const ResultCard = styled.div`
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  margin-top: 2rem;
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ResultText = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ThankYouPage = ({ predict }) => {
  console.log("props", predict);
  const [prediction, setPrediction] = useState(null);
  useEffect(() => {
    let rawPrediction = localStorage.getItem("predict");
    rawPrediction = JSON.parse(rawPrediction);
    if (rawPrediction != null) {
      const notification =
        rawPrediction["predict"] === "Yes"
          ? `The model predict you should see medical care, with accuracy of ${Number(
              rawPrediction["Yes"] * 100
            ).toFixed(3)}`
          : `The model predict you do not need a medical care right now, with accuracy of ${Number(
              rawPrediction["No"] * 100
            ).toFixed(3)}`;
      toast(notification, {});
      setPrediction(notification);
    } else {
      const notification =
        "We are gratefully that you participated on the survey!";
      toast(notification, {});
      setPrediction(notification);
    }
  }, []);

  return prediction ? (
    <>
      <ThankYouContainer>
        <ThankYouHeading>Thank You!</ThankYouHeading>
        <EmojiContainer>
          <Emoji
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaCheckCircle />
          </Emoji>
        </EmojiContainer>
        <ThankYouMessage>Your survey has been submitted.</ThankYouMessage>

        <ResultCard>
          <ResultTitle>Prediction Result:</ResultTitle>
          <ResultText>{prediction}</ResultText>
        </ResultCard>
      </ThankYouContainer>
      <ToastContainer autoClose={false} closeButton={true} />
    </>
  ) : (
    <div
      style={{
        alignContent: "center",
        display: "flex",
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <LoadingSpinner />
      <ToastContainer autoClose={false} closeButton={true} />
    </div>
  );
};

export default ThankYouPage;
