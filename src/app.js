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
    const query = req.query.type; // /students/:id?type=hard
    const id = req.params.id; 
    if(!query) return;
    if(query === 'hard'){
        // const student = Student.findByIdAndDelete(id).then(() => res.send(id)).catch(err =>  res.status(404).send(err.message));
        const student = await Student.findByIdAndDelete(id);
        res.status(200) //.json(student);
    }else if(query === 'soft'){
        const student = await Student.findByIdAndUpdate(req.params.id, {isDeleted: true}, {
            new: true,
            runValidators: true
        });
        if(!student){
            return res.status(404) //.send(err.message);
        }
        res.status(200) //.json(student);
    }
}) 
// app.delete("/students/:id", async (req, res) => {
//     const id = req.params.id;
//     const type = req.query.type;
//     console.log(id, type);

//     const getStudent = await Student.findById(id);

//     if (isNullOrUndefined(getStudent) && isNullOrUndefined(type)) {
//         res.sendStatus(404);
//     } else {
//         if (type.toLowerCase() === "soft") {
//             if (getStudent.isDeleted === true) {
//                 res.sendStatus(404);
//             } else {
//                 await Student.updateOne({ _id: id }, { isDeleted: true });
//                 res.sendStatus(200);
//             }
//         }
//         else if (type.toLowerCase() === "hard") {
//             if (getStudent.isDeleted === true) {
//                 res.sendStatus(404);
//             } else {
//                 await Student.deleteOne({ _id: id });
//                 res.sendStatus(200);
//             }
//         }
//     }
// });


module.exports = app;
