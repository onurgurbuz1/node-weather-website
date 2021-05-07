
const weatherForm = document.querySelector('form') //Setting format from hbs for addEventListaner
const searchElement = document.querySelector('input') //Getting the user imput from hbs

const messageOne = document.querySelector('#message-1') //When we are calling according to spesific id form hbs we use #
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
        fetch('http://localhost:3000/weather?address='+location).then((response) => {

            response.json().then((forecastData)=> {
            
                if(forecastData.error){
                    //return console.log(forecastData.error)
                    messageOne.textContent = forecastData.error
                    
                }else {

                    const {address,location,forecast} = forecastData

                    messageOne.textContent = location
                    messageTwo.textContent = forecast
                    console.log(address)
                    console.log(location)
                    console.log(forecast)
                    // console.log(forecastData.current.temperature)
                    // console.log(forecastData.location)
                    
                }
                
            
                })
            })

 
})


//After downloading Heuroku to se its version     heroku -v      then heroku login
//In order to initilize git       git init     is used
//git status will show the statis of library

//git add  isused for adding to the git platform. In order to add everything in directory we use       git add .

// To create new commit we use    git commit -m "Init commit"