// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tournamentplanner',
  password: '1234'
});

// simple query
connection.query(
  'SELECT * FROM tournamentplanner.player',
  function(err, results, fields) {
    console.log(err);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

async function getPlayers(){

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })

    connection.query('select distinct p.sex, p.family_name, p.first_name, p.playerId, p.birthDate, c.clubName, co.countyName, s.stateName, gr.greater_regionName, c.clubId, co.countyId, s.stateId, gr.greater_regionId,  n.nation_name from player p inner join tournamentplanner.club c on p.clubId = c.clubId inner join tournamentplanner.county co on c.countyId = co.countyId inner join tournamentplanner.state s on co.stateId = s.stateId inner join tournamentplanner.greater_region gr on s.greater_regionId = gr.greater_regionId inner join tournamentplanner.nation n on gr.nationId = n.nationId order by playerId', function(err, res, fields) {

      resolve(res)

    })

  })

}
async function getClubs(){

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })

    connection.query('select c.clubId,c.clubName, co.countyName, s.stateName, gr.greater_regionName, n.nation_name from club c inner join tournamentplanner.county co on c.countyId = co.countyId inner join tournamentplanner.state s on co.stateId = s.stateId inner join tournamentplanner.greater_region gr on s.greater_regionId = gr.greater_regionId inner join tournamentplanner.nation n on gr.nationId = n.nationId order by clubId', function(err, res, fields) {

      resolve(res)

    })

  })

}
async function getRankings(){

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })

    connection.query('select r.Discipline, r.Ranking, r.FRanking, p.family_Name, p.first_Name, p.sex, p.playerId, p.birthDate, r.Points, r.GesPoints, r.Tournaments, c.clubname from ranking r inner join tournamentplanner.player p on r.playerId = p.playerId inner join tournamentplanner.club c on p.clubId = c.clubId order by CASE WHEN Discipline = "HE" THEN 0   WHEN Discipline = "DE" THEN 1  WHEN discipline = "HD" THEN 2 WHEN discipline = "DD" THEN 3 WHEN discipline = "HM" THEN 4 WHEN discipline = "DM" THEN 5 END, Ranking  ', function(err, res, fields) {

      resolve(res)

    })

  })

}
async function getPlayer(id){

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })

    connection.query('select distinct p.sex, p.family_name, p.first_name, p.playerId, p.birthDate, c.clubName, co.countyName, s.stateName, gr.greater_regionName, c.clubId, co.countyId, s.stateId, gr.greater_regionId,  n.nation_name from player p  inner join tournamentplanner.club c on p.clubId = c.clubId inner join tournamentplanner.county co on c.countyId = co.countyId inner join tournamentplanner.state s on co.stateId = s.stateId inner join tournamentplanner.greater_region gr on s.greater_regionId = gr.greater_regionId inner join tournamentplanner.nation n on gr.nationId = n.nationId where p.playerId=?', [id], function(err, res, fields) {

      resolve(res)

    })

  })

}
async function deletePlayer(id){

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })

    connection.query('delete ranking from ranking where ranking.playerId = ?', [id], function(err, res, fields) {

      resolve(res)

    })
    connection.query('delete player from player where player.playerId = ?', [id], function(err, res, fields) {

      resolve(res)

    })


  })

}
async function updatePlayer(id,sex,first_name,family_name,birthdate,clubId){

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })
    console.log("(" +id+ "," + '"'+ sex +'"'+"," +first_name + "," + family_name + "," + birthdate + "," + clubId + ")")

    connection.query('UPDATE tournamentplanner.player SET player.sex =' + '"' + sex +'"' +' , player.first_Name = '+'"' + first_name + '"'+ ' , player.family_Name = '+'"' + family_name + '"'+' , player.birthdate = '+'"' + birthdate + '"'+', player.clubId = '+'"' + clubId + '"'+'WHERE player.playerId = ?', [id], function(err, res, fields) {

      resolve(res)

    })

  })

}

async function generateId(){
  
  
  for(i = 0; i < 9; i++){

    const id = '"'+"19-"+ await getRandomInt(1000000) +'"';
    if(await isIdUnique(id) == true){

      console.log(id);
      return id;

    }
    

  }
  throw new Error("Id creation not possible");


}
async function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function isIdUnique(id){

  
 return new Promise((resolve, reject) => {

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tournamentplanner',
    password: '1234'
  })
 

  connection.query('select count(*) as count from tournamentplanner.player where player.playerId = ?', [id], function(err, res, fields) {

    
    console.log(res[0].count)
   

    if(res[0].count == "0"){
    resolve(true)
    }
    else{
    resolve(false)
    }
  })
  })

}



async function insertPlayer(sex,first_name,family_name,birthdate,clubId){

  const id = await generateId();

  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'tournamentplanner',
      password: '1234'
    })

    


   
   console.log(id);
   

    connection.query('insert into tournamentplanner.player(playerId, sex, first_name, family_name, birthdate, clubId) values ('  + id  + ',' + '"' + sex + '"' + ',' + '"' + first_name + '"' +',' + '"' + family_name +'"' + ',' + '"' +birthdate + '"' + ',' + '"' + clubId + '"' +')', function(err, res, fields) {

       resolve(res)

    })


  })

}







module.exports = {getPlayers, getClubs, getRankings, getPlayer, deletePlayer, updatePlayer, insertPlayer}
