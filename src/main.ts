import {TeamRepository, EmailService, Email, Team} from "./SRP.js";
// import from .js file even though we are working with ts files. Remember this.

const currentPageId = document.body.id;
document.addEventListener("DOMContentLoaded", function () { // Get all the navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    // Loop through each navigation link and check if it matches the current page ID
    navLinks.forEach((link) => {
        const pageId = link.getAttribute("data-page");
        if (pageId === currentPageId) {
            link.classList.add("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn: HTMLElement |null = document.getElementById("scrollToTop");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("show");
            } else {
                scrollToTopBtn.classList.remove("show");
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({top: 0, behavior: "smooth"});
        });

        // Add touch event listener for mobile devices
        scrollToTopBtn.addEventListener("touchstart", () => {
            window.scrollTo({top: 0, behavior: "smooth"});
        });
    }
});
let content = document.getElementById("content")as HTMLInputElement;
let sendEmail = document.getElementById("email2")as HTMLInputElement;
let delButton = document.getElementById("delbutton")as HTMLInputElement;
const collegeNameInput = document.getElementById("collegeName")as HTMLInputElement;
const appearanceFrequencyInput = document.getElementById("participation")as HTMLInputElement;
const emailInput = document.getElementById("email")as HTMLInputElement;
const backgroundInput = document.getElementById("collegeType")as HTMLInputElement;
if (currentPageId === "edit") {
    document.addEventListener("DOMContentLoaded", function () {
        const teamRepository = new TeamRepository();
        teamRepository.displayTeamListWithMembersButton();
    });

}
if (currentPageId === "rankings") {
    document.addEventListener("DOMContentLoaded", function () {
        const teamRepository = new TeamRepository();
        teamRepository.displayPlayersRewards();
    });

}

if (currentPageId === "players") {


    document.addEventListener("DOMContentLoaded", function () {
        const teamRepository = new TeamRepository();
        console.log("playersPage");
        teamRepository.displayPlayersListWithRedeemButton();
    });

}

if (currentPageId !== "edit" && currentPageId !== "rankings" && currentPageId !== "players") {

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
        if (! collegeName || isNaN(appearanceFrequency) || ! email || ! background) {
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

    let formButton = document.getElementById("myForm")as HTMLFormElement;
    formButton.addEventListener("submit", (e : Event) => {
        e.preventDefault();
        if (! validateForm()) { // Display an error message or prevent the form submission
            alert("Please fill in all the fields.");
            return;
        }

        const newTeam: Team = {
            id: generateRandomString(),
            collegeName: collegeNameInput.value,
            appearanceFrequency: parseInt(appearanceFrequencyInput.value),
            email: emailInput.value,
            background: backgroundInput.value,
            teamMembers: []
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
    let emailForm = document.getElementById("emailForm")as HTMLFormElement;
    emailForm.addEventListener("submit", (e : Event) => {
        e.preventDefault();
        let newEmail: Email = {
            content: content.value,
            email: sendEmail.value
        }
        const contentInfo = content.value.trim();
        const email = sendEmail.value.trim();
        if (! contentInfo || ! email) { // Display an error message or prevent the form submission
            alert("Please fill in all the fields.");
            emailForm.reset();
            return;
        }
        emailService.sendEmail(newEmail);
        emailForm.reset();
    });

}


// const emailService = new EmailService();
// emailService.sendEmail(user.email, "Welcome to our platform!");
