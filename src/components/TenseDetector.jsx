import React from 'react';
import styled from 'styled-components';
import InputSentence from './InputSentence';
import ResultDisplay from './ResultDisplay';

const TenseDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%;
  max-width: 650px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  gap: 1.5rem; /* Kontrol jarak dari sini */
  
  position: relative;
  z-index: 10;
  
  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const TenseDetector = ({ sentence, setSentence, tense, detectTense }) => {
  return (
    <TenseDetectorContainer>
      <InputSentence
        sentence={sentence}
        setSentence={setSentence}
        detectTense={detectTense}
      />
      <ResultDisplay tense={tense} />
    </TenseDetectorContainer>
  );
};

export default TenseDetector;