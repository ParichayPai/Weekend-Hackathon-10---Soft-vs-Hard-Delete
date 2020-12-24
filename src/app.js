const express = require('express');
const Student = require('./models/Student');


const app = express();

// middleware 
app.use(express.json());

// Routes

// Get all the students
app.get('/students', async (req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);
    } catch(err) {
        res.status(404).json({
            err
        })
    }
})

// Add student to database
app.post('/students', async (req, res) =>{
    // write your codes here
    try{
        const student = await Student.create(req.body);
        res.status(201).json(student);
    }catch(err){
        res.status(400).json({
            err
        })
    }
})

// Get specific student
app.get('/students/:id', async (req, res) =>{
    // write your codes here
    try{
        const student = await Student.findById(req.params.id);
        res.status(200).json(student)
    }catch(err){
        res.status(404).json({
            err
        })
    }
})

// delete specific student
app.delete('/students/:id', async (req, res) =>{
    // write your codes here
    try{
        const query = req.query.type;
        if(!query) return;
        if(query === 'hard'){
            const student = Student.findByIdAndDelete(id).then(() => res.send(id)).catch(err =>  res.status(404).send(err.message));
            // const delStudent = await Student.findByIdAndDelete(req.params.id);
            res.json(student);
        }else if(query === 'soft'){
            const student = await Student.findByIdAndUpdate(req.params.id, {isDeleted: true}, {
                new: true,
                runValidators: true
            });
            if(!student){
                return res.status(404).send("Error");
            }
            res.status(200).json({
                status:"success",
                data:{
                    student
                }
            });
        }
    }catch(err){
        res.status(500).json({
            status:"fail",
            message: err
        });
    }
}) 


module.exports = app;
