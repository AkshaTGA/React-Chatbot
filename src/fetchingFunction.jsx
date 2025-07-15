

  export async function getBotResponse(pmpt,setisthinking,deepthinking) {
    let promptt = {
      prompt: pmpt,
      detailedthinking: deepthinking,
    };
    promptt = JSON.stringify(promptt);
    console.log(deepthinking)
    return fetch("https://chatbotserver-gtwj.onrender.com/api/prompt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: promptt,
    })
      .then(async (response) => {
        return await response.json();
      })
      .then(async (res) => {
         return res.message
      })
      .catch((err) => {
        console.log("Something went Wrong:", err);
      })
      .finally(()=>{
        setisthinking(false)
      })
      
  }
