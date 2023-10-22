import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowBack from "./ArrowBack";
import ArrowNext from "./ArrowNext";

export default function ViikkoKalenteri() {
  const [varaukset,setVaraukset]= useState([])
  const today = new Date();
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date(today));
  const [days, setDays] = useState([]);
  
  useEffect(()=>{
    axios.get('/api/ajanvaraus').then(response=>{
      setVaraukset(response.data)
      generateWeek(currentWeekStartDate);
    });

    console.log("once");
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
        <div>
          <p className="text-center mb-4">Tänään on  <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{formatDate(new Date())}</span> Tässä viikon tapahtumat</p>
        </div>
        <table className="kalenteri w-full">
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
                        <Link className="kalenteriLinkki" 
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
       <div className="flex justify-center gap-4">
          <button onClick={lastWeek} className="vihreä"><ArrowBack/></button>
          <button onClick={nextWeek} className="vihreä"><ArrowNext/></button>
        </div>
        
    </div>
    );
  }

