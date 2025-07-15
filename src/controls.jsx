import TextareaAutosize from 'react-textarea-autosize';
import { useState, useRef,useEffect } from "react";
import style from "./App.module.css";

export function Controls({ send = null, prompt = null, isthinking = false,scrollintoview,setdeepthinking ,deepthinking,error}) {
  const button = useRef(null);
  const [pmt, setpmt] = useState("");
  const [background, setbackground] = useState(`linear-gradient(white, white) padding-box,linear-gradient(135deg,rgb(71, 70, 70),rgb(208, 206, 206),rgb(61, 61, 61)) border-box`);

  function keypressed(key) {
    if (key.key == "Enter" && key.shiftKey == false) {
      button.current.click();
    }
  }
  
function deepthinkingbutton() {
  setdeepthinking(prev => !prev);
}


useEffect(() => {
  // console.log(deepthinking)
  setbackground(
    deepthinking
      ? `linear-gradient(white, white) padding-box, linear-gradient(135deg, #007bff, #ff10fb, #ff042a) border-box`
      : `linear-gradient(white, white) padding-box, linear-gradient(135deg, rgb(71, 70, 70), rgb(208, 206, 206), rgb(61, 61, 61)) border-box`
  );
}, [deepthinking]);


  return (
    <div className={style.Controls}>
      <div className={style.controlsmain}>




        <TextareaAutosize
          type="text"
          ref={prompt}
          disabled={isthinking||error}
          onKeyDown={keypressed}
          onChange={() => {
            return setpmt(prompt.current.value);
          }}
          autoFocus
          maxRows={6}
          value={pmt}
          className={style.textbox}
          name="Textbox"
          placeholder="Enter Prompt"
        />
        <button className={style.deepthinking} disabled={isthinking||error} onClick={deepthinkingbutton}
        style={{background:background }}>Deep Thinking</button>
        <button
          className={style.sendbutton}
          disabled={isthinking||error}
          ref={button}
          onClick={() => {
            setpmt("");
            send();
            setTimeout(()=>scrollintoview(),50)
          }}
        >
          <img src="/send.png" alt="" className={style.sendbuttonimage} />
        </button>
      </div>
    </div>
  );
}
