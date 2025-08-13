import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 0; /* Hapus margin agar tidak bertumpuk */
`;

const ResultHeading = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 0; 
  padding-bottom: 0.5rem;
`;

const TenseResult = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #48a9a6;
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  margin: 0;
`;

const ResultDisplay = ({ tense }) => {
  return (
    <ResultContainer>
      <ResultHeading>Result:</ResultHeading>
      {tense ? (
        <TenseResult>{tense}</TenseResult>
      ) : (
        <TenseResult>No Result</TenseResult>
      )}
    </ResultContainer>
  );
};

export default ResultDisplay;