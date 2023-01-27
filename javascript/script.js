const jobTemplate = document.getElementById("job-template");
const jobList = document.getElementById("job-list");
const sortTriangles = document.getElementsByClassName("triangle");

console.log(sortTriangles)

const jobs = [
    {work: "Accountant", income: 50000}, 
    {work: "nothing", income: 2400}, 
    {work: "homeless", income: 24}, 
    {work: "car", income: -50},
    {work: "chair", income: 70},
    {work: "josh", income: 3},
    {work: "student", income: -4}
]

// adds and clones job information into HTML template tag
for (let i = 0; i < jobs.length; i++) {
    const element = jobs[i];
    // first child to access through document-fragment
    const job = jobTemplate.content.cloneNode(true).children[0];
    // target with querySelector due to getElementById errors
    const jobName = job.querySelector("[job-name]");
    const jobIncome = job.querySelector("[job-income]");
    console.log(element.work);
    console.log(element.income);
    jobName.textContent = element.work;
    jobIncome.textContent = element.income;
    jobList.append(job);
}

// function triangleRight() {
//     const element = document.getElementById("tri")
// }


// sortTriangles.addEventListener('click'), (MouseEvent) => {}