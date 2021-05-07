//Downloading express npm i express@4.17.1
//Opening a defould json file npm init -y
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname) //Directory name
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000  //Setting port to environment variable value for heroku implementation

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs') //As a default property if there is an views file it compiles 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //Static is used for static web pages
console.log(publicDirectoryPath)

app.get('',(req,res)=>{

    res.render('index', {
        title: 'Weather App',
        name: 'Onur Gürbüz'

    })


})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About Me',
        name:'Onur'
    })

})

app.get('/help',(req,res)=> {

    res.render('help',{
        message: 'Sorry but you are by yourself to solve it',
        name: 'Satoshi',
        title: 'Help'
    })

})

//HTML File Usage

// request and responst shortcuts in the function  

// app.get('/help', (req,res)=> {

//     //Array of objests have created 
//     res.send([{
//         name: 'Andrew',
//         age:27
//     },{
//         name: 'Ali',
//         age:24
//     }])
// })

// app.get('/about', (req,res) => {

//     res.send('<h1>About</h1>')


// })

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send( {
            error: 'Adress must be provided'
        })
    }

    const location = req.query.address

    geocode(location, (error,{longitude,latitude,location} = {}) => {
       
        if(error){  //If there is an error the if condifiton will return error message and exit
           return res.send({error})
        }
        console.log(latitude+ '    ' + longitude + '   ' + location )
        // console.log('Error',error)
        // console.log('Data',data)
        forecast(latitude, longitude, (error, forecastData) => {

            

            if(error){
                return res.send({error})
            }
            // console.log('Error', error)
            // console.log('Data', data)

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            
    
          })

    })

   
   
})


app.get('/products',(req,res) => {


    if (!req.query.search) {
        return res.send({  //We can use res.send only once so we used return to exit
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
    
})


app.get('/help/*', (req,res) => {

    res.render('error',{
        errorMessage: 'Help article not found',
        title: '404 Page',
        name: 'Satoshi'
    })
})

app.get('*',(req, res) =>{

    res.render('error',{
        errorMessage: 'Page not found',
        title: '404 Page',
        name: 'Satoshi'
    })

})


app.listen(port, () => {

    console.log('Server is up on port 3000.')
})


//nodemon src/app.js -e js,hbs Is used for both compiling js and hbs files when they are saved.
