const EmployeeProfile = require('../models/employee_profiles.model')

const getEmployee = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.findOne({
      where: [{ id: req.body.Employee.id }],
    })
    if(!result){
      return res.json({
        error: 'Employee does not exist',
      })
    }

    return res.json({
      Employee: result,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

module.exports = {getEmployee}
