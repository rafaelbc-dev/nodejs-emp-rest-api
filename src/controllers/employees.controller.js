import { loadEmployees } from "../empScrapper.js"
import { readFile, writeFile } from "fs/promises"

export const getEmployees = async (req, res) => {
    try {
        const response = await readEmployees()
        res.json(response)
        
    } catch (error) {
        return res.status(500).json({
            message: "Something's gone wrong"
        })
    }
}

const readEmployees = async () => {
    const data = await readFile('./src/employees.json', 'utf8')
    return JSON.parse(data)
}

export const writeEmployees = async (employees) => {
    const data = writeFile('./src/employees.json', JSON.stringify(employees))
    return ({message: 'Employees saved'})
}

export const getEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const employees = await readEmployees()
        const employee = employees.filter((e) => e.id == id)

        if (employee.length == 0) {
            return res.status(404).json({
                message: "Employee not found"
            })
        }

        res.json(employee)

    } catch (error) {
        return res.status(500).json({
            message: "Something's gone wrong"
        })
    }
}

export const createEmployee = async (req, res) => {
    try {
        let nextId = 0
        let employees = await readEmployees()
        employees.forEach((employee) => {
            if (employee.id > nextId) nextId = employee.id
        })
        nextId++

        const {name, email, salary} = req.body
        const newEmployee = {
            id: nextId,
            name,
            email,
            salary
        }
        employees.push(newEmployee)
        writeEmployees(employees)

        res.send(newEmployee)

    } catch (error) {
        return res.status(500).json({
            message: "Something's gone wrong"
        })
    }
    
}

export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const employees = await readEmployees()
        const newEmployees = employees.filter((employee) => employee.id != id)

        if (newEmployees.length == employees.length) return res.status(404).json({
            message: "Employee not found"
        })

        writeEmployees(newEmployees)

        res.send({message: `Employee with id=${id} deleted successfully`}).status(204)

    } catch (error) {
        return res.status(500).json({
            message: "Something's gone wrong"
        })
    }
    

}

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const {name, email, salary} = req.body

        const employees = await readEmployees()
        let found = false

        const newEmployees = employees.map((employee) => {
            if (employee.id != id) return employee

            found = true
            let newEmployee = {
                id: employee.id,
                name: name ? name : employee.name,
                email: email ? email : employee.email,
                salary: salary ? salary : employee.salary
            }

            return newEmployee
        })

        if (!found) return res.status(404).json({
            message: 'Employee not found'
        })

        writeEmployees(newEmployees)

        res.json(newEmployees.filter((employee) => employee.id == id))

    } catch (error) {
        return res.status(500).json({
            message: "Something's gone wrong"
        })
    }   
}

export const reloadEmployees = async (req, res) => {
    try {
        loadEmployees()
        res.send({message: `Employees have been successfully reloaded`}).status(204)

    } catch (error) {
        return res.status(500).json({
            message: "Something's gone wrong"
        })
    }
}

