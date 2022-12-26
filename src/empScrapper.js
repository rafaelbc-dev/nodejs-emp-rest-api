import fetch from "node-fetch"
import { writeEmployees } from "./controllers/employees.controller.js"


export const loadEmployees = (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
            let employees = data.map((employee) => ({
                id: employee.id,
                name: employee.name,
                email: employee.email,
                salary: function() {return Math.floor(Math.random() * 20000)}()
            }))
            // console.log(employees)
            writeEmployees(employees)
        })
        .catch((e) => console.log(e))
}
