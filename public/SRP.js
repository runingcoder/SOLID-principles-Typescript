// // Bad example: Violation of SRP
// class Team {
//     registerTeams(user: User) {
//       // Code for saving user to database
//     }
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
    // private registrationFeeCalculator: RegistrationFeeCalculator;
    // constructor(registrationFeeCalculator: RegistrationFeeCalculator)
    constructor() {
        this.teams = LocalStorageService.getItem("teamList") || [];
    }
    registerTeam(team) {
        // team.registrationFee = this.calculateRegistrationFee(team);
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
