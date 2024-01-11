const key = '559b9c3178fdd070bff72b402207d441'
const searchHistory = []


// fetches weather data for city
const fetchDataByLatLon = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`)
    .then((response)=>{
        if(response.ok){
           return response.json()
        }
    })
    .then((data)=>{
        
        // console.log(data.city.name) 
        // console.log(data.list[1].main.temp)
        // console.log(data.list[1].wind.speed)
        // console.log(data.list[1].main.humidity)
        // console.log(data.list[1].weather[0].icon)
        const firstDay = 0
        const secondDay = 7
        const thirdDay = 15
        const fourthDay = 23
        const firstDayDay = 31
        console.log(data.list[31])
        
    }) 
    
}
// converts coordinate into it's city name
const convertCityNameToCoord = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`)
    .then((response)=>{
        if(response.ok){
            return response.json()
        }
    })
    .then((data)=>{
       const lat = data.city.coord.lat 
       const lon = data.city.coord.lon 
    console.log('geo',lat,lon)
    fetchDataByLatLon(lat,lon)
    })
    
}



       