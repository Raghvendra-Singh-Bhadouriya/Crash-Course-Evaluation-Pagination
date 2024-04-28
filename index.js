let tbody = document.querySelector("#tbody");
let filterDepartment = document.querySelector("#filterByDepartment");
let filterGender = document.querySelector("#filterByGender");
let sortSalary = document.querySelector("#sortBySalary");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");

let dat;
async function getData(URL){
    try {
        let res = await fetch(URL);
        let finalres = await res.json();
        console.log(finalres)
        showData(finalres.data);
        dat = finalres.data;
    } catch (error) {
        console.log("Error:", error);
    }
}
getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10")


function showData(employee){
    tbody.innerHTML = "";
    employee.forEach( (element,index) => {
        let row = document.createElement("tr");
        row.className = "tablerow";

        let tdId = document.createElement("td");
        tdId.className = "tdId";
        tdId.textContent = index+1;

        let tdSrc = document.createElement("td");
        tdSrc.className = "tdSrc";

        let image = document.createElement("img");

        image.src = element.image;

        let tdName = document.createElement("td");
        tdName.textContent = element.name;

        let tdGender = document.createElement("td");
        tdGender.textContent = element.gender;

        let tdDepartment = document.createElement("td");
        tdDepartment.textContent = element.department;

        let tdSalary = document.createElement("td");
        tdSalary.textContent = element.salary;

        tdSrc.appendChild(image);
        row.append(tdId, tdSrc, tdName, tdGender, tdDepartment, tdSalary);
        tbody.append(row);

    });
}


function departmentFilter(){
    let arr;
    let value = filterDepartment.value
  arr = dat.filter(element => {
        return value == element.department;
    });
    showData(arr);
}
filterDepartment.addEventListener("change",departmentFilter)


function genderFilter(){
    let arr;
    let value = filterGender.value
  arr = dat.filter(element => {
        return value == element.gender;
    });
    showData(arr);
}
filterGender.addEventListener("change",genderFilter);


function salarySort(){
    let arr;
    let value = sortSalary.value;
    if(value == "asc"){
        arr = dat.sort((a,b) => {
            return a.salary - b.salary;
        })
    }else if(value == "desc"){
        arr = dat.sort((a,b) => {
            return b.salary - a.salary;
        })
    }
    showData(arr);
}
sortSalary.addEventListener("change",salarySort);


let currentPage = 1;
let totalPage = 1;

function handlenextBtn(){
    let page;
    if(currentPage > totalPage){
        page = currentPage++;
    }
    getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`)
}
nextBtn.addEventListener("click",handlenextBtn);


function handlePrevBtn(){
    let page;
    if(currentPage > 1){
        page = currentPage--;
    }
    getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`)
}
prevBtn.addEventListener("click",handlePrevBtn);