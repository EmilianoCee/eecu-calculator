const jobTemplate = document.getElementById("job-template");
const jobList = document.getElementById("job-list");

const sortButtons = document.getElementsByClassName("job-sort")
const sortTriangles = document.getElementsByClassName("triangle");

const displayedJobs = document.getElementsByClassName("job");
const jobTitle = document.getElementById("info-job");
const grossAnnual = document.getElementById("gross-annual");
const grossMonth = document.getElementById("gross-monthly");

const searchInput = document.getElementById("search");

const jobs = [
    {work: "Accountant", income: 55650}, 
    {work: "Advance Tractor/Trailer Driver", income: 53550},
    {work: "Agricultural Engineer", income: 56700},
    {work: "Architech", income: 53550},
    {work: "Auto Tech/Mechanic", income: 49350},
    {work: "Aviation Tech. Mechanic", income: 50400},
    {work: "Biologist", income: 54600},
    {work: "Bus Driver", income: 37800},
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
    {work: "homeless", income: 24}
]

// adds and clones job information into HTML template tag
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
            innerTriangle.remove("triangle-left");
            innerTriangle.remove("triangle-down");
            innerTriangle.add("triangle-up");
        } else if (innerTriangle.contains("triangle-up")) {
            innerTriangle.remove("triangle-up");
            innerTriangle.add("triangle-down");
        }
    }) 
}

function sortGtoL() {
    
}

for (let i = 0; i < jobs.length; i++) {
    const element = jobs[i].income;

}

for (let i = 0; i < displayedJobs.length; i++) {
    displayedJobs[i].addEventListener("click", function() {
        let thisIncome = this.children[1].innerText;
        let launderedIncome = thisIncome.replace("$", "");
        console.log(launderedIncome);
        jobTitle.innerText = this.children[0].innerText;
        grossAnnual.innerText = "Gross Annual Income: " + thisIncome;
        grossMonth.innerText = "Gross Monthly Income: " + "$" + launderedIncome / 12;
    })
}

