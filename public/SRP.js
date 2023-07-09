"use strict";
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
let collegeName = document.getElementById("collegeName");
let appearanceFrequency = document.getElementById("participation");
let email = document.getElementById("email");
let content = document.getElementById("content");
let sendEmail = document.getElementById("email2");
let viewTeamElements = document.querySelector(".viewTeams");
class LocalStorageService {
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
class TeamRepository {
    constructor() {
        this.teams = LocalStorageService.getItem("teamList") || [];
    }
    registerTeam(team) {
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
            teamElement.textContent = `${team.collegeName} has particpated ${team.appearanceFrequency} times and their email is - ${team.email}`;
            listShow.appendChild(teamElement);
        });
    }
}
let formButton = document.getElementById("myForm");
formButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const collegeNameInput = document.getElementById("collegeName");
    const appearanceFrequencyInput = document.getElementById("participation");
    const emailInput = document.getElementById("email");
    const newTeam = {
        collegeName: collegeNameInput.value,
        appearanceFrequency: parseInt(appearanceFrequencyInput.value),
        email: emailInput.value
    };
    const teamRepository = new TeamRepository();
    teamRepository.registerTeam(newTeam);
    formButton.reset();
});
class EmailService {
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
document.addEventListener("DOMContentLoaded", function () {
    const teamRepository = new TeamRepository();
    teamRepository.updateTeamList();
});
const emailService = new EmailService();
let emailForm = document.getElementById("emailForm");
emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newEmail = {
        content: content.value,
        email: sendEmail.value
    };
    emailService.sendEmail(newEmail);
    emailForm.reset();
});
// const emailService = new EmailService();
// emailService.sendEmail(user.email, "Welcome to our platform!");
