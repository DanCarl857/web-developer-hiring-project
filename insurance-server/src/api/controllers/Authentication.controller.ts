import bcrypt from 'bcrypt';
import express from 'express';
import UserWithThatEmailAlreadyExistsException from './../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from './../exceptions/WrongCredentialsException';
import Controller from './../interfaces/Controller.interface';
import UserModel from './../models/User.model';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import HttpException from '../exceptions/HttpException';
import User from '../interfaces/User.interface';

class AuthenticationController implements Controller {
    public path = "/auth";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
      }
     
    private register = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        UserModel.find({ email: request.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    next(new UserWithThatEmailAlreadyExistsException(request.body.email))
                } else {
                    // Hash password
                    bcrypt.hash(request.body.password, 10, (err, hash) => {
                        if (err) {
                            next(new HttpException(500, "Error hashing password"));
                        } else {
                            const user = new UserModel({
                                _id: new mongoose.Types.ObjectId(),
                                email: request.body.email,
                                name: request.body.name,
                                password: hash,
                                phone: request.body.phone,
                                username: request.body.username
                            });
                            user
                                .save()
                                .then(result => {
                                    response.status(201).json(user);
                                })
                                .catch(err => {
                                    next(new HttpException(500, err));
                                })
                        }
                    })
                }
            })
      }
     
    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        UserModel.findOne({ email: request.body.email }, (err: Error, user: User) => {
            if (err) {
                next(new WrongCredentialsException());
            }
            if (!user) {
                next(new HttpException(404, "Unknown user"));
            }
            bcrypt.compare(request.body.password, user.password, (err, result) => {
                if (err) {
                    next(new WrongCredentialsException());
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                    "s3cr3tk3y$$",
                    {expiresIn: "365h"});
                    return response.status(200).json({
                        message: 'Authentication successful',
                        token: token,
                        user: user
                    });
                }
                next(new WrongCredentialsException());
            })
        })
    }
}

export default AuthenticationController;