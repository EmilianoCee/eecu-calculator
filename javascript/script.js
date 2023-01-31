
const jobTemplate = document.getElementById("job-template");
const jobList = document.getElementById("job-list");

const sortButtons = document.getElementsByClassName("job-sort")
const sortTriangles = document.getElementsByClassName("triangle");

const nameSort = document.getElementById("name-sort");
const incomeSort = document.getElementById("income-sort");

const displayedJobs = document.getElementsByClassName("job");
const jobTitle = document.getElementById("info-job");
const grossAnnual = document.getElementById("gross-annual");
const grossMonth = document.getElementById("gross-monthly");

const federalTax = document.getElementById("federal-tax");
const stateTax = document.getElementById("state-tax");
const socialSecurity = document.getElementById("social-security");
const medicare = document.getElementById("medicare");
const disability = document.getElementById("disability");
const retirement = document.getElementById("retirement");
const totalDeduction = document.getElementById("total-deduction");
const housePayment = document.getElementById("house-pay");
const medical = document.getElementById("medical");

const tableMonthly = document.getElementById("table-monthly");
const tableDeduction = document.getElementById("table-deductions");
const tableNet = document.getElementById("table-net");

const searchInput = document.getElementById("search");

const careerTaxContent = document.getElementById("career-taxes");
const careerOptions = document.getElementById("career-options");

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
    {work: "Corectional Officer", income: 48300},
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
    {work: "Wind Energy Technician", income: 56700},
]


populateTemplates();

// adds and clones job information into HTML template tag
function populateTemplates() {
    for (let i = 0; i < jobs.length; i++) {
        const element = jobs[i];
        // first child to access through document-fragment
        const job = jobTemplate.content.cloneNode(true).children[0];
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
        jobTitle.innerText = this.children[0].innerText;
        grossAnnual.innerText = "Gross Annual Income: " + thisIncome + ".00";

        let monthIncome = launderedIncome/12;
        grossMonth.innerText = "Gross Monthly Income: " + "$" + parseFloat(monthIncome).toFixed(2);

        let fed = monthIncome*0.12;
        let state = monthIncome*0.07;
        let social = monthIncome*0.062;
        let medi = monthIncome*0.0145;
        let dis = monthIncome*0.01;
        let ret = monthIncome*0.05;
        let finalDeduction = fed + state + social + medi + dis + ret + 180;
        let netMonthly = monthIncome - finalDeduction;

        federalTax.innerText = "$" + parseFloat(fed).toFixed(2);
        stateTax.innerText = "$" + parseFloat(state).toFixed(2);
        socialSecurity.innerText = "$" + parseFloat(social).toFixed(2);
        medicare.innerText = "$" +  parseFloat(medi).toFixed(2);
        disability.innerText = "$" +  parseFloat(dis).toFixed(2);
        retirement.innerText = "$" +  parseFloat(ret).toFixed(2);
        medical.innerText = "$180.00";
        totalDeduction.innerText = "$" + parseFloat(finalDeduction).toFixed(2);

        tableMonthly.innerText = "$" + parseFloat(monthIncome).toFixed(2) ;
        tableDeduction.innerText = totalDeduction.innerText;
        tableNet.innerText = "$" + parseFloat(netMonthly).toFixed(2);

        housePayment.innerText = "$" + parseFloat(monthIncome).toFixed(2) + " x 33% = " + "$" + parseFloat(monthIncome*0.33).toFixed(2)
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
console.log("before button:" + totalHeight)
console.log("before button:" + totalHeight)
const testButton = document.getElementById("test");
testButton.addEventListener("click", function() {
    for (let i = 0; i < careerTaxContent.children.length; i++) {
        const element = careerTaxContent.children[i];
        let height = element.offsetHeight;
        console.log(element);
        console.log(height);
        totalHeight = totalHeight + height;
        
    }
    console.log("after button:" + totalHeight);
    console.log(careerOptions.style.height);
    careerOptions.style.height = totalHeight + 65 + "px";
    jobList.style.height = totalHeight - 100 + "px";
});

function setEqualHeight() {
    for (let i = 0; i < careerTaxContent.children.length; i++) {
        const element = careerTaxContent.children[i];
        let height = element.offsetHeight;
        console.log(element);
        console.log(height);
        totalHeight = totalHeight + height;
    }
    console.log("after button:" + totalHeight);
    console.log(careerOptions.style.height);
    careerOptions.style.height = totalHeight + 65 + "px";
    jobList.style.height = totalHeight - 100 + "px";
}

setEqualHeight()
// window.addEventListener("resize", setEqualHeight());




// jobs.sort(function(a, b) {
//     let nameA = a.work.toLowerCase();
//     let nameB = b.work.toLowerCase();
//     if (nameA < nameB) {
//         return -1;
//     } 
//     if (nameA > nameB) {
//         return 1
//     }
//     return 0;
// })

// calculator stuffs