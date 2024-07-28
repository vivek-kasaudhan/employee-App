import employeeModel from "../models/employeeModel.js"


export const createEmployeectrl = async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, course } = req.body;
        const imageFilename = req.file.filename

        
        if (!name) {
            return res.status(400).send({ success: false, message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ success: false, message: 'Email is required' });
        }
        if (!mobileNo) {
            return res.status(400).send({ success: false, message: 'Mobile number is required' });
        }
        if (!designation) {
            return res.status(400).send({ success: false, message: 'Designation is required' });
        }
        if (!gender) {
            return res.status(400).send({ success: false, message: 'Gender is required' });
        }
        if (!course) {
            return res.status(400).send({ success: false, message: 'Course is required' });
        }
      

        //  employee already exists
        const existingEmployee = await employeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(409).send({ success: false, message: 'Employee already exists' });
        }

        // Create  the new employee
        const newEmployee = new employeeModel({ name, email, mobileNo, designation, gender, course, avatar:imageFilename });
        await newEmployee.save();
        
        return res.status(201).send({
            success: true,
            message: 'Employee created successfully',
            newEmployee
        });
    } catch (error) {
        // Handle any other errors
        return res.status(500).send({
            success: false,
            message: 'Error in createEmployee controller',
            error: error.message
        });
    }
};
export const getAllEmployeectrl  = async(req,res)=>{
    try {
        const employees  =  await employeeModel.find({})
       return res.status(201).send({
            success:true,
            total :employees.length,
            employees
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in getEmployee controller',
            error: error.message
        });
    }
}

//
export const getSingleEmployeectrl =  async(req,res)=>{
    try {
        const{id} =  req.params
        const employee  =  await employeeModel.findById(id)
        if(!employee){
            return res.send('no employee found')
        }
        res.status(201).send({
            success:true,
            message:'employee found',
            employee
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in single employee ctrl ',
            error:error.message
        })
    }
}

export const updateEmployeectrl = async(req,res)=>{
    try {
        const {name,email,designation,course,mobileNo,gender} = req.body
        const { id } = req.params; 

     
        const user  =  await employeeModel.findById(id)
        const avatarFileName = req.file ? req.file.filename : user.avatar;

        const UpdatedEmployee =  await employeeModel.findByIdAndUpdate(id,{
            name:name|| user.name,
            email:email||user.email,
            designation:designation ||user.designation,
            course:course||user.course,
            mobileNo:mobileNo||user.mobileNo,
            gender:gender||user.gender,
            avatar:avatarFileName
        },{new:true})

        return res.status(201).send({
            success:true,
            message:'updated',
            UpdatedEmployee,
            
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in updateEmployee controller',
            error: error.message
                     });
                 }
    }

    export const deleteSingleEmployeectrl =  async(req,res)=>{
        try {
            const { id } = req.params; 
            const employee =  await employeeModel.findByIdAndDelete(id)

            res.status(201).send({
                success:false,
                message:'employee deleted successfully' ,

            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'error in employee delete ctrl',
                error,
            })
        }
    }
