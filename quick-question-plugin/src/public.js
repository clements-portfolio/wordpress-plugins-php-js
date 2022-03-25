import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './public.scss';

const quickQuestionBlocks = document.querySelectorAll(".questionOutput");

quickQuestionBlocks.forEach(function(div) {
  const publicData = JSON.parse(div.querySelector("pre").innerHTML);
  
  ReactDOM.render(<BuildQuiz {...publicData} />, div);
  div.classList.remove('questionOutput');
});

function BuildQuiz(props) {
  const [ verified, setVerified ] = useState(undefined);
  const [ verifyDelay, setVerifyDelay ] = useState(undefined)

  useEffect(() => {
    if (verified === false) {
      setTimeout(() => {
        setVerified(undefined);
      }, 2500);
    }

    if (verified === true) {
      setTimeout(() => {
        setVerifyDelay(true);
      }, 1000);
    }
  }, [verified]);
  
  function checkInput(index) {
    if (index == props.correct) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }

  return (
    <div className="qqPublic" style={{ backgroundColor: props.background, textAlign: props.alignment }}>
      {props.question}
      <ul>
        {props.answers.map(function(answer, index) {
          return (
            <li className={(verifyDelay == true && index == props.correct ? 'no-click' : "") + (verifyDelay == true && index != props.correct ? 'fade-incorrect' : "")} onClick={verified == true ? undefined : () => checkInput(index)}>
              { verifyDelay == true && index == props.correct && (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              )}

              { verifyDelay == true && index != props.correct && (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              )}
              {answer}
            </li>
          );
        })}
      </ul>
      <div class={"correct-message" + (verified === true ? " correct-message--visible" : "")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-emoji-sunglasses" viewBox="0 0 16 16">
          <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"/>
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/>
        </svg>  
        <p>Correct!</p>
      </div>
      <div class={"incorrect-message" + (verified === false ? " correct-message--visible" : "")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-emoji-neutral" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"/>
        </svg>
        <p>Not Quite. Please Try Again.</p>
      </div>
    </div>
  )
}