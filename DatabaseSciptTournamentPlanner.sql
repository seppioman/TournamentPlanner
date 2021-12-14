
DROP TABLE ranking;
DROP TABLE player;
DROP TABLE club;
DROP TABLE county;
DROP TABLE state;
DROP TABLE greater_region;
DROP TABLE nation;





USE tournamentplanner;


CREATE TABLE tournamentplanner.nation
(nationId int not null Primary Key,
nation_name varchar(50) not null,
abbreviation varchar(5) not null
);

insert into nation values(1, "Germany", "Ger");



CREATE TABLE tournamentplanner.greater_region
(greater_regionId varchar(50) not null Primary Key,
greater_regionName varchar(50) not null,
abbreviation varchar(50) not null,
nationId int not null,
 CONSTRAINT FK_greater_region_nation
    FOREIGN KEY (nationId)
    REFERENCES nation(nationId)
);

insert into greater_region(greater_regionId,greater_regionName,abbreviation,nationId) select distinct GRPID, GRUPPE,substring(GRPID,4,4),1 FROM rankingfile;


CREATE TABLE tournamentplanner.state
(stateId varchar(20) not null Primary Key,
stateName varchar(50) not null,
abbreviation varchar(5) not null,
greater_regionId varchar(50) not null,
 CONSTRAINT FK_state_greater_region
    FOREIGN KEY (greater_regionId)
    REFERENCES greater_region(greater_regionId)

);

insert into state(stateId,stateName,abbreviation,greater_regionId) select distinct LVID, LVNAME, substring(LVNAME,1,3), GRPID from rankingfile;



CREATE TABLE tournamentplanner.county
(countyId varchar(50) not null Primary Key,
countyName varchar(50) not null,
stateId varchar(20) not null,
 CONSTRAINT FK_county_state
    FOREIGN KEY (stateId)
    REFERENCES state(stateId)

);

insert into county(countyId,countyName,stateId) select distinct BezID,Bezirk,LVID from rankingfile;



CREATE TABLE tournamentplanner.club
(clubId varchar(20) not null Primary Key,
clubName varchar(50) not null,
countyId varchar(20) not null,
 CONSTRAINT FK_club_county
    FOREIGN KEY (countyId)
    REFERENCES county(countyId)

);

insert into club(clubId,clubName,countyId) select distinct ClubID,Verein,BezID from rankingfile;


CREATE TABLE tournamentplanner.player
(playerId varchar(20) not null Primary Key,
sex varchar(10) not null,
first_Name varchar(25) not null,
family_Name varchar(25) not null,
birthDate varchar(4) not null,
clubId varchar(20) not null,
 CONSTRAINT FK_player_club
    FOREIGN KEY (clubId)
    REFERENCES club(clubId)

);

insert into player(playerId,sex,first_Name,family_name,birthdate,clubId) select distinct SpielerID,"Male",Vorname,Nachname,Gjahr,ClubId from rankingfile where GS = "M";
insert into player(playerId,sex,first_Name,family_name,birthdate,clubId) select distinct SpielerID,"Female",Vorname,Nachname,Gjahr,ClubId from rankingfile where GS = "F";

CREATE TABLE tournamentplanner.ranking
(rankId int not null Primary Key auto_increment,
Discipline varchar(4),
Ranking int ,
FRanking int ,
Points int,
GesPoints int,
Tournaments varchar(5),
playerId varchar(20),
 CONSTRAINT FK_rank_player
    FOREIGN KEY (playerId)
    REFERENCES player(playerId)

);

insert into ranking(Ranking,Discipline,FRanking,Points,GesPoints,Tournaments,playerId) select distinct Ranglistenplatz, DIS, FRang, Points, GesPunkte, Turniere, SpielerID from rankingfile where DIS = "HE" or DIS = "DE";
insert into ranking(Ranking,Discipline,FRanking,Points,GesPoints,Tournaments,playerId) select distinct Ranglistenplatz, DIS, FRang, Points, GesPunkte, Turniere, SpielerID from rankingfile where DIS = "HD" or DIS = "DD";
insert into ranking(Ranking,Discipline,FRanking,Points,GesPoints,Tournaments,playerId) select distinct Ranglistenplatz, DIS, FRang, Points, GesPunkte, Turniere, SpielerID from rankingfile where DIS = "HM" or DIS = "DM";




