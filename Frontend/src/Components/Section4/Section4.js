import React, { useState, useEffect } from "react";
import "./Section4.css";
import { useNavigate } from "react-router-dom";

// Define the questions with different options
const initialQuestions = [
  // Previous questions...
  {
    question: "How comfortable are you expressing your opinions at work?",
    options: ["Very Comfortable", "Comfortable", "Neutral", "Uncomfortable"],
  },
  {
    question: "How safe do you feel in expressing your concerns or dissatisfaction without fear of repercussions?",
    options: ["Very Safe", "Safe", "Somewhat Safe", "Not Safe"],
  },
  {
    question: "How connected do you feel to your colleagues and peers?",
    options: ["Very Connected", "Connected", "Neutral", "Disconnected"],
  },
  {
    question: "How fulfilled do you feel with your teaching's impact on students?",
    options: ["Very Fulfilled", "Fulfilled", "Somewhat Fulfilled", "Not Fulfilled"],
  },
  {
    question: "How much do you feel your work aligns with your personal values?",
    options: ["Completely Aligned", "Aligned", "Somewhat Aligned", "Not Aligned"],
  },
  {
    question: "How often do you feel confident in your abilities and skills as an educator?",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
  {
    question: "How valued do you feel for your unique teaching style and ideas?",
    options: ["Very Valued", "Valued", "Neutral", "Not Valued"],
  },
  {
    question: "How frequently do you participate in team-building activities or staff social events?",
    options: ["Frequently", "Occasionally", "Rarely", "Never"],
  },
  {
    question: "How satisfied are you with the balance between administrative tasks and actual teaching?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "How supported do you feel in balancing your emotional and mental health needs?",
    options: ["Very Supported", "Supported", "Neutral", "Not Supported"],
  },
];

const optionScores = {
  "Very Comfortable": 4,
  "Comfortable": 3,
  "Neutral": 2,
  "Uncomfortable": 1,
  "Very Safe": 4,
  "Safe": 3,
  "Somewhat Safe": 2,
  "Not Safe": 1,
  "Very Connected": 4,
  "Connected": 3,
  "Neutral": 2,
  "Disconnected": 1,
  "Very Fulfilled": 4,
  "Fulfilled": 3,
  "Somewhat Fulfilled": 2,
  "Not Fulfilled": 1,
  "Completely Aligned": 4,
  "Aligned": 3,
  "Somewhat Aligned": 2,
  "Not Aligned": 1,
  "Always": 4,
  "Often": 3,
  "Sometimes": 2,
  "Rarely": 1,
  "Very Valued": 4,
  "Valued": 3,
  "Neutral": 2,
  "Not Valued": 1,
  "Frequently": 4,
  "Occasionally": 3,
  "Rarely": 2,
  "Never": 1,
  "Very Satisfied": 4,
  "Satisfied": 3,
  "Neutral": 2,
  "Dissatisfied": 1,
  "Very Supported": 4,
  "Supported": 3,
  "Neutral": 2,
  "Not Supported": 1,
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Section4 = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(Array(initialQuestions.length).fill(null));
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [description, setDescription] = useState(""); // Add state for description

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...initialQuestions]));
  }, []);

  const handleOptionChange = (e, questionIndex) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = e.target.value;
    setResponses(newResponses);
  };

  const handleNext = () => {
    const totalScore = responses.reduce((score, response) => {
      return score + (response ? optionScores[response] : 0);
    }, 0);

    console.log("Section 3 Total Score:", totalScore); // Debugging
    // Determine description based on the total score
    let descriptionText = "";
    if (totalScore >= 10 && totalScore <= 20) {
      descriptionText = "Your responses indicate that you may be experiencing significant stress or dissatisfaction in your role as a teacher, with areas of improvement needed in your support, work-life balance, and mental resilience.";
    } else if (totalScore > 20 && totalScore <= 30) {
      descriptionText = "Your responses suggest that you experience moderate levels of stress, but there are areas where improvements in support, work-life balance, and self-care can enhance your well-being as a teacher.";
    } else if (totalScore > 30 && totalScore <= 40) {
      descriptionText = "Your responses indicate that you are managing well in your teaching role, with high levels of support, work-life balance, and resilience, although some minor improvements could be beneficial for sustained well-being.";
    }
    setDescription(descriptionText); // Set the description here

    // Retrieve previous scores
    const section1Score = localStorage.getItem("section1Score") || 0;
    const section2Score = localStorage.getItem("section2Score") || 0;
    const section3Score = localStorage.getItem("section3Score") || 0;

    // Save Section 3 score
    localStorage.setItem("section4Score", totalScore);
    localStorage.setItem("section4Description", descriptionText);

    // Navigate to Bar Graph with all scores
    navigate("/Bargraph", {
      state: {
        section1Score: parseInt(section1Score),
        section2Score: parseInt(section2Score),
        section3Score: parseInt(section3Score),
        section4Score: totalScore,
      },
    });
  };

  const allAnswered = responses.every((response) => response !== null);

  return (
    <div className="assessment-container">
      <h1>Professional Growth</h1>
      <form>
        {shuffledQuestions.map((item, index) => (
          <div key={index} className="question-container">
            <p className="question">
              {index + 1}. {item.question}
            </p>
            <div className="options">
              {item.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={(e) => handleOptionChange(e, index)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="navigation-buttons">
          <button type="button" className="next-button" onClick={handleNext} disabled={!allAnswered}>
            Next
          </button>
        </div>
      </form>
      <div className="description">
        {/* Display description text if available */}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default Section4;
