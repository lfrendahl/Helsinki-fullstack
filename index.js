//Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons
//must start with the npm start command
//must offer a npm run dev command

const express = require('express')
const app = express()
var morgan = require('morgan')


app.use(express.json())


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :ob'))
//create custom message using morgan middleware

morgan.token('ob', function (req) {
    return `${JSON.stringify(req.body)}`
})



let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    let postTime = new Date()
    let message = `Phonebook has info for ${persons.length} people`
    response.send(message + '<br><br>' + postTime)
    
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        console.log(id)
       const person = persons.find(person => person.id === id)

        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
})

const randomId = () => {
    return Math.floor((Math.random()*1000))
}

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'missing name'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'missing number'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    //if (body.name === persons.name) {
    //    return response.status(400).json({
    //        error: 'name must be unique'
    //    })
    //}

     const person = {
        id: randomId(),
        name: body.name, 
        number: body.number, 
    }

    persons = persons.concat(person)
    response.json(person)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server up on port ${PORT}`)