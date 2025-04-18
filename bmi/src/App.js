import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCalculate = () => {
    if (height > 0 && weight > 0) {
      // Convert height from cm to meters
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) {
        setMessage('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setMessage('Normal weight');
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setMessage('Overweight');
      } else {
        setMessage('Obesity');
      }
    } else {
      alert('Please enter valid height and weight');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Dark Mode Toggle Icon */}
      <div className="mode-toggle-icon" onClick={toggleDarkMode}>
        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </div>

      <div className="bmi-card">
        <h1 className="title">BMI Calculator</h1>

        <div className="input-container">
          <input
            type="number"
            placeholder="Enter Height (in cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Enter Weight (in kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input"
          />
        </div>

        <motion.button
          className="calculate-btn"
          onClick={handleCalculate}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Calculate
        </motion.button>

        {bmi && (
          <div className="result-container">
            <h2>Your BMI: {bmi}</h2>
            <p>{message}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default App;
