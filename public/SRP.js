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
import { PrivateCollegeRegistrationFeeCalculator, GovCollegeRegistrationFeeCalculator, InternationalCollegeRegistrationFeeCalculator } from './OCP.js';
export class LocalStorageService {
    static getItem(key) {
        const storedItem = localStorage.getItem(key);
        if (storedItem) {
            return JSON.parse(storedItem);
        }
        return null;
    }
    static setItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
export class TeamRepository {
    constructor() {
        this.teams = LocalStorageService.getItem("teamList") || [];
        this.registrationFeeCalculators = {
            'Private': () => new PrivateCollegeRegistrationFeeCalculator(),
            'Governmental': () => new GovCollegeRegistrationFeeCalculator(),
            'International': () => new InternationalCollegeRegistrationFeeCalculator()
        };
    }
    calculateFeeFunction(team) {
        const background = team.background;
        const calculatorConstructor = this.registrationFeeCalculators[background];
        const calculator = calculatorConstructor();
        team.registrationFee = calculator.calculateFee(team.appearanceFrequency);
        if (!calculatorConstructor) {
            throw new Error(`No registration fee calculator found for college type: ${background}`);
        }
    }
    registerTeam(team) {
        this.calculateFeeFunction(team);
        this.teams.push(team);
        console.log('New Team List is:', this.teams);
        LocalStorageService.setItem('teamList', this.teams);
        this.updateTeamList();
    }
    updateTeamList() {
        const listShow = document.querySelector(".showList");
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
            let itemdelButton = document.querySelector('.' + team.id);
            itemdelButton.addEventListener("click", function () {
                const teamRepository = new TeamRepository();
                const teamIdClass = team.id;
                teamRepository.deleteMember(teamIdClass);
                teamRepository.updateTeamList();
            });
        });
    }
    deleteMember(id) {
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
export class EmailService {
    constructor() {
        this.emails = LocalStorageService.getItem("emailList") || [];
    }
    //can define other methods relating to email like validation, sending email etc here in this class.
    sendEmail(email) {
        // Code for sending email depending on platform
        this.emails.push(email);
        console.log('New Email List is:', this.emails);
        LocalStorageService.setItem('emailList', this.emails);
    }
}
