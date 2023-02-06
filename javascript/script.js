const jobList = document.getElementById("job-list");

const sortButtons = document.getElementsByClassName("job-sort")
const sortTriangles = document.getElementsByClassName("triangle");

const displayedJobs = document.getElementsByClassName("job");
const totalDeduction = document.getElementById("total-deduction");

const careerTaxContent = document.getElementById("career-taxes");
const careerOptions = document.getElementById("career-options");

const currentBalance = document.getElementById("current");
const table = document.querySelector("#check-table tbody");
const addButton = document.getElementById("add-row");

const jobs = [
    {work: "Accountant", income: 55650}, 
    {work: "Advance Tractor / Trailer Driver", income: 53550},
    {work: "Agricultural Engineer", income: 56700},
    {work: "Architect", income: 53550},
    {work: "Auto Tech / Mechanic", income: 49350},
    {work: "Aviation Tech. Mechanic", income: 50400},
    {work: "Biologist", income: 54600},
    {work: "Bus Driver", income: 37800},
    {work: "Business Development Officer", income: 54600},
    {work: "Business Manager (Hotel, etc.)", income: 61950},
    {work: "CNC Manufacturing", income: 80850}, 
    {work: "Carpenter", income: 47250},
    {work: "Chef", income: 52500},
    {work: "Civil Engineering Technician", income:68250},
    {work: "Commercial Driver ", income: 51450},
    {work: "Computer Technician", income: 46200},
    {work: "Conserv. / Environ. Science", income: 72450},
    {work: "Correctional Officer", income: 48300},
    {work: "Cosmetologist", income: 36750},
    {work: "Credit Union / Bank Manager", income:61950},
    {work: "Daycare Director", income: 37800},
    {work: "Dentist", income: 115500},
    {work: "Detective", income: 60900},
    {work: "Diesel Tech / Mechanic ", income:55650},
    {work: "Doctor / Physician", income: 147000},
    {work: "Electrician", income: 57600},
    {work: "Electronic Engineer", income: 75600},
    {work: "EMT", income: 34650}, 
    {work: "Energy Management PG&E", income: 106050},
    {work: "Engineer", income: 72450},
    {work: "Fashion Designer", income: 63000},
    {work: "Fire Fighter", income: 49350},
    {work: "Forest Ranger ", income: 52500},
    {work: "Graphic / Media Designer ", income: 58800},
    {work: "H/C HVAC", income: 63000},
    {work: "Highway Patrol", income: 84000},
    {work: "Home Inspector", income: 56700},
    {work: "Industrial Mechanic", income: 56700},
    {work: "Interior Designer", income: 46200},
    {work: "Investment Analyst", income: 49350},
    {work: "Lab Technician", income: 66150},
    {work: "Landscaper Horticulture", income: 48300},
    {work: "Lawyer", income: 86100},
    {work: "Marketing / Sales Manager", income: 48800},
    {work: "Media / Communications", income: 47150},
    {work: "Medical Repair Tech.", income: 52500}, 
    {work: "Military", income: 55650},
    {work: "Nurse", income: 66150},
    {work: "Nutritionist", income: 45150},
    {work: "Oceanographer", income: 69300},
    {work: "Pastor", income: 50400},
    {work: "PG&E / AT8&T Technician", income:78750},
    {work: "Pharmacist", income: 105000},
    {work: "Photographer", income: 45150},
    {work: "Physical Therapist", income: 72450},
    {work: "Pilot (Commercial) ", income: 78750},
    {work: "Plumber", income: 52500},
    {work: "Police Officer", income: 53550},
    {work: "Principal", income: 93450},
    {work: "Probation Officer", income: 44100},
    {work: "Psychologist", income: 77700},
    {work: "Retail Sales Associate", income:34650},
    {work: "Social Worker ", income: 50400},
    {work: "Solar Energy Tech.", income:53550},
    {work: "Teacher", income: 52500},
    {work: "UPS / Fed Ex Driver", income: 68250},
    {work: "Veterinarian", income: 82950},
    {work: "Welder / Metal Specialist", income: 47250},
    {work: "Wind Energy Technician", income: 56700}
]

populateTemplates();

// adds and clones job information into HTML template tag
function populateTemplates() {
    for (let i = 0; i < jobs.length; i++) {
        const element = jobs[i];
        // first child to access through document-fragment
        const job = document.getElementById("job-template").content.cloneNode(true).children[0];
        // target with querySelector due to getElementById errors
        const jobName = job.querySelector("[job-name]");
        const jobIncome = job.querySelector("[job-income]");
        jobName.textContent = element.work;
        jobIncome.textContent = "$" + element.income;
        jobList.append(job);
    }
    clickableJobs();
}

for (let i = 0; i < sortButtons.length; i++) {
    sortButtons[i].addEventListener("mouseover", function() {
        const innerTriangle = this.children[1].classList;
        if (innerTriangle.contains("triangle-right")) {
            innerTriangle.remove("triangle-right");
            innerTriangle.add("triangle-left");
        }
    }) 
    sortButtons[i].addEventListener("mouseout", function() {
        const innerTriangle = this.children[1].classList;
        if (innerTriangle.contains("triangle-left")) {
            innerTriangle.remove("triangle-left");
            innerTriangle.add("triangle-right");
        }
    }) 

    sortButtons[i].addEventListener("click", function() {
        const innerTriangle = this.children[1].classList;
        if (innerTriangle.contains("triangle-left") || innerTriangle.contains("triangle-down")) {
            resetTriangles();
            sort(this.id, 1);
            innerTriangle.remove("triangle-right");
            innerTriangle.add("triangle-up");

        } else if (innerTriangle.contains("triangle-up")) {
            resetTriangles();
            sort(this.id, 2);
            innerTriangle.remove("triangle-right");
            innerTriangle.add("triangle-down");
        } else {
            resetTriangles();
        }
    }) 
}

function resetTriangles() {
    for (let i = 0; i < sortTriangles.length; i++) {
        const element = sortTriangles[i].classList;
        element.remove("triangle-up");
        element.remove("triangle-down");
        element.remove("triangle-left")
        element.add("triangle-right");
    }
}

function clickableJobs() {
for (let i = 0; i < displayedJobs.length; i++) {
    displayedJobs[i].addEventListener("click", function() {
        let thisIncome = this.children[1].innerText;
        let launderedIncome = thisIncome.replace("$", "");
        launderedIncome = parseInt(launderedIncome);
        document.getElementById("info-job").innerText = this.children[0].innerText;
        document.getElementById("gross-annual").innerText = "Gross Annual Income: " + thisIncome + ".00";

        let monthIncome = launderedIncome/12;
        document.getElementById("gross-monthly").innerText = "Gross Monthly Income: " + "$" + monthIncome.toFixed(2);

        let fed = monthIncome*0.12;
        let state = monthIncome*0.07;
        let social = monthIncome*0.062;
        let medi = monthIncome*0.0145;
        let dis = monthIncome*0.01;
        let ret = monthIncome*0.05;
        let finalDeduction = fed + state + social + medi + dis + ret + 180;
        let netMonthly = monthIncome - finalDeduction;

        document.getElementById("federal-tax").innerText = "$" + fed.toFixed(2);
        document.getElementById("state-tax").innerText = "$" + state.toFixed(2);
        document.getElementById("social-security").innerText = "$" + social.toFixed(2);
        document.getElementById("medicare").innerText = "$" +  medi.toFixed(2);
        document.getElementById("disability").innerText = "$" +  dis.toFixed(2);
        document.getElementById("retirement").innerText = "$" +  ret.toFixed(2);
        document.getElementById("medical").innerText = "$180.00";
        totalDeduction.innerText = "$" + finalDeduction.toFixed(2);

        document.getElementById("table-monthly").innerText = "$" + monthIncome.toFixed(2) ;
        document.getElementById("table-deductions").innerText = totalDeduction.innerText;
        document.getElementById("table-net").innerText = "$" + netMonthly.toFixed(2);

        document.getElementById("house-pay").innerText = "$" + monthIncome.toFixed(2) + " x 33% = " + "$" + (monthIncome*0.33).toFixed(2);

        table.children[1].children[3].innerText = netMonthly.toFixed(2);

        setEqualHeight();
        topRowCheck();

        // removes all current table rows that are not the first 2
        for (let n = 2; n < table.children.length;) {
            table.deleteRow(n);
        }
        addRow();
    })
}};

function sortIncomeReverse() {
    jobs.sort((a, b) => a.income - b.income)
    removeTemplates()
    populateTemplates()
}
function sortIncome() {
    jobs.sort((b, a) => a.income - b.income)
    removeTemplates()
    populateTemplates()
}

function removeTemplates() {
    for (let i = 0; i < displayedJobs.length; i++) {
        const element = displayedJobs[i];
        while (displayedJobs[0]) {
            displayedJobs[0].parentNode.removeChild(displayedJobs[0])
        }
    }
}

function sortNameDown() {
    jobs.sort(function(a, b) {
        let nameA = a.work.toLowerCase();
        let nameB = b.work.toLowerCase();
        if (nameA < nameB) {
            return 0;
        } 
        if (nameA > nameB) {
            return -1
        }
        return 1;
    })
    jobs.forEach((e) => {
        removeTemplates()
        populateTemplates()
    })
}

function sortNameUp() {
    jobs.sort(function(a, b) {
        let nameA = a.work.toLowerCase();
        let nameB = b.work.toLowerCase();
        if (nameA < nameB) {
            return -1;
        } 
        if (nameA > nameB) {
            return 1
        }
        return 0;
    })
    jobs.forEach((e) => {
        removeTemplates()
        populateTemplates()
    })
}

function sort(which, direction) {
    if (which == "income-sort") {
        if (direction == 1) {
            sortIncome();
        } else {
            sortIncomeReverse()
        }
    } else {
        if (direction == 1) {
            sortNameUp();
        } else {
            sortNameDown();
        }
    }
}

let totalHeight = 0;
function setEqualHeight() {
    for (let i = 0; i < careerTaxContent.children.length; i++) {
        const element = careerTaxContent.children[i];
        let height = element.offsetHeight;
        totalHeight = totalHeight + height;
    }
    careerOptions.style.height = totalHeight + 61 + "px";
    jobList.style.maxHeight = totalHeight - 115 + "px";
    totalHeight = 0;
}

setEqualHeight()
window.addEventListener("resize", setEqualHeight);

function addRow() {
    let row;
    row = table.insertRow(table.children.length)
    for (let i = 0; i < 6; i++) {
        if(i < 2) {
            let cell = row.insertCell(i);
            cell.innerHTML = `<input type="text"></input>`;
        } else if (i < 4) {
            let cell = row.insertCell(i);
            cell.innerHTML = `<input type="number" onblur="calculate(this)" ></input>`;
            cell.addEventListener("keypress", function(e) {
                if(e.key == "Enter") {
                    calculate(cell.children[0]);
                }
            })
        } else if (i == 5) {
            let cell = row.insertCell(i);
            cell.innerHTML = `<button class="remove" onclick="removeRow(this)">Remove</button>`;
        } else {
            row.insertCell(i);
        }
    }
}

function topRowCheck() {
    table.children[1].children[1].innerText = "Paycheck"
    table.children[1].children[4].innerText = "0"

    table.children[1].children[4].innerText = table.children[1].children[3].innerText - table.children[1].children[2].innerText;

    currentBalance.innerText = "Current Balance: $" + table.children[1].children[4].innerText;
    currentBalance.style.color = "black"
}

function removeRow(el) {
    if (table.children.length == 3 || el.parentNode.parentNode.rowIndex+1 == table.children.length) {
        addButton.style.display = "block";
    }

    let previousBalance = parseFloat(el.parentNode.parentNode.parentNode.children[el.parentNode.parentNode.rowIndex-1].children[4].innerText);
    el.parentNode.parentNode.parentNode.deleteRow(el.parentNode.parentNode.rowIndex);

    currentBalance.innerText = "Current Balance: $" + previousBalance;
    currentBalance.style.color = "black"
    
}

function calculate(el) {
    let previousBalance = parseFloat(el.parentNode.parentNode.parentNode.children[el.parentNode.parentNode.rowIndex-1].children[4].innerText);
    let newBalance = el.parentNode.parentNode.children[4];
    let deposit = el.parentNode.parentNode.children[3];

    if (deposit.children[0] == el) {
        newBalance.innerText = (previousBalance + el.valueAsNumber).toFixed(2);
        if (newBalance.innerText == "NaN") {
            tableError()
        } else {
            el.parentNode.parentNode.children[2].innerHTML = "";
            currentBalance.innerText = "Current Balance: $" + newBalance.innerText;
            currentBalance.style.color = "black"
            if (table.children.length == el.parentNode.parentNode.rowIndex+1) {
                addRow();
                addButton.style.display = "none";
            }
        }
    } else {
        newBalance.innerText = (previousBalance - Math.abs(el.valueAsNumber)).toFixed(2);
        if (newBalance.innerText == "NaN") {
            tableError();
        } else {
            deposit.innerHTML = "";
            currentBalance.innerText = "Current Balance: $" + newBalance.innerText;
            currentBalance.style.color = "black"
            if (table.children.length == el.parentNode.parentNode.rowIndex+1) {
                addRow();
                addButton.style.display = "none";
            };
        }
    }
};

addButton.addEventListener("click", function() {
    addRow();
    addButton.style.display = "none";
});

function tableError() {
    currentBalance.innerText = "ENTER VALID NUMBER"; 
    currentBalance.style.color = "red"
}

// search bar
const searchBar = document.getElementById("search");
searchBar.addEventListener("input", function(e) {
    const value = e.target.value.toLowerCase();

    for (let i = 0; i < displayedJobs.length; i++) {
        const element = displayedJobs[i];
        const isVisible = element.innerText.toLowerCase().includes(value);
        element.classList.toggle("hide", !isVisible);
    }    
})