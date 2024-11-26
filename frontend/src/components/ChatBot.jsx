import React, { useEffect, useRef, useState } from 'react'
import '../css/ChatBot.css'
import axios from "axios"
import { IoMdSend } from "react-icons/io";
import Loader1 from './Loader1';
const ChatBot = () => {
    const [answer , setAnswer ] = useState('')
    const [showChatBot , setShowChatBot ] = useState(false)
    const [question, setQuestion] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [allquestion, setAllquestion] = useState();

    const chatBotRef = useRef(null);

    const handleDocumentClick = (event) => {
      if (chatBotRef.current && !chatBotRef.current.contains(event.target)) {
        setShowChatBot(false);
      }
    };
  
    useEffect(() => {
      if (showChatBot) {
        document.addEventListener('mousedown', handleDocumentClick);
      } else {
        document.removeEventListener('mousedown', handleDocumentClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleDocumentClick);
      };
    }, [showChatBot]);

    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/question`);
          // console.log(response);
          setAllquestion(response.data.ques);
        } catch (error) {
          console.error('Error fetching questions', error);
        }
      };
  
      fetchQuestions();
    }, []);

    const getpredefAnswer=async(idx)=>{
      try {
        setAnswer(allquestion[idx].answer)
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    }


    const genAnswer =async()=>{
        setIsLoading(true)
        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
               {"contents":[{"parts":[{"text":`${question}`}]}]}
            )
            console.log(response)
            if(response.status==200){
                setAnswer(response.data.candidates[0].content.parts[0].text)
            }
            else{
                setQuestion("")
                setAnswer("Some Error Occurred")
            }

        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleInput =(e)=>{
            setQuestion(e.target.value);
    }

    const toggleComp =()=>{
        setShowChatBot(!showChatBot)
    }

  return (
    <>
    <div style={{zIndex:"1000"}} className='btn6' title='ChatBot'>
        <img src={`https://images.unsplash.com/photo-1684487747720-1ba29cda82f8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} alt="gemini_logo"  className='image4 btn6' onClick={toggleComp}/>
    </div>
    {showChatBot?<div className='floatDiv' ref={chatBotRef}>
        <h3 style={{textAlign:"center",marginBottom:"10px",textDecoration:"underline"}}> <b>Ask Me Anything</b>  </h3>
        <input type="text" placeholder='Write....' className='inp3' onChange={handleInput} value={question} name='question'  onKeyDown={(e)=>e.key==="Enter" ?genAnswer():""}/>  

        <IoMdSend className='icon2' onClick={genAnswer}/>
        <div className='questions'>

           {allquestion.map((elem ,idx)=>{
            return <>
            <p className="ques" onClick={()=>getpredefAnswer(idx)} >{elem.question}</p>
            </>
           }) }
        </div>  
        {isLoading?<Loader1></Loader1>:""}
        <div className='content1'>


            {answer.replace(/\*\*/g, '')}
        </div>
    </div>:""}
        </>
  )
}

export default ChatBot