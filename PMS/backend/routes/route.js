var project_controller=require('../controller/projectController');
var user_controller=require('../controller/userController');
var task_controller=require('../controller/taskController');
var backlog_controller=require('../controller/backlogController');
var chat_controller=require('../controller/chatController');

var express=require('express');
var util= require('../util/jwtUtil')
var route=express.Router();

route.get('/projects', util.checkToken, project_controller.getProjects);
route.get('/projects/:id', project_controller.getProjectById);
route.get('/projects/user/:id', project_controller.getProjectByManagerId);
route.get('/projects/backlog/:id', project_controller.getProjectBybacklogId);
route.get('/projects/users/:id', project_controller.getProjectByUserId);
route.post('/projects/add', project_controller.addProject);
route.put('/projects/update/:id', project_controller.updateProject);
route.delete('/projects/delete/:id', project_controller.deleteProject);

route.get('/tasks', util.checkToken, task_controller.getTasks);
route.get('/tasks/:id', task_controller.getTaskById);
route.get('/tasks/backlog/:id', task_controller.getTasksUsingBacklogId);
route.get('/tasks/project/:id', task_controller.getTasksUsingProjectId);
route.post('/tasks/add', task_controller.addTask);
route.put('/tasks/update/:id', task_controller.updateTask);
route.put('/tasks/update/user/:id', task_controller.setUserForTask);
route.delete('/tasks/delete/:id', task_controller.deleteTask);

route.get('/backlogs', backlog_controller.getBacklogs);
route.get('/backlogs/:id', backlog_controller.getBacklogById);
route.get('/backlogs/project/:id', backlog_controller.getBacklogsByProjectId)
route.post('/backlogs/add', backlog_controller.addBacklog);
route.put('/backlogs/update/:id', backlog_controller.updateBacklog);
route.delete('/backlogs/delete/:id', backlog_controller.deleteBacklog);


route.get('/users', user_controller.getUsers);
route.get('/users/:id', user_controller.getUserById);
route.get('/users/project/:id', user_controller.getUsersByProjectId);
route.post('/users/add', user_controller.registerUser);
route.put('/users/update/:id', user_controller.updateUser);
route.delete('/users/delete/:id', user_controller.deleteUser);

route.post('/user/login', user_controller.login);
route.get('/chats', chat_controller.getChat)
route.get('/chats/:fromId/:toId', chat_controller.getChatById)
route.get('/chats/:id', chat_controller.getChatByGroup)
route.post('/chats/add', chat_controller.insertChat)


module.exports=route;