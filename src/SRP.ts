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
import {MainFeeCalculator} from './OCP.js';

import  {RewardProvider, MonetaryRewardProvider, GiftCardRewardProvider} from './LSP.js';
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
    teamMembers: TeamMember[];
}
interface TeamMember {
    id: string;
    name: string;
    role: string;
    totalPoints: number;
    redeemStatus: boolean;
    monetaryRewards?: number;
    giftRewards?: number;
}



export interface TeamManagementInterface {
    redeemReward(id : string): void;
    generateRandomString(): string;
    displayPlayersListWithRedeemButton(): void;
    addTeamMember(teamId : string, teamMember : TeamMember): void;
    validateForm(memberNameValue : string, pointsValue : number, roleValue : string): boolean;
    displayAddTeamMemberForm(teamId : string): void;
    displayTeamListWithMembersButton(): void;
}
export interface TeamOperationInterface {
    calculateAndSetRegistrationFee(team : Team): void;
    registerTeam(team : Team): void;
    updateTeamList(): void;
    deleteMember(id : string): void;
    deleteAllTeamMembers(): void;

}
export interface EmailFunctionality {
    sendEmail(email : Email): void;
}
// Separate interfaces for team , teamMember, team management, team operations and email functionality

export class LocalStorageService {
    static getItem<T>(key : string): T | null {
        const storedItem = localStorage.getItem(key);
        if (storedItem) {
            return JSON.parse(storedItem)as T;
        }
        return null;
    }

    static setItem(key : string, data : any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export class TeamOperation implements TeamOperationInterface {
    private teams : Team[];
    private mainCalculatorFactory: MainFeeCalculator;
// Good dependency injection practice  instead of calling the classes directly 
// inside the constructor function, we call it in the argument.
    constructor(mainCalculatorFactory: MainFeeCalculator) {     
        this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];
        this.mainCalculatorFactory = mainCalculatorFactory;
    }
    calculateAndSetRegistrationFee(team : Team) {
        const background = team.background;
    const appearanceFrequency = team.appearanceFrequency;
    const mainCalculator = this.mainCalculatorFactory.createCalculator(background, appearanceFrequency);

        team.registrationFee = mainCalculator.calculateFee(appearanceFrequency);       
    }
    registerTeam(team : Team): void {
        this.calculateAndSetRegistrationFee(team);
        this.teams.push(team);
        console.log('New Team List is:', this.teams);
        LocalStorageService.setItem('teamList', this.teams);
    }
    updateTeamList() {
        const listShow = document.querySelector(".showList")as HTMLInputElement;
        listShow.innerHTML = "";

        this.teams.forEach((team) => {
            const teamElement = document.createElement("li");
            teamElement.innerHTML = `
          <div class="team-details">
            <p>${
                team.collegeName
            } has been added to the browser database.</p>
            <button class="deleteButton ${
                team.id
            }">Delete</button>
            </div>
        
        `;
            listShow.appendChild(teamElement);
            const itemDelButton = document.querySelector(`.${
                team.id
            }`)as HTMLButtonElement;
            itemDelButton ?. addEventListener("click", () => {
                const teamRepository = new TeamRepository();
                teamRepository.deleteMember(team.id);
                teamRepository.updateTeamList();
            });
        });

    }
    deleteMember(id : string) {
        this.teams = this.teams.filter((team) => team.id !== id);
        LocalStorageService.setItem('teamList', this.teams);
    }
    deleteAllTeamMembers() {
        this.teams = [];
        LocalStorageService.setItem('teamList', this.teams);
    }


}
export class TeamManagement implements TeamManagementInterface {
    private teams : Team[];
    private monetaryRewardProvider: RewardProvider;
    private giftCardRewardProvider: RewardProvider;
    constructor() {
        this.monetaryRewardProvider = new MonetaryRewardProvider();
        this.giftCardRewardProvider = new GiftCardRewardProvider();
        this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];
    }
    
    validateForm(memberNameValue : string, pointsValue : number, roleValue : string): boolean {
        if (!memberNameValue || isNaN(pointsValue) || !roleValue) {
            return false;
        }
        return true;
    }
    addTeamMember(teamId : string, teamMember : TeamMember): void {
        const team = this.teams.find((team) => team.id === teamId);

        if (team) {
            if (! team.teamMembers) {
                team.teamMembers = [];
            }
            team.teamMembers.push(teamMember);
            LocalStorageService.setItem('teamList', this.teams);
            alert("team member added!");
        } else {
            console.log(`Team with ID ${teamId} not found.`);
        }
    }
    generateRandomString() {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let randomString = '';
        for (let i = 0; i < 5; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
      }
    displayAddTeamMemberForm(teamId : string): void {
        const teamListContainer = document.querySelector(".showTeamList")as HTMLDivElement;
        const teamMemberForm = document.querySelector(`.team-form-${teamId}`)as HTMLFormElement;
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
        const addTeamMemberButton = teamMemberForm.querySelector(`.addMemberBtn`)as HTMLButtonElement;
        console.log(addTeamMemberButton);
        console.log(" problem?");
        addTeamMemberButton.addEventListener("click", (e : Event) => {
            e.preventDefault();
            const memberName = document.getElementById("memberName")as HTMLInputElement;
            const points = document.getElementById("points")as HTMLInputElement;
            const role = document.getElementById("role")as HTMLInputElement;
            const memberNameValue = memberName.value.trim();
            const pointsValue = parseInt(points.value.trim(), 10);
            const roleValue = role.value.trim();
            console.log(memberNameValue, pointsValue, roleValue);
            if (!this.validateForm(memberNameValue, pointsValue, roleValue)) { // Display an error message or prevent the form submission
                alert("Please fill in all the fields.");
                return;
            }

            const newTeamMember: TeamMember = {
                id: this.generateRandomString(),
                name: memberName.value,
                totalPoints: parseInt(points.value),
                role: role.value,
                redeemStatus: false,
            };
            teamMemberForm.reset();
            teamMemberForm.classList.add("form-hidden");
            this.addTeamMember(teamId, newTeamMember);

        });
    }   
    displayTeamListWithMembersButton(): void {
        const teamListContainer = document.querySelector(".showTeamList")as HTMLDivElement;
        teamListContainer.innerHTML = ""
        if(this.teams.length === 0) {
            teamListContainer.innerHTML = ` <div class="centerMsg">No teams registered yet!</div>
            `; }
        this.teams.forEach((team) => {

            const teamElement = document.createElement("div");
            const teamForm = document.createElement("form");
            teamForm.classList.add(`team-form-${
                team.id
            }`);
            teamForm.classList.add("add-memberForm");
            teamElement.classList.add("team");
            teamElement.innerHTML = `
                <h2>${
                team.collegeName
            }</h2>
                <div class="team-details-wrapper">
                  <p>This college has participated ${
                team.appearanceFrequency
            } times and their registration fee is Rs.${
                team.registrationFee
            }!</p>
                  <button class="addMembersButton addMemberButton-${
                team.id
            }">Add Team Members</button>
                </div>
              `;
            teamListContainer.appendChild(teamElement);
            teamListContainer.appendChild(teamForm);
            const addTeamMembersButton = teamElement.querySelector(`.addMemberButton-${
                team.id
            }`)as HTMLButtonElement;
            addTeamMembersButton ?. addEventListener("click", () => {
                if (teamForm.classList.contains("form-hidden")) {
                    teamForm.classList.remove("form-hidden");
                }
                this.displayAddTeamMemberForm(team.id);


            });
        });

    }
    redeemReward(id: string): void {
        // Find the team member with the given id in the teams array
        for (const team of this.teams) {
            const teamMember = team.teamMembers.find((member) => member.id === id);
            if(teamMember?.redeemStatus === true) {
                alert("Reward already redeemed!"); }
            if (teamMember) {
                console.log("team member found")
                // Set the redeemStatus to true
                teamMember.redeemStatus = true;
                console.log(teamMember.redeemStatus);
                
                // Calculate the reward for monetaryReward
                const monetaryReward = this.monetaryRewardProvider.provideReward(teamMember.totalPoints);
                teamMember.monetaryRewards = monetaryReward;
                console.log(monetaryReward);
                
                // Calculate the reward for giftCardReward
                const giftCardReward = this.giftCardRewardProvider.provideReward(teamMember.totalPoints);
                teamMember.giftRewards = giftCardReward;

               
                // Exit the loop after finding the team member
                break;
            }
        }
        LocalStorageService.setItem('teamList', this.teams);

    }
    
    displayPlayersListWithRedeemButton(): void {
        const playersListContainer = document.querySelector(".showPlayersList") as HTMLDivElement;
        playersListContainer.innerHTML = "";
      
        if (this.teams.length === 0) {
          playersListContainer.innerHTML = `<div class="centerMsg">No teams registered yet!</div>`;
        }
      
        // Loop through each team and its team members
        this.teams.forEach((team) => {
          const teamElement = document.createElement("div");
          teamElement.classList.add("team");
      
          // Display team name at the top
          const teamNameElement = document.createElement("h2");
          teamNameElement.textContent = team.collegeName;
          teamElement.appendChild(teamNameElement);
      
          // Display team members and their redeem buttons
          team.teamMembers.forEach((teamMember) => {
            const playerElement = document.createElement("div");
            playerElement.classList.add("player");
            playerElement.innerHTML = `
              <div class="team-details-wrapper">
                <p>${teamMember.name}</p>
                <button class="redeemButton redeemButton-${teamMember.id}">${teamMember.redeemStatus ? "Reward Redeemed" : "Redeem Reward"}</button>
              </div>
            `;
      
            const redeemButton = playerElement.querySelector(`.redeemButton-${teamMember.id}`) as HTMLButtonElement;
      
            if (teamMember.redeemStatus) {
              // If redeemStatus is true, change the button content to "Reward Redeemed" and apply the reward-redeemed-button class
              redeemButton.textContent = "Reward Redeemed";
              redeemButton.classList.add("reward-redeemed-button");
            } else {
              // If redeemStatus is false, keep the normal button content and apply the reward-button class
              redeemButton.classList.add("reward-button");
              redeemButton.onclick = (e: Event) => {
                e.preventDefault();
                this.redeemReward(teamMember.id);
                teamMember.redeemStatus = true;
                redeemButton.textContent = "Reward Redeemed";
                redeemButton.classList.add("reward-redeemed-button");
              };
            }
      
            teamElement.appendChild(playerElement);
          });
      
          playersListContainer.appendChild(teamElement);
        });
      }
    displayPlayersRewards(): void {
        const playersRewardsContainer = document.querySelector(".showPlayersRewards") as HTMLDivElement;
        playersRewardsContainer.innerHTML = "";
      
        // Flatten the team members array
        const allTeamMembers = this.teams.flatMap((team) => team.teamMembers);
      
        // Sort the team members by total points in descending order
        const sortedTeamMembers = allTeamMembers.sort((a, b) => b.totalPoints - a.totalPoints);
      
        // Create the table element
        const table = document.createElement("table");
        table.classList.add("players-rewards-table");
      
        // Create the table header row
        const tableHeaderRow = document.createElement("tr");
        tableHeaderRow.innerHTML = `
          <th>Player</th>
          <th>Monetary Rewards</th>
          <th>Gift Rewards</th>
          <th>Total Points</th>
        `;
        table.appendChild(tableHeaderRow);
      
        // Loop through each team member and create a row for each
        sortedTeamMembers.forEach((teamMember) => {
          const tableRow = document.createElement("tr");
          tableRow.innerHTML = `
            <td>${teamMember.name}</td>
            <td>${teamMember.redeemStatus ? teamMember.monetaryRewards : "Not redeemed yet"}</td>
            <td>${teamMember.redeemStatus ? teamMember.giftRewards : "Not redeemed yet"}</td>
            <td>${teamMember.totalPoints}</td>
          `;
          table.appendChild(tableRow);
        });
      
        playersRewardsContainer.appendChild(table);
      }
      
      
    

}

export class TeamRepository {
    private teams : Team[];
    private teamOperation : TeamOperation;
    private teamManagement : TeamManagement;
    private mainCalculatorFactory: MainFeeCalculator;
    constructor() {
        this.mainCalculatorFactory = new MainFeeCalculator();
        this.teams = LocalStorageService.getItem<Team[]>("teamList") || [];
        this.teamOperation = new TeamOperation(this.mainCalculatorFactory);
        this.teamManagement = new TeamManagement();

    }

    generateRandomString() {
        return this.teamManagement.generateRandomString();
    }
    calculateFeeFunction(team : Team) {
        this.teamOperation.calculateAndSetRegistrationFee(team);
    }
    addTeamMember(teamId : string, teamMember : TeamMember) {
        this.teamManagement.addTeamMember(teamId, teamMember);
    }

    registerTeam(team : Team) {
        this.teamOperation.registerTeam(team);
        this.updateTeamList();

    }
    updateTeamList() {
        this.teamOperation.updateTeamList();

    }

    deleteMember(id : string) {
        this.teamOperation.deleteMember(id);
        this.updateTeamList();

    }
    deleteAllTeamMembers() {
        this.teamOperation.deleteAllTeamMembers();
        this.updateTeamList();
    }
    validateForm(memberNameValue : string, pointsValue : number, roleValue : string) {
        return this.teamManagement.validateForm(memberNameValue, pointsValue, roleValue);
    }

    displayAddTeamMemberForm(teamId : string) {
        this.teamManagement.displayAddTeamMemberForm(teamId);

    }

    displayTeamListWithMembersButton() {
        this.teamManagement.displayTeamListWithMembersButton();
    }
    displayPlayersListWithRedeemButton () {
        this.teamManagement.displayPlayersListWithRedeemButton();
    }   
    rewardRedeemed(id : string) {
        this.teamManagement.redeemReward(id);
    } 
    displayPlayersReward () {
        this.teamManagement.displayPlayersListWithRedeemButton();
    }
    displayPlayersRewards () {
        this.teamManagement.displayPlayersRewards();
    }
}
export class EmailService implements EmailFunctionality {
    private emails : Email[];
    constructor() {
        this.emails = LocalStorageService.getItem<Email[]>("emailList") || [];
    }
    // can define other methods relating to email like validation, sending email etc here in this class.

    sendEmail(email : Email) { // Code for sending email depending on platform
        this.emails.push(email);
        console.log('New Email List is:', this.emails);
        LocalStorageService.setItem('emailList', this.emails);
    }
}
