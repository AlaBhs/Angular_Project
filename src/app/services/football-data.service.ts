import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { API } from "../../config/api.config";
import { UclTeam } from "../pages/ucl/dto/ucl-team.dto";

@Injectable({
  providedIn: 'root',
})
export class FootballDataService {
  private baseUrl = '/api/football';
  private http = inject(HttpClient);
  constructor() {
    
  }

  getGroupStageRankings(): Observable<any> {
    // const endpoint = `${API.ucl}`;
    return this.http.get(`${this.baseUrl}/v4/competitions/CL/standings`, {
      headers: { 'X-Auth-Token': '47a63b660706459c985c9d1f515588e5' },
    }).pipe(
      map((response:any) => this.transformResponseToUclTeams(response)) 
    );
  }
  /**
   * Transform the response from the service into an array of UclTeam objects
   * @param response The raw data from the service
   * @returns An array of UclTeam objects
   */
  
  private transformResponseToUclTeams(response: any): any {
    return response.standings[0].table
    .map((team: any) => ({
      rank:team.position,
      name: team.team.name,
      logo: team.team.crest,
      points: team.points,
      matches: team.playedGames,
      wins: team.won,
      draws: team.draw,
      losses: team.lost,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalDifference,
    }));
  }
}
