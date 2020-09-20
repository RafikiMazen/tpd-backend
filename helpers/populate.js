const { salt } = require('../config/keys')
const EmployeeProfile = require('../models/employee_profiles.model')
const Manager = require('../models/managers.model')

// const ProjectAssignment = require('../models/projectassignment.model')
// const ProjectInvitation = require('../models/projectinvitation.model')

// name VARCHAR(256)title VARCHAR(128)hiring_date DATEfunction VARCHAR(128)direct_manager VARCHAR(36)workgroup VARCHAR(128)employment_type VARCHAR(64)allocation_percentage INT(11)skills_last_update_date DATEemployee_email VARCHAR(320)employee_profile_picture VARCHAR(45)mobile_number VARCHAR(20)cost_center VARCHAR(128)

const populateManagers = async () => {
  try {
    const managers = [
      { name: 'Tony modeer' },
      { name: 'Rafiq modeer' },
      { name: 'Manyal modeer' },
      { name: 'Patrick modeer' },
    ]
    const accountsPromises = []
    managers.forEach((manager) => {
      accountsPromises.push(Manager.create(manager))
    })
    await Promise.all(accountsPromises)
  } catch (exception) {
    return exception
  }
}

const populateEmployees = async () => {
  try {
    const employees = [
      { name: 'Jack employee', direct_manager: '1' },
      { name: 'Ayoub employee', direct_manager: '1' },
      { name: 'Mazen employee', direct_manager: '1' },
      { name: 'Cody employee', direct_manager: '1' },
    ]
    const accountsPromises = []
    employees.forEach((account) => {
      accountsPromises.push(EmployeeProfile.create(account))
    })

    await Promise.all(accountsPromises)
  } catch (exception) {
    return exception
  }
}

const populate = async () => {
  await populateManagers()
  await populateEmployees()
}

module.exports = { populate }
