import { useState, useRef } from 'react'
import {ReactComponent as RedoIcon} from './assets/redo.svg'
import { ReactComponent as StatsIcon } from './assets/stats.svg'
import topicsDB from './assets/topicsDB.json'
import IdeasList from './components/IdeasList'

function App() {
  const [count, setCount] = useState(0)
  const [topic, setTopic] = useState(generateRandomTopic())
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])
  const [statsPage, setStatsPage] = useState(false)
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
      setIdeaList([])
    }, 500);
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

  function toggleStatsPage() {
    setStatsPage(!statsPage)
  }

  function updateIdea(index, idea) {
    setIdeaList(prevList =>
      prevList.map((prevIdea, i) => {
        if (i === index) {
          return idea;
        } else {
          return prevIdea;
        }
      })
    );
  }


  const ideas = ideaList.map((each, index) => { return <div key={each}><div className='my-4 tracking-wide text-gray-700'>{each}</div><div className='border-b'></div></div>})

  const fillWidth = `${((ideaList.length) / 9) * 100}%`;;


  return (
    <div className='w-80 mx-auto my-8'>
      <div className='flex flex-row justify-between items-center'>
        <span className='text-xl font-extrabold  text-gray-700 border-b-4 w-fit'>nineideas</span>
        <div className='flex flex-ro items-center'>
          <RedoIcon onClick={handleRedoIconClick} className={` mx-3 w-5 h-5  ${isAnimating && 'animate-spin'}`} style={{ animationDuration: '500ms' }} />  
          <StatsIcon onClick={toggleStatsPage} className='ml-3 w-7 h-7' />
        </div>
      </div>
      <div className='w-80 my-6  text-lg text-gray-700'> {topic}</div>
      
      {count < 9 &&
        <textarea
          className='w-80 h-20 mb-4 border outline-none'
          value={currentIdea}
          ref={ideaInputRef}
          autoFocus
          onChange={handleIdeaInputChange}
          onKeyDown={checkForSubmit}></textarea>} 
      <div className='w-80 h-3 mb-4 rounded-full border relative'>  
        <div className='absolute left-0 top-0 h-full rounded-full'
        style={{width: fillWidth, background: "linear-gradient(to right, darkgreen, #609d12)"}}></div></div>
        
        {count === 9 ?
          <button
          className='w-80 h-12 border rounded-md bg-sky-900 cursor-default text-white'
          >well done!</button> :
          <button
            className='w-80 h-12 border rounded-md bg-sky-900 active:bg-sky-800 text-white'
            onClick={handleAddIdea}>add idea</button>}
        <div className='mt-4 max-h-72 overflow-y-scroll'>
        <IdeasList ideaList={ideaList} updateIdea={updateIdea} />
        </div>
      
      {statsPage && 
        <div className='absolute top-20 w-80 bg-white border p-2' style={{ height: '550px' }}>
        <div className='relative' style={{ height: '550px' }}>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col items-center'><div className='text-xl font-bold'>6</div><div className='text-sm'>total lists</div></div>
            <div className='flex flex-col items-center'><div className='text-xl font-bold'>2</div><div className='text-sm'>current streak</div></div>
            <div className='flex flex-col items-center'><div className='text-xl font-bold'>3</div><div className='text-sm'>max streak</div></div>
          </div>
          
          <div className='text-sm font-bold mt-7 mb-2'>COMPLETED LISTS</div>
          <div className='max-h-96 overflow-y-auto'>
            <ul className='mx-4 list-disc'>
              <li className='text-sm mb-3'>Ideas for hosting a memorable themed party</li>
              <li className='text-sm mb-3'>Unique ways to display artwork in your home</li>
        
              <li className='text-sm mb-3'>Creative ways to reduce waste in your daily life</li>
              <li className='text-sm mb-3'>Ideas for using technology to improve mental health</li>
              <li className='text-sm mb-3'>Creative ways to teach children about sustainability</li>
              <li className='text-sm mb-3'>Ideas for starting a social impact project in your community</li>
            </ul>
          </div>
      
          <div className='text-gray-600 text-sm w-full text-center absolute bottom-5'>site built by <a href='http://www.josephm.dev' target='_blank' className='underline'>josephm.dev</a></div>
          </div>
          </div>
      }
    </div>
    
  )
}

export default App