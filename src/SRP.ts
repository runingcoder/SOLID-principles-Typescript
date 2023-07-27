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
import { RegistrationFeeCalculator, PrivateCollegeRegistrationFeeCalculator, GovCollegeRegistrationFeeCalculator, InternationalCollegeRegistrationFeeCalculator } from './OCP.js';

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
    id: string;
    collegeName: string;
    appearanceFrequency: number;
    email: string;
    background: string;
    registrationFee?: string;
}
// Separate interfaces for team registration and email functionality

export interface TeamRegistration {
    calculateFeeFunction(team: Team) : void;
    registerTeam(team: Team): void;
    updateTeamList(): void;
    deleteMember(id: string): void;
    deleteAllTeamMembers(): void;
  }
  
export interface EmailFunctionality {
    sendEmail(email: Email): void;
  }
 
  
export class TeamRepository implements TeamRegistration {
    private teams: Team[];
    private registrationFeeCalculators: Record<string, () => RegistrationFeeCalculator>;
    constructor() {
        this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];
        this.registrationFeeCalculators = {
            'Private': () => new PrivateCollegeRegistrationFeeCalculator(),
            'Governmental': () => new GovCollegeRegistrationFeeCalculator(),
            'International': () => new InternationalCollegeRegistrationFeeCalculator()
        };
    }
    calculateFeeFunction(team: Team) {
        const background = team.background;
        const calculatorConstructor = this.registrationFeeCalculators[background];
        const calculator = calculatorConstructor();
        team.registrationFee = calculator.calculateFee(team.appearanceFrequency);
        if (!calculatorConstructor) {
            throw new Error(`No registration fee calculator found for college type: ${background}`);
        }
    }


    registerTeam(team: Team) {
        this.calculateFeeFunction(team);
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
            teamElement.textContent = `${team.collegeName} (
                ${team.background} college) has participated ${team.appearanceFrequency} 
                times  and their registration fee is Rs.${team.registrationFee} !`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("deleteButton", `${team.id}`);
            teamElement.appendChild(deleteButton); // Append the delete button to the teamElement
            listShow.appendChild(teamElement);
            let itemdelButton = document.querySelector('.' + team.id) as HTMLButtonElement;
            itemdelButton.addEventListener("click", function () {   
                const teamRepository = new TeamRepository();
                const teamIdClass = team.id;            
                teamRepository.deleteMember(teamIdClass);
                teamRepository.updateTeamList();            
               
            });


        });
    }
    deleteMember(id: string) {
        this.teams = this.teams.filter((team) => team.id !== id);
        LocalStorageService.setItem('teamList', this.teams);
        this.updateTeamList();

    }
    deleteAllTeamMembers() {
        this.teams = [];
        LocalStorageService.setItem('teamList', this.teams);
        this.updateTeamList();
    }


}
export class EmailService implements EmailFunctionality {
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