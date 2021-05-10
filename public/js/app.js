
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
        fetch('/weather?address='+location).then((response) => {

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

//COMPILING IN GITBASH

//In git bash we used     ls -a -l ~/.ssh    find existing keys

//Used     ssh-keygen -t rsa -b 4096 -C "onurgurbuz97@gmail.com"   for compiling a spesific key random image


// eval $(ssh-agent -s)   for compiling agent pid
// In order to add an id we used    ssh-add ~/.ssh/id_rsa


// Back to Command Window MICROSOFT CODE

// Finally run cat ~/.ssh/id_rsa.pub to form get spesific ssh key

//In order to test ssh connection     ssh -T git@github.com


//USING HEROKU

//heroku keys:add

//For starting to create web application        heroku create gurbuz-weather-application
 
//Setting heroku instructions first opent rhe package.json and in scripts change test to the "start":"node src/app.js" then on command window    npm run start

//git remote     will show the remotes that had been figured

//used       git push origin main     or   git push       after setting github the commit that we defined before

//To deploy      git push heroku main    for pushing heroku


