
const API_KEY = "e3f9bb50-a30e-4078-852a-bced8dae0677"

export async function getAirDataByCity(city){
   const res = await fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=ru&target=en&input=${city}`, {
        method: "GET",
        headers: { 
            "x-rapidapi-key": "817f37b36bmsh243b7ac83394b0dp15fac1jsn9a5d69136c18",
		    "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com"
        }
    }).then((res)=>{
        async function data(){
            const {outputs} = await res.json()
            console.log(outputs[0])
            const url = `https://api.airvisual.com/v2/city?city=${outputs[0].output}&state=${outputs[0].output}&country=Kyrgyzstan&key=${API_KEY}`;
            const quality = fetch(url)
            return quality
        }
        
        return data();
    });
    
    return res.json() 
}
