const { salt } = require('../config/keys')
const EmployeeProfile = require('../models/employee_profiles.model')
const SkillCatalog = require('../models/skillcatalog.model')
const Manager = require('../models/managers.model')
var fs = require('fs')
var csv = require('csv')

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
      { name: 'Justin employee', direct_manager: '1' },
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

const populateResourceRequestSkills = async () => {
  try {
    var input = fs.createReadStream('./helpers/csv/test.csv')
    var parser = csv.parse({
      delimiter: ',',
      columns: true,
    })
    var transform = csv.transform(function (row) {
      var resultObj = {
        // category: row['Category'],
        category: row['Category'],
        subcategory: row['SubCategory'],
      }
      SkillCatalog.create(resultObj)
        .then(function () {
          console.log(resultObj, 'Record created')
        })
        .catch(function (err) {
          console.log('Error encountered: ' + err)
        })
    })
    input.pipe(parser).pipe(transform)
  } catch (exception) {
    return exception
  }
}

const populate = async () => {
  await populateManagers()
  await populateEmployees()
  await populateResourceRequestSkills()
}

module.exports = { populate }
