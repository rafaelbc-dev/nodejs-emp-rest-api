import { Router } from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee, reloadEmployees } from "../controllers/employees.controller.js";

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)

router.post('/employees', createEmployee)

router.delete('/employees/:id', deleteEmployee)

// Con 'put' se actualizan todos los valores/campos de un registro
router.put('/employees/:id', updateEmployee)

// En cambio, con 'patch' se pueden actualizar sólo algunos valores/campos
router.patch('/employees/:id', updateEmployee)

// Reinicialización
router.get('/reload', reloadEmployees)



export default router