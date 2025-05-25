var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');
// const { stringify } = require('jade/lib/utils');

// Get all Tasks
router.get('/', async function (req, res) {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  res.json(task);
});

// Create Task
router.post('/create', async function (req, res) {
  const { title, desc, priority, created_by, deadline, status, created_at, updated_at, updated_by} = req.body;
  const task = await prisma.task.create({
    data: {
      title: title,
      desc: desc,
      priority: priority,
      deadline: deadline,
      status: status,
      created_by: created_by,
      created_at: created_at,
      updated_at: updated_at,
      updated_by: updated_by
    },
  });
  
  res.send(task);
});

// Update Task
router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { title, desc, priority, created_by, deadline, status, created_at, updated_at, updated_by } = req.body;

  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      desc: desc,
      priority: priority,
      deadline: deadline,
      status: status,
      created_by: created_by,
      created_at: created_at,
      updated_by: updated_by,
      updated_at: updated_at
    },
  });

  res.send(task);
});

// Delete Task
router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

// Soft Delete Task
router.delete('/soft-delete/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      deleted_at: new Date(),
      is_deleted: true,
    },
  });
  res.send(task);
});

module.exports = router;
