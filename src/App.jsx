import { useState, useRef } from "react";
import style from "./App.module.css";
import { Chat } from "./Chat";
import { Controls } from "./controls";
import { getBotResponse } from "./fetchingFunction";


function App() {
  const [messages, setmessages] = useState([]);
  const [isthinking, setisthinking] = useState(false);
  const [error, seterror] = useState(false);

    const [deepthinking, setdeepthinking] = useState(false);

  const dummydiv = useRef(null);
  const prompt = useRef(null);

  function addtolist(role, pmpt) {
    setmessages((previousmessages) => {
      return [...previousmessages, { role: role, Message: pmpt }];
    });
  }

  function scrollintoview() {
    dummydiv?.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  async function send() {
    setisthinking(true);
    let pmpt = prompt.current.value;
    if (pmpt === "") {
      return alert("Please enter a valid prompt");
    }
   
    addtolist("User", pmpt);
    let response=await getBotResponse(pmpt,setisthinking,deepthinking)
    if(response===undefined){
       setTimeout(()=>{
        addtolist("System","Sorry we couldn't process your request. Please try again later.");
      seterror(true)
       setTimeout(() => {
      
      scrollintoview()
    }, 100);
      },2000)
      return;
    }
    addtolist("Assistant",response);
    setTimeout(() => {
      
      scrollintoview()
    }, 100);
  }



  return (
    <div className={style.App}>
      <div className={style.header}>
        <img className={style.logo} src="/chatbot.png" alt="" />
        <h1 className={style.title}>AI Chatbot</h1>
      </div>
      <div className={style.chatcontainer}>
        <Chat messages={messages} />
        {isthinking&&<div className={style.loading}>
       <div className={style.loader}>{deepthinking?"Deep Thinking...":"Thinking..."}</div>
        </div>}
        <div ref={dummydiv}></div>
      </div>
      <Controls
        isthinking={isthinking}
        send={send}
        scrollintoview={scrollintoview}
        prompt={prompt}
        setdeepthinking={setdeepthinking}
        deepthinking={deepthinking}
        error={error}
      />
    </div>
  );
}

export default App;
