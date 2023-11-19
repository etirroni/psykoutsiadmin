import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function YhteenvedotSivu(){
    const [palvelut,setPalvelut]= useState([])
    const [varaukset,setVaraukset]= useState([])
    const [asiakkaat,setAsiakkaat]= useState([])
    const [asiakasValinta, setAsiakasValinta]= useState("")
    const [palveluEhto, setPalveluEhto]= useState("")
    const [minPvmEhto, setMinPvmEhto]= useState("")
    const [maxPvmEhto, setMaxPvmEhto]= useState("")
    const [hakuEhdot, setHakuEhdot]= useState({})
    const [yhteenveto, setYhteenveto]=useState(varaukset)
    
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
        axios.get('/api/ajanvaraus').then(response=>{
            setVaraukset(response.data)
            setYhteenveto(response.data)
        })
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
        })
        console.log("once")
    },[])

  


    function muodostaHakuehdot(hakuEhto){
        const updatedHakuEhdot = { ...hakuEhdot };
        /*---------PALVELU--------*/ 
        if (hakuEhto.category==='Palvelu'){
            if (updatedHakuEhdot.hasOwnProperty(hakuEhto.category)){
                if (!updatedHakuEhdot[hakuEhto.category].includes(hakuEhto.value)) {
                    updatedHakuEhdot[hakuEhto.category].push(hakuEhto.value);
                }else{
                    return
                }
            }else{
                updatedHakuEhdot[hakuEhto.category] = [hakuEhto.value];
            }
            setHakuEhdot(updatedHakuEhdot)
        }
        /*---------------PVM------------*/ 
        if (hakuEhto.category==='Pvm'){
            if(updatedHakuEhdot.hasOwnProperty(hakuEhto.categroy)){
                updatedHakuEhdot[value]=(hakuEhto.value)
            }else{
                updatedHakuEhdot[hakuEhto.category] = [hakuEhto.value];
            }
            setHakuEhdot(updatedHakuEhdot)
        }
        
        if (hakuEhto.category==='Delete'){
            setHakuEhdot({})
        }   
    }
    const handleMinPvmChange = (e) => {
        const newMinPvm = e.target.value;
        // Add validation logic to check if maxPvmEhto is greater or equal to newMinPvm
        if (maxPvmEhto >= newMinPvm || maxPvmEhto === '') {
          setMinPvmEhto(newMinPvm);
        }
        else{
            setMaxPvmEhto(newMinPvm);
            setMinPvmEhto(newMinPvm);   
        }
      };
    
    const handleMaxPvmChange = (e) => {
        const newMaxPvm = e.target.value;
        if (newMaxPvm >= minPvmEhto || minPvmEhto === '') {
          setMaxPvmEhto(newMaxPvm);
        }
        else{
            setMaxPvmEhto(newMaxPvm);
            setMinPvmEhto(newMaxPvm);
        }
      };

    function hakuEhdoilla(e){
        setAsiakasValinta(e)
        let specificVaraus = varaukset.filter((varaus) => varaus.asiakas === e);
        if (e===""){
            setYhteenveto(varaukset)
        }
        else{
        if (!palveluEhto){
                specificVaraus = varaukset.filter((varaus) => varaus.asiakas === e);
                setYhteenveto(specificVaraus)
            }
        specificVaraus=specificVaraus.filter((sVaraus)=>sVaraus.terapiamuoto === palveluEhto);
        setYhteenveto(specificVaraus)
        }
        
      }

    return(
        <Layout>
            <h1 className="text-center">Laadi yhteenvetoja täällä</h1>
            <p className="text-center">Täällä voit hakea asiakkaan perusteella yhteenvetoja eri hakuehdoilla</p>
            <div>
                <div className="bg-gray-200 flex p-4 rounded-md shadow-md shadow-themeSlate">
                    <div className="flex-1">
                        <div>
                            <p>Valitse seurattava asiakas</p>
                            <select 
                                    value={asiakasValinta} 
                                    onChange={(e) => hakuEhdoilla(e.target.value)}>
                                <option 
                                    value={""}>
                                    Kaikki
                                </option>
                                {asiakkaat.map((asiakas) => (
                                    <option key={asiakas._id} value={asiakas.nimi}>
                                    {asiakas.nimi}
                                    </option>
                                ))
                                }
                            </select>
                        </div>
                        <div>
                                <p>Palvelut</p>
                                <select value={palveluEhto} onChange={(e) => setPalveluEhto(e.target.value)}>
                                    <option value={""}>Kaikki</option>
                                    {palvelut.map((p)=>(
                                        <option key={p._id} value={p.terapia}>
                                            {p.terapia}
                                        </option>
                                ))}
                                </select>
                                    {palveluEhto.length > 0 &&(
                                        <button className="vihreä" onClick={()=>muodostaHakuehdot({value:palveluEhto, category:'Palvelu'})}>+ hakuehtoihin</button>
                                    )}
                        </div>
                        <div>
                            <p>Aikaväli:</p>
                            <div className="flex gap-4">
                                <input
                                    type="date"
                                    value={minPvmEhto}
                                    onChange={handleMinPvmChange}
                                />
                                {minPvmEhto.length > 0 &&(
                                     <input
                                         type="date"
                                         value={maxPvmEhto}
                                         onChange={handleMaxPvmChange}
                                     /> 
                                )}   
                                <button className="vihreä" 
                                        onClick={()=>muodostaHakuehdot({
                                            value:[minPvmEhto," : ",maxPvmEhto], 
                                            category:"Pvm"})}>
                                    + hakuehtoihin
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1">
                        {Object.keys(hakuEhdot).length > 0 && (
                            <div>
                                <p>Hakuehtosi:</p>
                                <ul>
                                    {Object.entries(hakuEhdot).map(([category, values])=>(
                                    <div>
                                        <li key={category}>
                                            {category}:
                                            <ul>
                                                {values.map((value, index)=>(
                                                    <li key={index}>
                                                        {value} 
                                                    </li>
                                                    ))}
                                            </ul>
                                        </li>
                                    </div>
                                   ))}
                                </ul>
                                    <button className="vihreä" 
                                            onClick={()=>muodostaHakuehdot({value:"delete", category:'Delete'})}>
                                            Tyhjennä ehdot
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                
                
            </div>
            <div>
               <div>
                    <h1 className="p-4 mt-4 text-themeDark">Hakuehdoilla löydetyt tulokset:</h1>
                        <div className="flex flex-col bg-gray-200 rounded-md shadow-md shadow-themeSlate">
                            <div className="flex w-full justify-between  p-2 underline underline-offset-4">
                                <p>Asiakas</p>
                                <p>Tuote</p>
                                <p>Päivämäärä</p>
                                <p>Maksettu?</p>
                            </div>
                            {yhteenveto?.map(sv=>(
                                <div className="flex w-full justify-between p-4 border-t-2 border-dashed border-white hover:bg-gray-300 ease-in duration-150">
                                  <p>{sv.asiakas}</p>
                                  <p>{sv.terapiamuoto}</p>
                                  <p>{sv.pvm}</p>
                                  <p>joo / ei</p>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </Layout>
    )
}