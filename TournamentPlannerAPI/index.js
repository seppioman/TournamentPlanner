const express = require('express')
const client = require('./mySQLClient')
const app = express()
const port = 3000
const cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.get('/players', async (req, res, next) => {
    const players = await client.getPlayers()
    res.send(players)
  })
  app.get('/clubs', async (req, res, next) => {
    const clubs = await client.getClubs()
    res.send(clubs)
  })
  app.get('/rankings', async (req, res, next) => {
    const rankings = await client.getRankings()
    res.send(rankings)
  })
  app.get('/players/:id', async (req, res, next) => {
    const player = await client.getPlayer(req.params.id)
    console.log(player[0])
    res.send(player[0])
  })
  app.delete('/players/:id', async (req, res, next) => {
     await client.deletePlayer(req.params.id)
     res.send()
  })
  app.post('/players', jsonParser, async (req, res, next) => {

    
    const sex = req.body.sex
    const first_Name = req.body.first_name
    const family_Name = req.body.family_name
    const birthdate = req.body.birthDate
    const clubId = req.body.clubId
    console.log(req.body)
   
    await client.insertPlayer(sex,first_Name,family_Name,birthdate,clubId)
    res.send()
 })
 app.put('/players/:id', jsonParser, async (req, res, next) => {

  const playerId = req.params.id
  const sex = req.body.sex
  const first_Name = req.body.first_name
  const family_Name = req.body.family_name
  const birthdate = req.body.birthDate
  const clubId = req.body.clubId
  console.log(playerId)
  console.log(req.body)
  console.log(clubId)
  console.log(playerId,sex,first_Name,family_Name,birthdate,clubId)
  await client.updatePlayer(playerId,sex,first_Name,family_Name,birthdate,clubId)
  res.send()
})
  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

