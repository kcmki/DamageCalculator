

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
const itemICONS = CDN + "{version}/img/item/{item}.png"

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
    async fetchItems(version,setter){
        return await fetch(items.replace("{version}", version)).then((res) => res.json()).then((res) => setter(res.data))
    }
    async fetchChampIcon(version, champ){
        return await fetch(champICONS.replace("{version}", version).replace("{champ}", champ)).then((res) => ( res.blob())).then((res) => (URL.createObjectURL(res)))
    }
    async fetchItemIcon(version, item){
        return await fetch(itemICONS.replace("{version}", version).replace("{item}", item)).then((res) => ( res.blob())).then((res) => (URL.createObjectURL(res)))
    }

    async loadChampsImages(version, champs,setchamps){
        if(!champs) return console.log("no champs")
        let promises = []

        for(let champ in champs){
            
            promises.push(this.fetchChampIcon(version, champs[champ].id, champs[champ].img))
        }
        let x = await Promise.all(promises)
        let map = {}
        for(let i = 0; i < x.length; i++){
            map[Object.keys(champs)[i] ]= x[i]
        }
        setchamps(await map)
    }
    async loadItemsImages(version, items,setitems){
        if(!items) return console.log("no champs")
        let promises = []
        Object.keys(items).forEach((item) => {
            promises.push(this.fetchItemIcon(version,item))
        })
        let x = await Promise.all(promises)
        let map = {}
        for(let i = 0; i < x.length; i++){
            map[Object.keys(items)[i] ]= x[i]
        }
        setitems(await map)
        

    }

}

export default DataLoader;