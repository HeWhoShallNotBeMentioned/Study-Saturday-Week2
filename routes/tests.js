const router = require('express').Router();
const Student = require('../db/models/student');
const Test = require('../db/models/test');

router.get('/', async (req, res, next) => {
    try {
        const allTest = await Test.findAll()
        res.json(allTest);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const individualTest = await Test.findById(req.params.id)
        res.json(individualTest)
    } catch (error) {
        next(error)
    }
})

router.post('/student/:studentId', async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.studentId)
        const test = await Test.create(req.body)
        const studentTest = await test.setStudent(student)
        //console.log("test magic methods ", Object.keys(test.__proto__))
        res.status(201).send(studentTest)
    } catch (error) { 
        next(error)
    }
})

router.delete('/:id', async (req, res, next ) => {
    try {
        await Test.destroy({
            where: {
                id: req.params.id
            }
        })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})




module.exports = router;
