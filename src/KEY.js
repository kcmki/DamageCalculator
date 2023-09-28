

const API_KEY = "RGAPI-92a66148-b953-4886-b502-792b937be21d";
const CDN = "http://ddragon.leagueoflegends.com/cdn/"
const VERSION = "https://ddragon.leagueoflegends.com/api/versions.json"
const LANGUE = "en_US"
const CHAMPS = CDN +"{version}/data/" + LANGUE + "/champion.json"
const CHAMP = CDN +"{version}/data/" + LANGUE + "/champion/{champ}.json"
const champICONS = CDN + "{version}/img/champion/{champ}.png"
const splash = CDN + "img/champion/splash/{champ}_0.jpg" 
const ability = CDN + "{version}/img/spell/{ability}.png"
const passive = CDN + "{version}/img/passive/{champion}_P.png"
const items = CDN + "{version}/data/en_US/item.json"
const item = CDN + "{version}/img/item/{id}.png"
class DataLoader{
    
    constructor(){
        this.vers = this.fetchVersion().then(res => res.json()).then(res => res[0])
    }
    async fetchVersion(){
        return await fetch(VERSION)
    }
    async fetchChamps(version,setter){
        return await fetch(CHAMPS.replace("{version}", version)).then((res) => res.json()).then((res) => setter(res.data))
    }
    async fetchChamp(version, champ){
        return await fetch(CHAMP.replace("{version}", version).replace("{champ}", champ)).then((res) => res.json())
    }
    async fetchChampIcon(version, champ,setImg){
        return await fetch(champICONS.replace("{version}", version).replace("{champ}", champ)).then((res) => ( res.blob())).then((res) => {let img = URL.createObjectURL(res);setImg(img)})
    }
    async fetchItems(version,setter){
        return await fetch(items.replace("{version}", version)).then((res) => res.json()).then((res) => setter(res.data))
    }

}

export default DataLoader;