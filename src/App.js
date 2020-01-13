import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [left, setLeft] = useState('123456qwertyasdfghzxcvb!#%&');
  const [right, setRight] = useState('7890uiopjklnm=?_');
  const [rawPassword, setRawPassword] = useState('');
  const [processedPassword, setProcessedPassword] = useState('Try it.');
  const [passwordLength, setPasswordLength] = useState(24);
  const [testResult, setTestResult] = useState("");
  const randomLetter = (arr) => {
     return arr[Math.floor(Math.random() * arr.length)]
  }
  const generatePassword = () => {
    let result = [];
    while (passwordLength > result.length) {
      result.push(<div className={"l-" + result.length}>{randomLetter(left)}</div>);
      result.push(<div className={"l-" + result.length}>{randomLetter(right)}</div>);
    }
    setProcessedPassword(result)
    setTestResult("")
  };
  useEffect(() => {
      if (testResult === undefined) {return}
      console.log(testResult, testResult.length);
      const len = Math.min(testResult.length, processedPassword.length) -1;
      const lastChar = testResult[len];
      let dom = document.querySelector(".l-" + len);
      if (!dom) {return}

      dom.classList.remove("incorrect");
      dom.classList.remove("correct");
      if (dom.innerHTML == lastChar) {
        dom.classList.add("correct");
      } else {
        dom.classList.add("incorrect");
      }
  }, [testResult])

  const handleChangeL = event => {setLeft(event.target.value); generatePassword()};
  const handleChangeR = event => {setRight(event.target.value); generatePassword()};
  const handleChangeRange = event => {setPasswordLength(event.target.value); generatePassword()};
  const handleChangeTest = event => {setTestResult(event.target.value)};
  return (
    <div className={"wrapper"}>
      <div className={"h2"}>{processedPassword}</div>
      <br />
      <Input value={left} onChangeInput={handleChangeL}>
        Left sample:
      </Input>
      <br />
      <Input value={right} onChangeInput={handleChangeR}>
        Right sample:
      </Input>
      <br />
      <Input type={"range"} value={passwordLength} onChangeInput={handleChangeRange}>
        {"Password length (" + passwordLength + "):"}
      </Input>
      <br />
      <button onClick={generatePassword}>
        Generate
      </button>
      <br />
      <Input value={testResult} onChangeInput={handleChangeTest}>
        Try to type it:
      </Input>
      <br />
    </div>
  );
};
const Input = ({ type = "text", value, onChangeInput, children }) => (
  <label>
    {children}
    <input type={type} value={value} onChange={onChangeInput} />
  </label>
);
export default App;
