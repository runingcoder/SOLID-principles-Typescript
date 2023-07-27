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
// This principle aims to separate behaviours so that if bugs arise as a result of your change in one
// function, it won’t affect other unrelated behaviours.
// we have used separate class for email and team registration and handling local storage functionality as well.
// While this might seem like a lot of work, it will pay off in the long run as your codebase grows.
// You will be able to easily find the code you need to change and make the change
// without worrying about breaking other parts of your codebase.
// so this was the implementation of SRP principle.
// Good example: Abiding by SRP::
import { PrivateCollegeRegistrationFeeCalculator, GovCollegeRegistrationFeeCalculator, InternationalCollegeRegistrationFeeCalculator } from './OCP.js';
// Separate interfaces for team , teamMember, team management, team operations and email functionality
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
export class TeamOperation {
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
    }
    updateTeamList() {
        const listShow = document.querySelector(".showList");
        listShow.innerHTML = "";
        this.teams.forEach((team) => {
            const teamElement = document.createElement("li");
            teamElement.innerHTML = `
          <div class="team-details">
            <p>${team.collegeName} has been added to the Localstorage database.</p>
            <button class="deleteButton ${team.id}">Delete</button>
            </div>
        
        `;
            listShow.appendChild(teamElement);
            const itemDelButton = document.querySelector(`.${team.id}`);
            itemDelButton === null || itemDelButton === void 0 ? void 0 : itemDelButton.addEventListener("click", () => {
                const teamRepository = new TeamRepository();
                teamRepository.deleteMember(team.id);
                teamRepository.updateTeamList();
            });
        });
    }
    deleteMember(id) {
        this.teams = this.teams.filter((team) => team.id !== id);
        LocalStorageService.setItem('teamList', this.teams);
    }
    deleteAllTeamMembers() {
        this.teams = [];
        LocalStorageService.setItem('teamList', this.teams);
    }
}
export class TeamManagement {
    constructor() {
        this.teams = LocalStorageService.getItem("teamList") || [];
    }
    validateForm(memberNameValue, pointsValue, roleValue) {
        if (!memberNameValue || isNaN(pointsValue) || !roleValue) {
            return false;
        }
        return true;
    }
    displayAddTeamMemberForm(teamId) {
        const teamListContainer = document.querySelector(".showTeamList");
        const teamMemberForm = document.querySelector(`.team-form-${teamId}`);
        teamMemberForm.innerHTML = `
          <div class="field">
             <label>Name:</label>
             <input type="text" id ='memberName' >
              </div>
               <div class="field">
             <label>Role:</label>
             <input type="text" id ='role' >
              </div>
              <div class="field">
             <label>Total Points Scored:</label>
             <input type="number"  id ='points' >
              </div>
             <button class='addMemberBtn' >Add! </button>
         `;
        const addTeamMemberButton = teamMemberForm.querySelector(`.addMemberBtn`);
        console.log(addTeamMemberButton);
        console.log(" problem?");
        addTeamMemberButton.addEventListener("click", (e) => {
            e.preventDefault();
            const memberName = document.getElementById("memberName");
            const points = document.getElementById("points");
            const role = document.getElementById("role");
            const memberNameValue = memberName.value.trim();
            const pointsValue = parseInt(points.value.trim(), 10);
            const roleValue = role.value.trim();
            console.log(memberNameValue, pointsValue, roleValue);
            if (!this.validateForm(memberNameValue, pointsValue, roleValue)) { // Display an error message or prevent the form submission
                alert("Please fill in all the fields.");
                return;
            }
            const newTeamMember = {
                name: memberName.value,
                totalPoints: parseInt(points.value),
                role: role.value
            };
            teamMemberForm.reset();
            teamMemberForm.classList.add("form-hidden");
            this.addTeamMember(teamId, newTeamMember);
        });
    }
    addTeamMember(teamId, teamMember) {
        const team = this.teams.find((team) => team.id === teamId);
        if (team) {
            if (!team.teamMembers) {
                team.teamMembers = [];
            }
            team.teamMembers.push(teamMember);
            LocalStorageService.setItem('teamList', this.teams);
            alert("team member added!");
        }
        else {
            console.log(`Team with ID ${teamId} not found.`);
        }
    }
    displayTeamListWithMembersButton() {
        const teamListContainer = document.querySelector(".showTeamList");
        teamListContainer.innerHTML = "";
        this.teams.forEach((team) => {
            const teamElement = document.createElement("div");
            const teamForm = document.createElement("form");
            teamForm.classList.add(`team-form-${team.id}`);
            teamForm.classList.add("add-memberForm");
            teamElement.classList.add("team");
            teamElement.innerHTML = `
                <h2>${team.collegeName}</h2>
                <div class="team-details-wrapper">
                  <p>This college has participated ${team.appearanceFrequency} times and their registration fee is Rs.${team.registrationFee}!</p>
                  <button class="addMembersButton addMemberButton-${team.id}">Add Team Members</button>
                </div>
              `;
            teamListContainer.appendChild(teamElement);
            teamListContainer.appendChild(teamForm);
            const addTeamMembersButton = teamElement.querySelector(`.addMemberButton-${team.id}`);
            addTeamMembersButton === null || addTeamMembersButton === void 0 ? void 0 : addTeamMembersButton.addEventListener("click", () => {
                if (teamForm.classList.contains("form-hidden")) {
                    teamForm.classList.remove("form-hidden");
                }
                this.displayAddTeamMemberForm(team.id);
            });
        });
    }
}
export class TeamRepository {
    constructor() {
        this.teams = LocalStorageService.getItem("teamList") || [];
        this.teamOperation = new TeamOperation();
        this.teamManagement = new TeamManagement();
    }
    calculateFeeFunction(team) {
        this.teamOperation.calculateFeeFunction(team);
    }
    addTeamMember(teamId, teamMember) {
        this.teamManagement.addTeamMember(teamId, teamMember);
    }
    registerTeam(team) {
        this.teamOperation.registerTeam(team);
        this.updateTeamList();
    }
    updateTeamList() {
        this.teamOperation.updateTeamList();
    }
    deleteMember(id) {
        this.teamOperation.deleteMember(id);
        this.updateTeamList();
    }
    deleteAllTeamMembers() {
        this.teamOperation.deleteAllTeamMembers();
        this.updateTeamList();
    }
    validateForm(memberNameValue, pointsValue, roleValue) {
        return this.teamManagement.validateForm(memberNameValue, pointsValue, roleValue);
    }
    displayAddTeamMemberForm(teamId) {
        this.teamManagement.displayAddTeamMemberForm(teamId);
    }
    displayTeamListWithMembersButton() {
        this.teamManagement.displayTeamListWithMembersButton();
    }
}
export class EmailService {
    constructor() {
        this.emails = LocalStorageService.getItem("emailList") || [];
    }
    // can define other methods relating to email like validation, sending email etc here in this class.
    sendEmail(email) {
        this.emails.push(email);
        console.log('New Email List is:', this.emails);
        LocalStorageService.setItem('emailList', this.emails);
    }
}
