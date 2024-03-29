import "./css/Calc.css"
import "./css/calculation.css"
import {useEffect, useRef, useState} from "react"
import aph from "./assets/1053838.jpg"
import DataLoader from "./KEY"

function Calculator(){
    const loader = new DataLoader()
	const [champs,setChamps] = useState(undefined)
	const [items,setItems] = useState(undefined)
    const [champsImg,setChampsImg] = useState(undefined)
	const [itemsImg,setItemsImg] = useState(undefined)
    const [ShowChamps, setShowChamps] = useState(undefined)
    const [selectedChamp, setSelectedChamp] = useState([])
    const [ShowItems, setShowItems] = useState(undefined)
    const [selectedItems, setSelectedItems] = useState([])
    const [splash, setSplash] = useState(undefined)

    useEffect(() => {
        setSplash(undefined)
    },selectedChamp)

	async function load(){
        let version = await loader.vers

        loader.fetchChamps(version,setChamps)
		loader.fetchItems(version,setItems)

    }
    async function loadImages(setChampsImg,setItemsImg){
        let version = await loader.vers 

        loader.loadChampsImages(version,champs,setChampsImg)
        loader.loadItemsImages(version,items,setItemsImg)
    }
    


	
    if(champs === undefined || items === undefined){load()}
    
    useEffect(() => {
        if(champs === undefined || items === undefined){load()}
    }, [champs,items])

    useEffect(() => {
        if(ShowChamps === undefined || ShowItems === undefined && champs !== undefined && items !== undefined){setShowItems(items),setShowChamps(champs)}

        if(champsImg === undefined || itemsImg === undefined && champs !== undefined && items !== undefined){
            loadImages(setChampsImg,setItemsImg)
        }
    }, [champs,items])

    function filterDictionaryByValue(dictionary, filterValue) {
        const filteredDictionary = {};
      
        Object.keys(dictionary).forEach((key) => {
            const dictionaryValue = dictionary[key];
        
            if (dictionary[key].name.toLowerCase().includes(filterValue.toLowerCase())) {
                filteredDictionary[key] = dictionaryValue;
            }
            });
      
        return filteredDictionary;
      }

    function lookchamps(event){
        
        let shown =filterDictionaryByValue(champs,event.target.value)
        
        setShowChamps(shown)

    }
    function lookitems(event){

        let shown =filterDictionaryByValue(items,event.target.value)

        setShowItems(shown)
    }

    function handleCalculate(event){
        if(selectedChamp.length === 0 ){alert("You have to choose a champ"); return}
        document.querySelector(".calculation").classList.toggle("calculationTOP")

    }
    let stats = {}
    return (
        <div className="Calc">

            <Bordered> 
                <SearchBar onchange={lookchamps} placeholder={"Search champion"} />
                <Selection type="champs" img={champsImg} selectables={ShowChamps} setSelected={setSelectedChamp} number={1}/>
            </Bordered>

            <Bordered>
                <SearchBar onchange={lookitems} placeholder={"Search Items"} />
                <Selection type="Items" img={itemsImg} selectables={ShowItems} setSelected={setSelectedItems} number={6}/>
            </Bordered>


            <div className="ShowSelected">
                <h2>Selection</h2>
               
                <div className="content">
                    <div className="Champs">
                        {selectedChamp.map((champ,key) => ( <Bordered H="80px" W="80px" margin="5px" padding="0px"  key={key}><ItemImg id={key} src={champsImg[champ]} alt={champs[champ].name} key={key} name={champs[champ].name} /></Bordered> ))}
                    </div>
                    <div className="sep"></div>
                    <div className="Items">
                        {selectedItems.map((item,key) => ( <Bordered H="80px" W="80px" margin="5px" padding="0px"  key={key}><ItemImg id={key} src={itemsImg[item]} alt={items[item].name} key={key} name={items[item].name} /> </Bordered> ))}
                    </div>
                </div>

                <div className="calculate" onClick={handleCalculate}>
                    Calculate
                </div>

            </div>
            


            <Calculations selectedChamp={selectedChamp} selectedItems={selectedItems} champs={champs} items={items} handleCalculate={handleCalculate} setSplash={setSplash} splash={splash}/>
            
        </div>
    )
}


function Calculations({selectedChamp,selectedItems,handleCalculate,setSplash,splash,champs,items}){
    let stats = {}
    async function loadSplash(){
        let version = await new DataLoader().vers
        new DataLoader().fetchChampSplash(version,selectedChamp,setSplash)
    }

    useEffect(() => {

        loadSplash()

    },[selectedChamp])

    if(!splash) return(<div className="calculation" > <div className="content" onClick={handleCalculate}> Loading... </div> </div>)
    return (

        <div className="calculation" >
        <div className="content">
            <div className="close" onClick={handleCalculate}><span></span><span></span></div>

            <div className="SplashArt">
                <img src={splash} alt="Aatrox" />
            </div>

            <Damage selectedChamp={selectedChamp} stats={stats} />

            <div className="stats">
                {selectedItems}
                <br />
            </div>
            
        </div>
    </div>
    )
}


function SearchBar({onchange, placeholder}){
    return(
    <div className="Search">
        <input type="text" onChange={onchange} placeholder={placeholder}/> 
        <svg  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" q:key="4o_0"><path d="M14.4016 23.1996C19.2617 23.1996 23.2016 19.2597 23.2016 14.3996C23.2016 9.5395 19.2617 5.59961 14.4016 5.59961C9.54146 5.59961 5.60156 9.5395 5.60156 14.3996C5.60156 19.2597 9.54146 23.1996 14.4016 23.1996Z" fill="url(#paint0_linear_105_49778)" fillOpacity="0.24" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path><path opacity="0.2" d="M3.20312 5.60078C3.20312 5.38861 3.28741 5.18513 3.43744 5.0351C3.58747 4.88507 3.79095 4.80078 4.00313 4.80078H14.4031C14.6153 4.80078 14.8188 4.88507 14.9688 5.0351C15.1188 5.18513 15.2031 5.38861 15.2031 5.60078C15.2031 5.81295 15.1188 6.01644 14.9688 6.16647C14.8188 6.3165 14.6153 6.40078 14.4031 6.40078H4.00313C3.79095 6.40078 3.58747 6.3165 3.43744 6.16647C3.28741 6.01644 3.20312 5.81295 3.20312 5.60078ZM3.20312 26.4008C3.20312 26.1886 3.28741 25.9851 3.43744 25.8351C3.58747 25.6851 3.79095 25.6008 4.00313 25.6008H14.4031C14.6153 25.6008 14.8188 25.6851 14.9688 25.8351C15.1188 25.9851 15.2031 26.1886 15.2031 26.4008C15.2031 26.613 15.1188 26.8164 14.9688 26.9665C14.8188 27.1165 14.6153 27.2008 14.4031 27.2008H4.00313C3.79095 27.2008 3.58747 27.1165 3.43744 26.9665C3.28741 26.8164 3.20312 26.613 3.20312 26.4008Z" fill="white"></path><path d="M22.4585 20.8195L21.639 20L20 21.639L20.8195 22.4585L22.4585 20.8195ZM24.0071 25.6461C24.114 25.7568 24.2419 25.8451 24.3834 25.9059C24.5248 25.9666 24.6769 25.9986 24.8308 26C24.9847 26.0013 25.1373 25.972 25.2798 25.9137C25.4222 25.8554 25.5517 25.7693 25.6605 25.6605C25.7693 25.5517 25.8554 25.4222 25.9137 25.2798C25.972 25.1373 26.0013 24.9847 26 24.8308C25.9986 24.6769 25.9666 24.5248 25.9059 24.3834C25.8451 24.2419 25.7568 24.114 25.6461 24.0071L24.0071 25.6461ZM20.8195 22.4585L24.0071 25.6461L25.6461 24.0071L22.4585 20.8195L20.8195 22.4585Z" fill="white"></path><g opacity="0.2"><path d="M15.2031 23.36C14.01 23.4816 12.8047 23.3326 11.6771 22.924C10.5495 22.5154 9.52862 21.8577 8.69033 21H4.00313C3.79095 21 3.58747 21.0843 3.43744 21.2343C3.28741 21.3843 3.20313 21.5878 3.20312 21.8V23.4C3.20312 23.6122 3.28741 23.8157 3.43744 23.9657C3.58747 24.1157 3.79095 24.2 4.00313 24.2H14.4031C14.6153 24.2 14.8188 24.1157 14.9688 23.9657C15.1188 23.8157 15.2031 23.6122 15.2031 23.4V23.36Z" fill="white"></path></g><path d="M7.85912 17.6004H13.4031C13.6153 17.6004 13.8188 17.5161 13.9688 17.3661C14.1188 17.216 14.2031 17.0126 14.2031 16.8004V15.2004C14.2031 14.9882 14.1188 14.7847 13.9688 14.6347C13.8188 14.4847 13.6153 14.4004 13.4031 14.4004H7.00313C7.00313 15.566 7.31512 16.6588 7.85912 17.6004ZM6.06872 17.6004C5.62825 16.5911 5.40162 15.5016 5.40313 14.4004H3.00313C2.79095 14.4004 2.58747 14.4847 2.43744 14.6347C2.28741 14.7847 2.20313 14.9882 2.20312 15.2004V16.8004C2.20312 17.0126 2.28741 17.216 2.43744 17.3661C2.58747 17.5161 2.79095 17.6004 3.00313 17.6004H6.06872Z" fill="white"></path><path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M7.46872 12.0008H13.4031C13.6153 12.0008 13.8188 11.9165 13.9688 11.7665C14.1188 11.6164 14.2031 11.413 14.2031 11.2008V9.60078C14.2031 9.38861 14.1188 9.18513 13.9688 9.0351C13.8188 8.88507 13.6153 8.80078 13.4031 8.80078H10.3023C9.01992 9.5126 8.02051 10.6418 7.46872 12.0008ZM5.76953 12.0008C6.14817 10.7976 6.80609 9.70108 7.68952 8.80078H3.00313C2.79095 8.80078 2.58747 8.88507 2.43744 9.0351C2.28741 9.18513 2.20313 9.38861 2.20312 9.60078V11.2008C2.20312 11.413 2.28741 11.6164 2.43744 11.7665C2.58747 11.9165 2.79095 12.0008 3.00313 12.0008H5.76953Z" fill="white"></path><defs><linearGradient id="paint0_linear_105_49778" x1="14.4016" y1="5.59961" x2="14.4016" y2="23.1996" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0"></stop><stop offset="1" stopColor="white"></stop></linearGradient></defs></svg>
    </div>
    )
}
function Selection({img,type,selectables,setSelected,number}){


    function toggleSelected(event){
        
        let cls = "."+type+" .selected";
        let selectedItems = document.querySelectorAll(cls)

        if(document.querySelector(cls) == event.currentTarget){document.querySelector(cls).classList.remove("selected");}
        else if (selectedItems.length === number){selectedItems[0].classList.remove("selected");event.currentTarget.classList.toggle("selected");}
        else if (selectedItems.length < number){event.currentTarget.classList.toggle("selected");}

        let newItems = []

        document.querySelectorAll(cls).forEach((item) => {newItems.push(item.dataset.id)})

        setSelected(newItems)
    }

    if(selectables === undefined || img === undefined){return(<div className={"items "+type}>Loading</div>)}

    return(
        <div className={"items "+type}>
            {Object.keys(selectables).map((key) => (
                    <ItemImg toggle={toggleSelected} id={key} src={img[key]} name={selectables[key].name} alt={selectables[key].name} key={key} />
            ))}
        </div>
    )
}
function Bordered({margin,H,W,padding,children}){
return(
    <div className="outer" style={{margin:margin,width:W,height:H,padding:padding}}>
        <div className="inner">
            {children}
        </div>
    </div>
)
}
function Damage({selectedChamp,stats}){




    return(
        <div className="Damage">
                        <div className="Autos dmg">

                            <div className="autoContainer">
                                <AA damage="550" />
                                <AA damage="500" />
                                <AA damage="300" />
                                <AA damage="300" />
                                <AA damage="300" />
                            </div>

                        </div>
                        <div className="passif dmg"> P </div>
                        <div className="q dmg"> Q </div>
                        <div className="w dmg"> W </div>
                        <div className="e dmg"> E </div>
                        <div className="R dmg"> R </div>
                    </div>
    )
}
function AA({damage}){
    return(
    <div className="AA">
        <div className="damage">{damage}</div>
        <div className="circle"></div>
        <div className="buffs">
            <div className="buff"></div>
        </div>
    </div>
    )
}

function ItemImg({toggle,id,src,alt,name}){

    return(
        <div className="item hoverInfo" data-id={id} data-name={name} onClick={toggle}>
            <img src={src} alt={alt} />
        </div>
    )
}

export default Calculator