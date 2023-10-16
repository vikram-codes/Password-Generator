import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "01234567890";
    if (character) str += '!@#$%^&*()_+={}":>?~`[]';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, copy]);

  let passwordRef = useRef(null);

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopy("Copied");
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 pb-4 my-8 text-orange-500 bg-gray-700 text-center">
        <h1 className="text-white text-center py-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          ></input>
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={handleCopy}
          >
            {copy}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label> Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />{" "}
            <label>Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={character}
              onChange={() => setCharacter((prev) => !prev)}
            />{" "}
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
