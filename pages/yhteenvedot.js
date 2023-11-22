import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function YhteenvedotSivu(){
    const [palvelut,setPalvelut] = useState([])
    const [varaukset,setVaraukset] = useState([])
    const [asiakkaat,setAsiakkaat] = useState([])
    const [asiakasValinta, setAsiakasValinta] = useState("")
    const [palveluEhto, setPalveluEhto] = useState("")
    const [minPvmEhto, setMinPvmEhto] = useState("")
    const [maxPvmEhto, setMaxPvmEhto] = useState("")
    const [hakuEhdot, setHakuEhdot] = useState({})
    const [yhteenveto, setYhteenveto] = useState([]) //varaukset?
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [inputValues, setInputValues] = useState({});
    

    
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
        axios.get('/api/ajanvaraus').then(response=>{
            setVaraukset(response.data)
            //setYhteenveto(response.data)
        })
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
        })
        console.log("asiakkaat: ", asiakkaat)
    },[])
    useEffect(()=>{
        hakuEhdoilla(hakuEhdot)
        console.log("once, hakuehdot ovat: ", [hakuEhdot])
    },[hakuEhdot])

  


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
        /*---------------ASIAKAS----------------*/
        if (hakuEhto.category==='Asiakas'){
            if (updatedHakuEhdot.hasOwnProperty(hakuEhto.category)){
                if (!updatedHakuEhdot[hakuEhto.category].includes(hakuEhto.value)) {
                    updatedHakuEhdot[hakuEhto.category].push(hakuEhto.value);
                }else{
                    return
                }
                if (hakuEhto.value===""){
                    updatedHakuEhdot[hakuEhto.category] = [hakuEhto.value]
                }
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

    function hakuEhdoilla(ehdot){
        console.log("ehdot ovat tässä: ", ehdot)
        let filteredVaraukset=varaukset
        let aloitusPvm
        let lopetusPvm
        if(ehdot && ehdot.Pvm && ehdot.Pvm.length > 0){        
                aloitusPvm=ehdot.Pvm[0][0]
                lopetusPvm=ehdot.Pvm[0][1]      
        } 
        if (ehdot) {
            console.log("IN EHDOT aloituspvm: ", aloitusPvm," lopetusPvm: ",lopetusPvm)
            filteredVaraukset = filteredVaraukset.filter((varaus) => {
                const asiakasFilter = !ehdot.Asiakas || ehdot.Asiakas.includes(varaus.asiakas);
                const palveluFilter = !ehdot.Palvelu || ehdot.Palvelu.includes(varaus.terapiamuoto);
                const pvmFilter =
                    !aloitusPvm ||
                    (new Date(aloitusPvm) <= new Date(varaus.pvm) &&
                        (!lopetusPvm || new Date(lopetusPvm) >= new Date(varaus.pvm)));
                return asiakasFilter && palveluFilter && pvmFilter;
            });
            setYhteenveto(filteredVaraukset);  
        }
        else{
            setYhteenveto(varaukset)
        }
    }
    const setValittuKohde = (index) => {
        // Your existing logic for setValittuKohde if needed
    
        // Toggle the visibility of the input for the specific index
        setHoveredIndex((prevIndex) => (prevIndex === index ? null : index));
      };
      const handleInputChange = (index, value) => {
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [index]: value,
        }));
      };

    return(
        <Layout>
            <h1 className="text-center">Laadi yhteenvetoja täällä</h1>
            <p className="text-center">Täällä voit hakea asiakkaan perusteella yhteenvetoja eri hakuehdoilla</p>
            <div>
                <div className="bg-gray-200 flex p-4 rounded-md shadow-md shadow-themeSlate">
                    <div className="flex-1">
                        <div>
                            <p>Asiakas</p>
                            <select 
                                    value={asiakasValinta} 
                                    onChange={(e) => setAsiakasValinta(e.target.value)}>
                                <option 
                                    value={""}>
                                    Hae asiakkaan perusteella
                                </option>
                                {asiakkaat.map((asiakas) => (
                                    <option key={asiakas._id} value={asiakas.nimi}>
                                    {asiakas.nimi}
                                    </option>
                                ))
                                }
                            </select>
                            {asiakasValinta.length > 0 &&(
                                <button className="vihreä" onClick={()=>muodostaHakuehdot({value:asiakasValinta, category:'Asiakas'})}>+ Lisää</button>
                            )}
                        </div>
                        <div>
                                <p>Palvelut</p>
                                <select value={palveluEhto} onChange={(e) => setPalveluEhto(e.target.value)}>
                                    <option value={""}>Hae palvelun perusteella</option>
                                    {palvelut.map((p)=>(
                                        <option key={p._id} value={p.terapia}>
                                            {p.terapia}
                                        </option>
                                ))}
                                </select>
                                    {palveluEhto.length > 0 &&(
                                        <button className="vihreä" onClick={()=>muodostaHakuehdot({value:palveluEhto, category:'Palvelu'})}>+ Lisää</button>
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
                                {minPvmEhto.length > 0 &&( 
                                <button className="vihreä" 
                                        onClick={()=>muodostaHakuehdot({
                                            value:[minPvmEhto,maxPvmEhto], 
                                            category:"Pvm"})}>
                                    + Lisää
                                </button>
                                )}
                                {hakuEhdot.hasOwnProperty("Pvm") && (
                                    <button className="vihreä">
                                       − Poista
                                    </button>
                                    )
                                }
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
                                            Tyhjennä ehdot ( näytä kaikki )
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                
                
            </div>
            <div>
               <div>
                    <h1 className="p-4 mt-4 text-themeDark">Yrityksen tapahtumat</h1>
                    <div className="flex flex-col bg-gray-200 p-4 gap-5 rounded-md shadow-md shadow-themeSlate">
                        {yhteenveto?.length > 0 ? (
                            <p className="text-center p-8">Hakuehdoilla löydetyt tulokset: </p>
                        ) : (<p className="text-center p-8">Ei tuloksia valituilla ehdoilla.</p>)
                        }
                        {(hakuEhdot && Object.keys(hakuEhdot).length === 0 ? varaukset : yhteenveto)
                        ?.sort((a,b)=> new Date(b.pvm) - new Date(a.pvm))
                            .map((sv, index)=>(
                                <div className="flex flex-col p-4 border-2 shadow-md rounded-lg scale-95 border-themeSlate hover:bg-themeYellow hover:scale-100 ease-linear duration-300"
                                     key={index}
                                     onMouseEnter={() => setValittuKohde(index)}
                                     onMouseLeave={() => setValittuKohde(null)}>
                                    <div className="w-full">
                                        <div className="flex w-full">
                                            <p className="w-1/4">{sv.asiakas}</p>
                                            <p className="w-1/4">{sv.terapiamuoto}</p>
                                            <p className="w-1/4">{sv.pvm}</p>
                                            <p className="w-1/4">joo / ei</p>
                                        </div>
                                        <div className="flex">
                                        {sv.asiakas.length > 0 &&
                                            asiakkaat
                                            .filter(info => sv.asiakas.includes(info.nimi))
                                            .map(info => (
                                            <div key={info.id}
                                                className="w-1/4">
                                                <p>Email: {info.email}</p>
                                                <p>Phone: {info.puhelin}</p>
                                                <p>Osoite: {info.osoite}</p>
                                            </div>
                                            ))}
                                        {sv.terapiamuoto.length > 0 &&
                                            palvelut
                                            .filter(pinfo => sv.terapiamuoto.includes(pinfo.terapia))
                                            .map(pinfo => (
                                            <div key={pinfo.id}
                                                 className="w-1/4">
                                                    <p>{pinfo.kuvaus}</p>
                                                    <p>Kesto {pinfo.kesto} min</p>
                                                    <p>Hinta {pinfo.hinta} €</p>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" flex  items-center gap-5 mt-2">
                                        <p>Huomioitavaa:</p>
                                        <textarea placeholder="Tähän voit tarvittaessa lisätä tietoa yhteenvetoa varten" className="w-full p-2 border-themeSlate border-2"/>
                                        {/*<input  className="bg-transparent shadow-md w-full"  
                                                placeholder="Lisää tietoa yhteenvetoa varten"
                                                value={inputValues[index] || ''}
                                        onChange={(e) => handleInputChange(index, e.target.value)}/> */}
                                    </div>
                                    {(hoveredIndex === index || inputValues[index]) && (
                                        <></>
                                    )}
                                  
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center mt-4 p-4">
                    <button className="vihreä">Tulosta tuloksista yhteenveto</button>
                </div>
            </div>
        </Layout>
    )
}