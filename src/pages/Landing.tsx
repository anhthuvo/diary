import React, { useEffect, useState } from 'react';
import { EMOTIONS, MONTHS, WEEKDAYS } from '../constant'
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const [emotions, setEmotions] = useState(EMOTIONS)
  const [unclock, setUnclock] = useState(false)

  const selectEmotions = (category: string, index: number) => {
    const newEmotoins = { ...emotions }
    newEmotoins[category][index].selected = !emotions[category][index].selected
    setEmotions(newEmotoins)
    setUnclock(true)
  }

  useEffect(() => {
  }, [])

  return (
    <div className="bg-black">
      <div className="max-w-md bg-white min-h-screen mx-auto relative">
        <div className="container pb-10 pt-6">
          <p className="text-center text-slate-400 mb-6">Today - {getToday()}</p>
          <p className="font-normal text-2xl mb-6">How are you felling today?</p>

          <div className="">
            {
              ['positive', 'negative', 'neutral'].map(state => (
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="rounded-xl text-left flex h-full items-center capitalize">
                    {state}
                  </div>
                  {
                    emotions[state].map((e, i) => (
                      <div
                        key={i}
                        className={`rounded-xl pt-[100%] relative ${e.selected ? "bg-indigo-500 text-white" : "bg-indigo-50 text-slate-400"}`}
                        onClick={() => selectEmotions(state, i)}
                      >
                        <img src={e.icon} className='w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3' />
                        <p className={`absolute bottom-1.5 w-full text-center capitalize font-light text-xs`}>{e.label}</p>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>

          <p className="font-normal text-2xl mb-6 mt-10">Describe your state of mind</p>
          <div
            className='w-full rounded-2xl hover:bg-indigo-50 bg-indigo-50 border-none p-4 font-light'
          >
            Today I'm happy. I'm a little nervous
            about exams, but I try to prepare a little
            bit every day. I'm going to visit Adam
            tomorrow. I'm glad we made up :)
            My basketball coach said I was making
            progress. We're still at odds with Olivia.
            Why is it so hard for us to be together?
            How can I fix this?
          </div>
        </div>
        {unclock ? <div className="fixed bottom-0 left-0 w-full p-4 pt-0 bg-white">
          <Link to="/journaling" className=''>
            <div className="w-full bg-indigo-500 text-white text-center rounded-2xl py-4 text-lg">Go to my diary</div>
          </Link>
        </div> : null
        }
      </div>
    </div>
  );
};

export default Landing;

export const formatDate = (d: Date) => {
  if (!d) return ""
  return ` ${d.getHours()}:${d.getMinutes()} ${WEEKDAYS[d.getDay()]} ${d.getDate()}`
}

const getToday = () => {
  const d = new Date()
  return (
    `${d.getDate()} ${MONTHS[d.getDay()]}`
  )
}