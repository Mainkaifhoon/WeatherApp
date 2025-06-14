const cityInput = document.getElementById('cityInput')
const apiKey= '25b05272bffe4611043d06a1bb7d0bfe';
const card=document.getElementById('card')
const btn=document.getElementById('btn-js')

const test=document.getElementById('test')
btn.addEventListener('click',async event=>{

    const city =cityInput.value;

    if(city){
        try {

            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
            
        } catch (error) {
         console.error(error)   
         displayError(error)
        }

    }else{
        displayError('Please enter a  Valid City')
    }
    

})

async function getWeatherData(city) {
    
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("Could not Fetch the data")
    }

    return await response.json()
    

}
function displayWeatherInfo(data) {


   const{   name: city, 
           main: {temp,humidity},
           weather:[{description, id}]
    
        }=data;


    card.textContent=''

    card.style.display='flex'

    const cityDisplay= document.createElement('h1')
    const tempDisplay=document.createElement('p')
    const humidityDisplay=document.createElement('p')
    const descDisplay=document.createElement('p')
    const weatherEmoji=document.createElement('p')

    cityDisplay.textContent=city;
    cityDisplay.style.color='gold'
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    humidityDisplay.style.color='gold'
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id)

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)


    }
function getWeatherEmoji(weatherId) {
    switch(true){
        case (weatherId>=200 && weatherId<300):
            return '⛈️';
        case (weatherId>=300 && weatherId<400):
            return '⛈️';
        case (weatherId>=500 && weatherId<600):
            return '⛈️';
        case (weatherId>=600 && weatherId<700):
            return '❄️';
        case (weatherId>=700 && weatherId<800):
            return '🍃';
        case (weatherId===800):
            return '🌞';
        case (weatherId===801 && weatherId <810):
            return '💨';
        default:
            return '🤔';

    }
    
}
function displayError(error) {
    const errorDisplay= document.createElement('p')
    errorDisplay.textContent=error
    errorDisplay.classList.add('errorDisplay')
    card.textContent='';
    
    card.style.display='flex'

    card.appendChild(errorDisplay)

    
}

