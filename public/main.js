import { TeamRepository, EmailService } from "./SRP.js";
const currentPageId = document.body.id;
if (currentPageId === "addTeamPage") {
    document.addEventListener("DOMContentLoaded", function () {
        const teamRepository = new TeamRepository();
        teamRepository.displayTeamListWithMembersButton();
    });
}
else {
    document.addEventListener("DOMContentLoaded", () => {
        const scrollToTopBtn = document.getElementById("scrollToTop");
        if (scrollToTopBtn) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add("show");
                }
                else {
                    scrollToTopBtn.classList.remove("show");
                }
            });
            scrollToTopBtn.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
            // Add touch event listener for mobile devices
            scrollToTopBtn.addEventListener("touchstart", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    });
    // import from .js file even though we are working with ts files. Remember this.
    let content = document.getElementById("content");
    let sendEmail = document.getElementById("email2");
    let delButton = document.getElementById("delbutton");
    const collegeNameInput = document.getElementById("collegeName");
    const appearanceFrequencyInput = document.getElementById("participation");
    const emailInput = document.getElementById("email");
    const backgroundInput = document.getElementById("collegeType");
    delButton.addEventListener("click", function () {
        const teamRepository = new TeamRepository();
        console.log("delete button clicked");
        teamRepository.deleteAllTeamMembers();
    });
    function validateForm() {
        const collegeName = collegeNameInput.value.trim();
        const appearanceFrequency = parseInt(appearanceFrequencyInput.value.trim(), 10);
        const email = emailInput.value.trim();
        const background = backgroundInput.value.trim();
        // Check if any of the fields are empty
        if (!collegeName || isNaN(appearanceFrequency) || !email || !background) {
            return false;
        }
        return true;
    }
    function generateRandomString() {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let randomString = '';
        for (let i = 0; i < 5; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
    }
    let formButton = document.getElementById("myForm");
    formButton.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm()) {
            // Display an error message or prevent the form submission
            alert("Please fill in all the fields.");
            return;
        }
        const newTeam = {
            id: generateRandomString(),
            collegeName: collegeNameInput.value,
            appearanceFrequency: parseInt(appearanceFrequencyInput.value),
            email: emailInput.value,
            background: backgroundInput.value,
            teamMembers: [],
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
}
// const emailService = new EmailService();
// emailService.sendEmail(user.email, "Welcome to our platform!");
