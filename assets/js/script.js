// targeted elements
const $form = document.querySelector('form')
const $main = document.querySelector('main')
const $searchHistory = document.querySelector('#search-history')

// created elements and inner html
const $forecastWrapper = document.createElement('section')
$forecastWrapper.classList.add('fourday-forecast-container')
const $forecastUL = document.createElement('ul')
$forecastUL.innerHTML = "nothing to see here"
$forecastUL.classList.add('forecast-container')


$forecastWrapper.append($forecastUL)



const key = '559b9c3178fdd070bff72b402207d441'
let searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory')) || []
const renderSearchHistory = (array) => {
    $searchHistory.innerHTML = ""
    if(array.length){
        for(let i = 0; i < array.length; i++){
            $searchHistory.innerHTML += `
            <li class="sh-item" data-city="${array[i]}">${array[i]}</li>           
    
            `
            if(i >= 5){
                break;
            }
        }
    }else{
        $searchHistory.innerHTML +='nothing to see here'
    }
    
    
}
const renderSearchInfo = (cName,todayDate,temp,wind,humid, icon) => {
    $main.innerHTML = ""
    $main.innerHTML +=`   
    <section class="current-weather-container">
    <section class="current-weather-city">
        
        <h2><i><img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon"></i>${cName}</h2>
    </section>
    <h3>${todayDate}</h3>
    <hr>
    <table>
        <tr>            
            <td>Temp</td>
            <td>${temp} °F</td>
          </tr>
          <tr>
            <td>Wind</td>
            <td>${wind} MPH</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>${humid} %</td>
          </tr>
    </table>
    </section
    `
    
}
const renderFourDayCards = (data) => {
    $forecastUL.innerHTML = ""
    const indexArray = [0,7,15,23,31]
    for(let i = 0; i < indexArray.length; i++){
        const date = data.list[indexArray[i]].dt_txt.split(' ')[0]
        const temp = data.list[indexArray[i]].main.temp
        const wind = data.list[indexArray[i]].wind.speed
        const humid = data.list[indexArray[i]].main.humidity
        const icon = data.list[indexArray[i]].weather[0].icon

        $forecastUL.innerHTML += `
        <li class="fdfc-item">
        <div>
            <ul class="day-item">
                <li class="date">
                    <span>${date}</span>
                </li>
                <li class="icon">
                    <span><img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon"></span>
                </li>
                <li>
                    <span class="title">Temp</span>
                    <span>${temp} °F</span>
                </li>
                <li>
                    <span class="title">Wind</span>
                    <span>${wind} MPH</span>
                </li>
                <li>
                    <span class="title">Humidity</span>
                    <span>${humid} %</span>
                </li>
            </ul>
        </div>
    </li>
        `
    
    } 
}
// fetches weather data for city
const fetchDataByLatLon = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`)
    .then((response)=>{
        if(response.ok){
           return response.json()
        }
    })
    .then((data)=>{
        const cityName = data.city.name
        const dateDUMMY = `Jan 11, 2024`
       
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
        renderSearchInfo(cityName,dateDUMMY,data.list[0].main.temp, data.list[0].wind.speed, data.list[0].main.humidity, data.list[0].weather[0].icon)  
        $main.append($forecastWrapper)
        renderFourDayCards(data)
       
        
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
    fetchDataByLatLon(lat,lon)
    })
    
}
//renders search results upon submitting
const handleSearch = (e) => {
    const input = document.querySelector('input')
    searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory')) || []
 
    e.preventDefault()
    convertCityNameToCoord(input.value)
    searchHistoryArray.unshift(input.value)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray))
    renderSearchHistory(searchHistoryArray)
}
// renders weather info by clicking on search history buttons
const handleHistoryLink = (e) => {
    if(e.target.hasAttribute('data-city')){
        convertCityNameToCoord(e.target.dataset.city)
    }
 
}
convertCityNameToCoord('round rock')
renderSearchHistory(searchHistoryArray)
$form.addEventListener('submit', handleSearch)
$searchHistory.addEventListener('click', handleHistoryLink)

       