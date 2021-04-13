'use stric'

let table = document.getElementById('mytable');
let totalsum = document.getElementById('total')


const AddEmployee = function(Name,Email,Department){

    this.Name = Name;
    this.Email = Email;
    this.Department = Department
    this.Salary = this.getRandomInt(100,500)


    AddEmployee.allEmployee.push(this);

}

AddEmployee.allEmployee = []


AddEmployee.prototype.getRandomInt = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}


AddEmployee.prototype.render = function(){

    let index = AddEmployee.allEmployee.length - 1
    
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let Name = document.createElement('td');
        Name.textContent =  AddEmployee.allEmployee[index].Name;
        tr.appendChild(Name);
        let Email = document.createElement('td');
        Email.textContent = AddEmployee.allEmployee[index].Email;
        tr.appendChild(Email);
        let Department = document.createElement('td');
        Department.textContent = AddEmployee.allEmployee[index].Department;
        tr.appendChild(Department);
    
}

AddEmployee.prototype.sumTotal = function(){
    let total = 0

    for(let i = 0 ; i< AddEmployee.allEmployee.length ; i++){
        total += AddEmployee.allEmployee[i].Salary;
    }

    totalsum.textContent = `Total = ${total}`

}


let form = document.getElementById('myform');

form.addEventListener('submit',AddeEmployeeFunc);


function AddeEmployeeFunc(e){

    e.preventDefault()
    
    let Name = e.target.Name.value;
    let Email = e.target.Email.value
    let Department = e.target.Department.value

   let newperson =  new AddEmployee(Name,Email,Department);
    newperson.render()
    console.log(AddEmployee.allEmployee)
    newperson.sumTotal()

    localStorage.setItem('allEmployee',JSON.stringify(AddEmployee.allEmployee))

    form.reset();
}


window.addEventListener('load',function(e){
   let persons = JSON.parse(localStorage.getItem('allEmployee'));

   if(persons.length >0){

   for(let i = 0 ; i < persons.length ; i++){
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let Name = document.createElement('td');
    Name.textContent =  persons[i].Name;
    tr.appendChild(Name);
    let Email = document.createElement('td');
    Email.textContent = persons[i].Email;
    tr.appendChild(Email);
    let Department = document.createElement('td');
    Department.textContent = persons[i].Department;
    tr.appendChild(Department);
   }

   let total = 0

   for(let i = 0 ; i< persons.length ; i++){
       total += persons[i].Salary;
   }

   totalsum.textContent = `Total = ${total}`
   }   
})

