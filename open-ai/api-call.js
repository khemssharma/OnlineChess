const getMoveExplanation = async (fen, move) => {
    const response = await fetch('http://localhost:3000/explain-move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fen, move }),
    });
  
    const data = await response.json();
    return data.explanation;
  };
  