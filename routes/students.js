const router = require('express').Router();
const Student = require('../db/models/student');


router.get('/', async (req, res, next) => {
    try {
        const allStudents = await Student.findAll()
        res.json(allStudents)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const foundStudent = await Student.findById(userId)
        if (foundStudent) {
        res.json(foundStudent)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newStudent = req.body
        const newStudentResp = await Student.create(newStudent)
        res.status(201).send(newStudentResp);
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
        try {
        const updateSt = req.body;
        const updateRes = await Student.update(updateSt, {where: {id: req.params.id},returning: true,
            plain: true});
        //console.log("updateRes", updateRes)
        res.json(updateRes[1])
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedRow = await Student.destroy({
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
