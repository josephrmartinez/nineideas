import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [topic, setTopic] = useState("")
  const [addIdeasReady, setAddIdeasReady] = useState(false)
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])
  const ideaInputRef = useRef(null)
  

  function handleTopicInputChange(event) {
    setTopic(event.target.value)
  }

  
  function checkInput() {
    if (topic) {
      setAddIdeasReady(true)
    } else {setAddIdeasReady(false)}
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

  const ideas = ideaList.map(each => { return <div className='my-4 border-b'>{each}</div>})

  const fillWidth = `${((ideaList.length) / 9) * 100}%`;;

  
  return (
    <div className='w-80 mx-auto my-8'>
      
      <div className='text-lg font-extrabold'>nine ideas for:</div>
      <div>
        <input
          className='w-80 my-2 border-b-4 text-lg focus:border-green-700 outline-none'
          autoFocus
          value={topic}
          onChange={handleTopicInputChange}
          onBlur={checkInput}
        ></input>
      </div>
      {addIdeasReady && 
      <>
        <textarea
          className='w-80 h-28 mt-4 mb-4 border'
          value={currentIdea}
           ref={ideaInputRef}
          onChange={handleIdeaInputChange}></textarea>  
      <div className='w-80 h-6 my-4 rounded-full border relative'>  
        <div className='absolute left-0 top-0 h-full rounded-full'
        style={{width: fillWidth, backgroundColor: "darkgreen"}}></div></div>
        
        {count === 9 ?
          <button
          className='w-80 h-12 border rounded-md bg-sky-900 cursor-default text-white'
          >well done!</button> :
          <button
            className='w-80 h-12 border rounded-md bg-sky-900 active:bg-sky-800 text-white'
            onClick={handleAddIdea}>add idea</button>}
        <div>
          {ideas}
        </div>
      </>
        
      }
    </div>
    
  )
}

export default App
