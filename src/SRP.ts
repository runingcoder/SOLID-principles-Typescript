// // Bad example: Violation of SRP
// class Team {
//     registerTeams(user: User) {
//       // Code for saving user to database
//     }

//     sendEmail(email: string, content: string) {
//       // Code for sending email
//     }
// }
// instead of this we can use two different class for two different task which abides by SRP that is
// segregating functoins.
// This principle aims to separate behaviours so that if bugs arise as a result of your change in one function,
//  it won’t affect other unrelated behaviours.
// we have used separate class for email and team registration and handling local storage functionality as well.
// While this might seem like a lot of work, it will pay off in the long run as your codebase grows.
//  You will be able to easily find the code you need to change and make the change 
// without worrying about breaking other parts of your codebase.
// so this was the implementation of SRP principle.

// Good example: Abiding by SRP::
import {RegistrationFeeCalculator, PrivateCollegeRegistrationFeeCalculator, GovCollegeRegistrationFeeCalculator, InternationalCollegeRegistrationFeeCalculator} from './OCP';

interface StorageItem {
    key: string;
    data: any;
}

export class LocalStorageService {
    static getItem<T>(key: string): T | null {
        const storedItem = localStorage.getItem(key);
        if (storedItem) {
            return JSON.parse(storedItem) as T;
        }
        return null;
    }

    static setItem(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export interface Email {
    content: string;
    email: string;
}

export interface Team {
    collegeName: string;
    appearanceFrequency: number;
    email: string;
    background: string;
    registrationFee?: number;
}
export class TeamRepository {
    private teams: Team[];
    // private registrationFeeCalculator: RegistrationFeeCalculator;
    // constructor(registrationFeeCalculator: RegistrationFeeCalculator)
    constructor() {
        this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];


    }

    registerTeam(team: Team) {
        // team.registrationFee = this.calculateRegistrationFee(team);

        this.teams.push(team);
        console.log('New Team List is:', this.teams);
        LocalStorageService.setItem('teamList', this.teams);
        this.updateTeamList();

    }
     updateTeamList() {
        const listShow = document.querySelector(".showList") as HTMLInputElement;
        listShow.innerHTML = "";
    
        this.teams.forEach((team) => {
          const teamElement = document.createElement("li");

          teamElement.textContent = `${team.collegeName} (${team.background} college) has particpated ${team.appearanceFrequency} times and their email is - ${team.email}`;
          listShow.appendChild(teamElement);
        });
      }
      deleteAllTeamMembers() {
        this.teams = [];
        LocalStorageService.setItem('teamList', this.teams);
        this.updateTeamList();
      }
    

} 
export class EmailService {
    private emails: Email[];
    constructor() {
        this.emails = LocalStorageService.getItem<Email[]>("emailList") || [];
    }
 //can define other methods relating to email like validation, sending email etc here in this class.

    sendEmail(email: Email) {
        // Code for sending email depending on platform
        this.emails.push(email);
        console.log('New Email List is:', this.emails);
        LocalStorageService.setItem('emailList', this.emails);
    }
}