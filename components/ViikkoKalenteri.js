import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";
import ArrowBack from "./ArrowBack";
import ArrowNext from "./ArrowNext";
import { format } from "date-fns";

export default function ViikkoKalenteri() {
  const [varaukset,setVaraukset]= useState([])
  const today = new Date();
  const todayShort = format(new Date(), 'yyyy-MM-dd');
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(today);
  const [days, setDays] = useState([]);
  const ct = format(new Date(),'HH:mm')
  const [currentTime, setCurrentTime] =  useState(ct)
 
  useEffect(()=>{
    axios.get('/api/ajanvaraus').then(response=>{
      setVaraukset(response.data)
    });
    console.log("once");
  }, []);

  useEffect(() => {
    generateWeek(currentWeekStartDate);
    console.log("once per minute")
    const intervalId = setInterval(() => {
      console.log("once per minute")
      setCurrentTime(format(new Date(), 'HH:mm'));
    }, 60000);
    return () => clearInterval(intervalId);
  }, [currentWeekStartDate]);

  function formatVpvm(paiva){
    toString(paiva)
    const formattedPVM= paiva.split('-').reverse().join('.')
    return(formattedPVM)
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, { 
      weekday:'short', 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' });
  }
  function generateWeek(startDate) {
    const generatedDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      generatedDays.push(day);
    }
    setDays(generatedDays)
  }

  function nextWeek() {
    const nextWeekStartDate = new Date(currentWeekStartDate)
    nextWeekStartDate.setDate(currentWeekStartDate.getDate() + 7)
    setCurrentWeekStartDate(nextWeekStartDate)
  }

  function lastWeek() {
    const lastWeekStartDate = new Date(currentWeekStartDate)
    lastWeekStartDate.setDate(currentWeekStartDate.getDate() - 7)
    setCurrentWeekStartDate(lastWeekStartDate)
  }

  return (
    <div>
        <div className="overflow-x-auto bg-themeDark rounded-md border-4 border-themeSlate flex flex-col p-4"> 
        <div>
          <p className="text-center text-white mb-4">Viikon tapahtumat<br/><span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{formatDate(new Date())} klo: {currentTime}</span></p>
        </div>
        <table className="kalenteri">
          <thead>
                <tr>
                {days.map((day, index) => (
                    <th  
                        key={index} 
                        className={` ${day.toDateString() === today.toDateString() ? 'current-day' : ''}`}>
                        {formatDate(day)}
                    </th>
                ))}
                </tr>
          </thead>
          <tbody> 
              <tr> 
                {days.map((day) => (
                  <td className={` ${day.toDateString() === today.toDateString() ? 'current-col' : ''}`} key={day.toLocaleDateString()}>
                    {varaukset
                      .sort((a, b) => a.klo.localeCompare(b.klo))
                      .map((v) => (
                      formatVpvm(v.pvm) === day.toLocaleDateString() ? (
                        <Link className={`${v.klo < currentTime || v.pvm < todayShort ?'kalenteriLinkkiBehind' : 'kalenteriLinkkiAhead'}`}
                              href={'/ajanvaraus/muokkaa/'+v._id}
                              key={v._id} >
                              {v.terapiamuoto} <br/> {v.klo}
                        </Link>
                        ) : ( "" )
                        ))}
                  </td>
                  ))}     
              </tr>
          </tbody>
        </table>
        </div>
       <div className="flex justify-center gap-4 items-center">
          <button onClick={lastWeek} className="vihreä">Edelliset tapahtumat<ArrowBack/></button>
          <button onClick={nextWeek} className="vihreä"><ArrowNext/>Seuraavat tapahtumat</button>
        </div>
    </div>
    );
  }

