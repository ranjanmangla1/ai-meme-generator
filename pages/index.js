import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

function Header() {
  return (
      <header className="header">
          <img 
              src="/troll.png" 
              className="header--image"
              alt=""
          />
          <h2 className="header--title">Meme Generator</h2>
      </header>
  )
}

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling Bard...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("Bard replied...", output)

  setApiOutput(`${output}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <>
     <Header />
      {/* <div className='container'> */}
      <div className="form">
        <textarea
            className="form--input"
            placeholder="Enter a situation and get AI generated memes"
            value={userInput}
            onChange={onUserChangedText}
        />
        <button 
          className="form--button"
          onClick={callGenerateEndpoint}
        >
          Get a new meme image 🖼
        </button>
      </div>
      {/* </div> */}

          {
              apiOutput ? 
                (
                  <div className="meme">
                    <img src={apiOutput} alt="meme" className="meme--image" />
                </div>
                )
              
              : (
                  <div className="meme">
                    <img src="https://i.imgflip.com/7lw7r3.jpg" alt="meme" className="meme--image" />
                </div>
                )
          }
        
      {/* </div> */}
    </>
  );
};

export default Home;




