import { SingleChatMessage } from "./singleChatMessage";
export function Chat({messages}) {


const Welcomemessage= {
    role:"Assistant",
    Message:"Hi there, How can I help you today?"
  }

  return (
   
    <>{
      [Welcomemessage,...messages].map((message, index) => {
        return <SingleChatMessage key={index} message={message} />;
      })
      }
    </>
      
  );
}
