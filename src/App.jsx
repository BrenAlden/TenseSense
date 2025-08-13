import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TenseDetector from './components/TenseDetector';
import Squares from './components/Square';
import TenseSenseLogo from './assets/TenseSense.png'; 

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #212133;
    color: #e0e0e0; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative; 
    overflow: hidden;
  }

  #root {
    width: 100%;
    max-width: 800px;
    padding: 2rem 1rem;
    box-sizing: border-box;
    position: relative; 
    z-index: 10; 
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; 
  z-index: 20;
  width: 100%;
`;

const StyledLogo = styled.img`
  max-width: 250px;
  height: auto;
  margin-bottom: 2rem;
`;

const HeaderPlaceholder = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
`;

function App() {
  const [sentence, setSentence] = useState('');
  const [tense, setTense] = useState('');

  const detectTense = async (text) => {
    if (!text.trim()) {
      setTense('Silakan masukkan kalimat');
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/detect-tense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: text }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendeteksi tense dari backend.');
      }

      const data = await response.json();
      setTense(data.tense);
    } catch (error) {
      setTense(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundOverlay>
        <Squares
          borderColor="#555"
          speed={0.5}
          squareSize={25}
        />
      </BackgroundOverlay>
      <MainContentWrapper>
        {/* Mengganti h1 dengan StyledLogo */}
        <StyledLogo src={TenseSenseLogo} alt="TenseSense Logo" />
        <TenseDetector
          sentence={sentence}
          setSentence={setSentence}
          tense={tense}
          detectTense={detectTense}
        />
      </MainContentWrapper>
    </>
  );
}

export default App;