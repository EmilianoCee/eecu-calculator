const jobTemplate = document.getElementById("job-template");
const jobList = document.getElementById("job-list");

const sortButtons = document.getElementsByClassName("job-sort")
const sortTriangles = document.getElementsByClassName("triangle");

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

const jobs = [
    {work: "Accountant", income: 55650}, 
    {work: "Advance Tractor/Trailer Driver", income: 53550},
    {work: "Zebra Breeder", income: 929292},
    {work: "Agricultural Engineer", income: 56700},
    {work: "Architech", income: 53550},
    {work: "Auto Tech/Mechanic", income: 49350},
    {work: "Aviation Tech. Mechanic", income: 50400},
    {work: "Biologist", income: 54600},
    {work: "Bus Driver", income: 37800},
    {work: "homeless", income: 24}, 
    {work: "Business Development Officer", income: 54600},
    {work: "Business Manager (Hotel, etc.)", income: 61950},
    {work: "homeless", income: 24}, 
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24}, 
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24}, 
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24},
    {work: "homeless", income: 24}
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
            sortIncomeU()
            innerTriangle.remove("triangle-right");
            innerTriangle.add("triangle-up");

        } else if (innerTriangle.contains("triangle-up")) {
            resetTriangles();
            sortIncome()
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
    })
}};

function sortJobs() {
    jobs.sort(function(a, b) {
        let nameA = a.work.toLowerCase();
        let nameB = b.work.toLowerCase();
        
        // jobs.sort((nameA, nameB) => nameA.localeCompare(nameB));
    })
}

function sortIncome() {
    jobs.sort((a, b) => a.income - b.income)
    removeTemplates()
    populateTemplates()
}
function sortIncomeU() {
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

const testButton = document.getElementById("test");
testButton.addEventListener("click", function() {
    console.log(jobs.length)
})

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