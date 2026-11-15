
var yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

var topButton = document.createElement("button");
topButton.textContent = "↑ Top";
topButton.id = "top-btn";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
});

topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


var checkBtn = document.getElementById("check-btn");
if (checkBtn) {
    checkBtn.addEventListener("click", function () {
        var input = document.getElementById("temp-input");
        var result = document.getElementById("check-result");
        var temp = Number(input.value);
        var level = "";
        var advice = "";
        var colorClass = "";

        if (input.value === "") {
            level = "Please type a temperature first.";
            colorClass = "lv-empty";
        } else if (temp < 27) {
            level = "Low risk";
            advice = "It is not very hot. Still drink water if you are active.";
            colorClass = "lv0";
        } else if (temp <= 32) {
            level = "Caution";
            advice = "You may feel tired after a long time outside. Drink water often.";
            colorClass = "lv1";
        } else if (temp <= 39) {
            level = "Extreme caution";
            advice = "Heat cramps and heat exhaustion are possible. Rest in the shade.";
            colorClass = "lv2";
        } else if (temp <= 51) {
            level = "Danger";
            advice = "Heat exhaustion is likely. Limit time outdoors and stay cool.";
            colorClass = "lv3";
        } else {
            level = "Extreme danger";
            advice = "Heat stroke is highly likely. Stay somewhere cool.";
            colorClass = "lv4";
        }

        result.innerHTML = "<strong>" + level + "</strong> " + advice;
        result.className = "check-result show " + colorClass;
    });
}
var checkboxes = document.querySelectorAll(".checklist-items input");
var progressText = document.getElementById("checklist-progress");
var progressFill = document.getElementById("progress-fill");
var checklistMessage = document.getElementById("checklist-message");
var resetBtn = document.getElementById("checklist-reset");

function updateChecklist() {
    var done = 0;

    for (var i = 0; i < checkboxes.length; i++) {
        var label = checkboxes[i].parentElement;
        if (checkboxes[i].checked) {
            done = done + 1;
            label.classList.add("done");
        } else {
            label.classList.remove("done");
        }
    }

    progressText.textContent = done + " of " + checkboxes.length + " done";
    progressFill.className = "progress-fill w" + done;

    if (done === checkboxes.length) {
        checklistMessage.textContent = "Great job! You are ready for the heat.";
    } else {
        checklistMessage.textContent = "";
    }
}

if (checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", updateChecklist);
    }

    
    resetBtn.addEventListener("click", function () {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        updateChecklist();
    });

    updateChecklist();
}

/* Heat Wave Quiz (5 questions, 30 seconds) */
var quizStartBtn = document.getElementById("quiz-start");

if (quizStartBtn) {
    var quizCheckBtn = document.getElementById("quiz-check");
    var quizTimeText = document.getElementById("quiz-time");
    var quizResult = document.getElementById("quiz-result");
    var quizRadios = document.querySelectorAll("#quiz input[type='radio']");

    // correct answer for each question (0 = first option)
    var correctAnswers = [2, 1, 1, 0, 3];
    var quizTimer;
    var quizTime;

    function setRadios(disabled) {
        for (var r = 0; r < quizRadios.length; r++) {
            quizRadios[r].disabled = disabled;
        }
    }

    function startQuiz() {
        quizStartBtn.disabled = true;
        quizCheckBtn.disabled = false;
        quizResult.textContent = "";

        // reset answers and colours
        for (var r = 0; r < quizRadios.length; r++) {
            quizRadios[r].checked = false;
            quizRadios[r].parentElement.className = "";
        }
        setRadios(false);

        quizTime = 30;
        quizTimeText.textContent = quizTime;
        quizTimeText.classList.remove("low");

        clearInterval(quizTimer);
        quizTimer = setInterval(function () {
            quizTime = quizTime - 1;
            quizTimeText.textContent = quizTime;
            if (quizTime <= 10) {
                quizTimeText.classList.add("low");
            }
            if (quizTime === 0) {
                checkScore();
            }
        }, 1000);
    }

    function checkScore() {
        clearInterval(quizTimer);
        setRadios(true);

        var score = 0;
        for (var q = 0; q < correctAnswers.length; q++) {
            var picked = document.querySelector("input[name='q" + (q + 1) + "']:checked");
            var options = document.querySelectorAll("input[name='q" + (q + 1) + "']");

            // show the right answer in green
            options[correctAnswers[q]].parentElement.className = "correct";

            if (picked && Number(picked.value) === correctAnswers[q]) {
                score = score + 1;
            } else if (picked) {
                picked.parentElement.className = "wrong";
            }
        }

        if (quizTime === 0) {
            quizResult.textContent = "Time is up! Your score is " + score + " out of " + correctAnswers.length;
        } else {
            quizResult.textContent = "Your score is " + score + " out of " + correctAnswers.length;
        }
        quizStartBtn.textContent = "Try Again";
        quizStartBtn.disabled = false;
        quizCheckBtn.disabled = true;
    }

    quizStartBtn.addEventListener("click", startQuiz);
    quizCheckBtn.addEventListener("click", checkScore);
    setRadios(true);
}


/* Hamburger menu */
var navToggle = document.querySelector(".nav-toggle");
var siteNav = document.getElementById("site-nav");
if (navToggle && siteNav) {
    function setMenu(open) {
        navToggle.classList.toggle("open", open);
        siteNav.classList.toggle("open", open);
        navToggle.setAttribute("aria-expanded", open);
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    navToggle.addEventListener("click", function () {
        setMenu(!siteNav.classList.contains("open"));
    });
    siteNav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") { setMenu(false); }
    });
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) { setMenu(false); }
    });
}
