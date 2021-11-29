export interface Player {
    playerId: string;
    sex: string;
    first_name: string;
    family_name: string;
    clubName?: string;
    clubId: string
    nation_name?: string;
    birthDate: string;
  }
  export class Player {
    constructor(
      playerId: string,
      sex: string,
      first_name: string,
      family_name: string,
      birthDate: string,
      clubId: string
    ){}
    }