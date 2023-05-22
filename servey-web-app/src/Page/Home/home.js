import "survey-core/modern.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Component/LoadingSpinner";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";

export const UserContext = createContext();
function Home() {
  const surveyJson = {
    title: "Mental Health Care-Seeking Survey",
    description:
      " We are conducting a survey to explore the factors that influence people's decision to seek hospital care for mental health issues, and to evaluate a model that can predict the need for care based on certain features. The survey consists of a set of questions that will help us understand the features that are important in predicting the need for care, and your thoughts on the model's accuracy and usefulness. The survey will take approximately 10-15 minutes to complete. Your participation is entirely voluntary, and all responses will be kept strictly confidential. The data collected will only be used for research purposes, and no personally identifiable information will be shared with any third parties. Thank you for considering participating in this survey. Your input will help us develop a model that can better predict the need for care and ultimately improve mental health outcomes",
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "text",
            name: "age",
            title: "What is your age?",
            isRequired: true,
            inputType: "number",
            min: 18,
            max: 100,
            step: 1,
          },
          {
            type: "boolean",
            name: "symptoms",
            title:
              "Do you experience any mental health symptoms such as anxiety, depression, or stress?",
            isRequired: true,
          },
          {
            type: "boolean",
            name: "family_history",
            title: "Do you have a family member with mental health issue?",
            isRequired: true,
          },
          {
            type: "boolean",
            name: "care_options",
            title:
              " Are you aware of the mental health care options available to you?",
            isRequired: true,
          },
          {
            type: "boolean",
            name: "mental_health_consequence",
            title:
              "Have you experienced any negative consequences due to mental health issues, such as loss of job, relationships, or financial difficulties?",
            isRequired: true,
          },
          {
            type: "boolean",
            name: "phys_health_consequence",
            title:
              "Have you think you experienced any negative consequences to your physical well-beingness due to mental health issues, such as weight loss, weight gain?",
            isRequired: true,
          },
          {
            type: "boolean",
            name: "self_employed",
            title:
              " Are you currently employed in a company or are you self-employed?",
            isRequired: true,
          },
          {
            type: "text",
            name: "no_employees",
            title: "How many collages do you have in your work place?",
            isRequired: true,
            inputType: "number",
            min: 0,
            max: 1004,
            step: 1,
          },
          {
            type: "boolean",
            name: "prediction_acceptance",
            title:
              "Given the model predicted that you should visit a mental health care, will you do so?",
          },
          {
            type: "comment",
            name: "comment",
            title:
              "if you agree with the model prediction,  why they think the model is accurate, and if you disagree, Provide your reasons. This will help us understand the reasons behind the model's accuracy or lack thereof and potentially improve the model's performance in the future.",
          },
        ],
      },
    ],
    showPreviewBeforeComplete: "showAnsweredQuestions",
    widthMode: "responsive",
  };
  const survey = new Model(surveyJson);
  const [isPredicting, setIsPredicting] = useState(false);
  const [anonymousId, setAnonymousId] = useState(null);
  const navigate = useNavigate();
  const surveyComplete = useCallback(async (sender, anonymousId) => {
    setIsPredicting(true);

    const db = getFirestore(app);
    const surveyRef = doc(db, "surveyData/" + anonymousId);
    try {
      const responce = await axios.post(
        "http://127.0.0.1:5000/predict",
        sender.data
      );
      setIsPredicting(false);
      localStorage.setItem("predict", JSON.stringify(responce.data));
      const data = {
        ...sender.data,
        ...responce.data,
      };
      await setDoc(surveyRef, data);
      navigate("/predict");
    } catch (error) {
      console.log(error);
      setIsPredicting(false);
      await setDoc(surveyRef, sender.data);
      navigate("/predict");
    }
  }, []);

  useEffect(() => {
    console.log("ana id changing", anonymousId);
  }, [anonymousId]);

  useEffect(() => {
    let rawPrediction = localStorage.getItem("predict");
    if (rawPrediction != null) {
      navigate("/predict");
    } else {
      let anonymous_id = localStorage.getItem("anonymous_id");
      if (anonymous_id != null) {
        setAnonymousId(anonymous_id);
      } else {
        const auth = getAuth(app);
        signInAnonymously(auth).then((userCredential) => {
          setAnonymousId(userCredential.user.uid);
          localStorage.setItem("anonymous_id", userCredential.user.uid);
        });
      }
    }
  }, []);

  survey.onComplete.add((sender) => surveyComplete(sender, anonymousId));
  return (
    <div>
      {isPredicting && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "150px",
              maxHeight: "80vh",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              overflowY: "auto",
            }}
          >
            <LoadingSpinner
              loadingText={"Generating Prediction, Please wait"}
            />
          </div>
        </div>
      )}
      {anonymousId == null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "150px",
              maxHeight: "80vh",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              overflowY: "auto",
            }}
          >
            <LoadingSpinner loadingText={"Please wait"} />
          </div>
        </div>
      )}
      <div aria-disabled={isPredicting}>
        <Survey model={survey} />
      </div>
    </div>
  );
}

export default Home;