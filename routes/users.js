const express = require("express");

const UserService = require("../services/user.service");
const validatorHandler = require("./../middleware/validator.handler");

const { createUserSchema, updateUserSchema } = require("../schemas/user.schema");

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await service.findOne(id);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/",
    validatorHandler(createUserSchema, "body"),
    async (req, res, next) => {
        try {
          const body = req.body;
          const newCategory = await service.create(body);
          res.json(newCategory);
        } catch (err) {
          next(err);
        }
  }
);

router.patch('/:id', 
    validatorHandler(updateUserSchema, "body"),
    async(req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const update = await service.update(id, body);
    res.status(201).json(update);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async(req, res, next) => {
  try {
    const { id } = req.params;

    const object = await service.delete(id);
    res.json([`Object with id:${id} eliminado`, object]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
