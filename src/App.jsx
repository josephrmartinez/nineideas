import { useState, useRef } from 'react'

import {ReactComponent as RedoIcon} from './assets/redo.svg'


import topicsDB from './assets/topicsDB.json'

function App() {
  const [count, setCount] = useState(0)
  const [topic, setTopic] = useState(generateRandomTopic())
  const [addIdeasReady, setAddIdeasReady] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])
  const ideaInputRef = useRef(null)
  


  function generateRandomTopic() {
    const topics = topicsDB.topics;
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    return randomTopic
  }

  function handleRedoIconClick() {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setTopic(generateRandomTopic());
    }, 500);
    
  }

  function handleTopicInputChange(event) {
    setTopic(event.target.value)
  }

  

  function handleIdeaInputChange(event) {
    setCurrentIdea(event.target.value)
  }


  function handleAddIdea() {
    if (!currentIdea) {
      return
    }
    setIdeaList(prevIdeas => {
      return [currentIdea, ...prevIdeas]
    })
    setCurrentIdea("")
    setCount(prevCount => prevCount + 1)
    ideaInputRef.current.focus()
  }

  function checkForSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddIdea()
    }
  }

  const ideas = ideaList.map(each => { return <><div className='my-4 tracking-wide text-gray-700'>{each}</div><div className='border-b-2'></div></>})

  const fillWidth = `${((ideaList.length) / 9) * 100}%`;;

  

  return (
    <div className='w-80 mx-auto my-8'>
      <div className='flex flex-row items-center'>
      <div className='text-xl font-extrabold  text-gray-700 border-b-4 w-fit'>nineideas</div>
      <RedoIcon onClick={handleRedoIconClick} className={` mx-3 w-5 h-5  ${isAnimating && 'animate-spin'}`} style={{animationDuration: '500ms'}} />
      </div>
        <div
          className='w-80 my-2  text-lg text-gray-700'
        >{topic}</div>
        
      
      
      
        <textarea
          className='w-80 h-20 mt-4 mb-4 border outline-none'
          value={currentIdea}
          ref={ideaInputRef}
          autoFocus
          onChange={handleIdeaInputChange}
          onKeyDown={checkForSubmit}></textarea>  
      <div className='w-80 h-3 my-4 rounded-full border relative'>  
        <div className='absolute left-0 top-0 h-full rounded-full'
        style={{width: fillWidth, backgroundColor: "darkgreen"}}></div></div>
        
        {count === 9 ?
          <button
          className='w-80 h-12 border rounded-md bg-sky-900 cursor-default text-white'
          >well done!</button> :
          <button
            className='w-80 h-12 border rounded-md bg-sky-900 active:bg-sky-800 text-white'
            onClick={handleAddIdea}>add idea</button>}
        <div className='mt-4'>
          {ideas}
        </div>
      
    </div>
    
  )
}

export default App
