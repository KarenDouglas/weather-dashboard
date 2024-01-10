console.log('yo')
const key = '559b9c3178fdd070bff72b402207d441'
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=30.5083&lon=-97.6789&units=imperial&appid=${key}`)
.then((response)=>{
    if(response.ok){
       return response.json()
    }
})
.then((data)=>{
    console.log(data.city)
    console.log(data.list[1].main.temp)
    console.log(data.list[1].wind)
    console.log(data.list[1].main.humidity)
    console.log(data.list[1].weather[0].icon)

}) 
       