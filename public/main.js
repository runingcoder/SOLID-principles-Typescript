import { TeamRepository, EmailService } from "./SRP.js";
// import from .js file even though we are working with ts files. Remember this.
let content = document.getElementById("content");
let sendEmail = document.getElementById("email2");
let delButton = document.getElementById("delbutton");
delButton.addEventListener("click", function () {
    const teamRepository = new TeamRepository();
    console.log("delete button clicked");
    teamRepository.deleteAllTeamMembers();
});
let formButton = document.getElementById("myForm");
formButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const collegeNameInput = document.getElementById("collegeName");
    const appearanceFrequencyInput = document.getElementById("participation");
    const emailInput = document.getElementById("email");
    const backgroundInput = document.getElementById("collegeType");
    const newTeam = {
        collegeName: collegeNameInput.value,
        appearanceFrequency: parseInt(appearanceFrequencyInput.value),
        email: emailInput.value,
        background: backgroundInput.value,
        // registrationFee: 0 
        // 0 is the initial value. It will get updated later, once the registerTeam method is called
        // where the registration fee will be calculated based on the college type.
    };
    const teamRepository = new TeamRepository();
    teamRepository.registerTeam(newTeam);
    formButton.reset();
});
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