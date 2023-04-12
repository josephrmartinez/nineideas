import { useState, useRef, useEffect } from 'react'
import {ReactComponent as RedoIcon} from './assets/redo.svg'
import { ReactComponent as StatsIcon } from './assets/stats.svg'
import topicsDB from './assets/topicsDB.json'
import IdeasList from './components/IdeasList'
import countConsecutiveDates from './utilities/countConsecutiveDates'

function App() {
  const [nineideasUserData, setNineideasUserData] = useState(JSON.parse(localStorage.getItem("nineideas")) || [])
  const [topic, setTopic] = useState(generateRandomTopic())
  const [topicActive, setTopicActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])
  const [statsPage, setStatsPage] = useState(false)
  const ideaInputRef = useRef(null)
  const topicInputRef = useRef(null)
  
  useEffect(() => {
    localStorage.setItem("nineideas", JSON.stringify(nineideasUserData))
    console.log(nineideasUserData);
  }, [nineideasUserData])

  function generateRandomTopic() {
    const topics = topicsDB.topics;
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const topicFinished = nineideasUserData.find(each => each.topic === randomTopic)

    if (topicFinished) {
      return generateRandomTopic();
    } else {
      return randomTopic
    }
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
    setIdeaList(prevIdeas => {
      return [currentIdea, ...prevIdeas]
    })
    setCurrentIdea("")
    ideaInputRef.current.focus()
  }

  useEffect(() => {
  if (ideaList.length === 9) {
    setNineideasUserData(prevData => {
      // Check if an object with the same topic exists
      const index = prevData.findIndex(obj => obj.topic === topic);
      if (index !== -1) {
        // If it exists, update the existing object's ideaList
        const updatedData = [...prevData];
        updatedData[index].ideaList = ideaList;
        return updatedData;
      } else {
        // If it doesn't exist, add a new object to the array
        return [...prevData, { topic: topic, ideaList: ideaList, dateAdded: new Date() }];
      }
    });
  }
}, [ideaList]);

  function checkForSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddIdea()
    }
  }

  function checkForSubmitTopic(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleTopicActive()
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

  function handleClickCompletedList(topic) {
    const topicData = nineideasUserData.find(each => each.topic === topic)
    setTopic(topicData.topic)
    setIdeaList(topicData.ideaList)
    toggleStatsPage()
  }

  function toggleTopicActive() {
    setTopicActive(!topicActive)
    if (topicActive) {
      ideaInputRef.current.focus()
    }
  }

  function handleTopicInputChange(event) {
    setTopic(event.target.value)
  }

  const fillWidth = `${((ideaList.length) / 9) * 100}%`;;

  const completedLists = nineideasUserData.map(each => {
    return (
      <li className='text-sm mb-5 leading-4 cursor-pointer text-gray-700' key={each.topic} onClick={()=>handleClickCompletedList(each.topic)}>{each.topic}</li>
    )
  }).reverse()

  let currentStreak = 0;
  if (nineideasUserData.length > 0) {
    currentStreak = countConsecutiveDates(nineideasUserData)
  }


  return (
    <div className='w-80 mx-auto my-8'>
      <div className='flex flex-row justify-between items-center'>
        <span className='text-xl font-extrabold  text-gray-700 border-b-4 w-fit cursor-default' onClick={ statsPage ? toggleStatsPage : undefined }>nineideas</span>
        <div className='flex flex-ro items-center'>
          <RedoIcon onClick={ statsPage ? toggleStatsPage : handleRedoIconClick } className={` mx-3 w-5 h-5 cursor-pointer  ${isAnimating && 'animate-spin'}`} style={{ animationDuration: '500ms' }} />  
          <StatsIcon onClick={toggleStatsPage} className='ml-3 w-7 h-7 cursor-pointer' style={{stroke: statsPage ? '#ff4400' : '#000000'}} />
        </div>
      </div>

      {topicActive ?
        <textarea
          className='w-80 my-6  text-lg text-gray-700'
          value={topic}
          ref={topicInputRef}
          autoFocus
          onBlur={toggleTopicActive}
          onChange={handleTopicInputChange}
          onKeyDown={checkForSubmitTopic}></textarea>
        : <div
          className='w-80 my-6  text-lg text-gray-700'
          onClick={toggleTopicActive}> {topic}</div>
      }
      
      {ideaList.length < 9 &&
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
        
        {ideaList.length  === 9 ?
          <button
          className='w-80 h-12 border rounded-md bg-sky-900 cursor-default text-white'
          >list completed</button> :
          <button
            className='w-80 h-12 border rounded-md bg-sky-900 active:bg-sky-800 text-white'
          onClick={handleAddIdea}>add idea</button>}
      
        <div className='mt-4 max-h-72 overflow-y-scroll'>
        <IdeasList ideaList={ideaList} updateIdea={updateIdea} />
        </div>
      
      {statsPage && 
        <div className='absolute top-20 w-80 bg-white border p-2' style={{ height: '550px' }}>
        <div className='relative' style={{ height: '550px' }}>
          <div className='flex flex-row justify-around cursor-default'>
              <div className='flex flex-col items-center'><div className='text-xl font-bold'>{nineideasUserData.length}</div><div className='text-sm'>total lists</div></div>
              <div className='flex flex-col items-center'><div className='text-xl font-bold'>{currentStreak}</div><div className='text-sm'>current streak</div></div>
          </div>

            {nineideasUserData.length > 0 ?
              <>
          <div className='text-sm font-bold mt-7 mb-2 ml-4 cursor-default'>COMPLETED LISTS</div>
          <div className='max-h-96 overflow-y-auto'>
            <ul className='mx-4'>
              {completedLists}  
            </ul>
          </div>
              </>
              :
              <div className=' w-full text-center mt-20'>
                <span>Write nine ideas every day.</span>
                
              </div>
              
            }
            

          <div className='text-gray-600 text-sm w-full text-center absolute bottom-5 cursor-default'>site built by <a href='http://www.josephm.dev' target='_blank' className='underline'>josephm.dev</a></div>
          </div>
          </div>
      }
    </div>
    
  )
}

export default App