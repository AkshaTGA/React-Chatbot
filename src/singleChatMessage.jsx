import style from "./App.module.css"
import Markdown from 'react-markdown'



export function SingleChatMessage({message}){





    return (<div className={style.singlemessagemain} role={message.role}>
        <div className={style.messagecontainer}role={message.role}>
           
                <Markdown>{message.Message}</Markdown>
        </div>
        </div>

    )
}