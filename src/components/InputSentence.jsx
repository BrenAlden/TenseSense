import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 0; /* Hapus margin agar tidak bertumpuk */
`;

const InputTextArea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 1.5rem;
  font-size: 1.2rem;
  color: #394867;
  border: 1px solid #ced4da;
  border-radius: 8px;
  resize: none;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  box-sizing: border-box;

  text-align: left;

  &:focus {
    outline: none;
    border-color: #48a9a6;
    box-shadow: 0 0 0 2px rgba(72, 169, 166, 0.3);
  }

  &::placeholder {
    color: #adb5bd;
    text-align: center;
    line-height: 1.5;
  }
`;

const DetectButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #48a9a6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3b8e8b;
  }

  &:active {
    background-color: #327572;
  }
`;

const InputSentence = ({ sentence, setSentence, detectTense }) => {
  const handleInputChange = (e) => {
    setSentence(e.target.value);
  };

  const handleDetectClick = () => {
    detectTense(sentence);
  };

  return (
    <InputContainer>
      <InputTextArea
        placeholder="Type the sentence here..."
        value={sentence}
        onChange={handleInputChange}
      />
      <DetectButton onClick={handleDetectClick}>
        Detect Tense
      </DetectButton>
    </InputContainer>
  );
};

export default InputSentence;