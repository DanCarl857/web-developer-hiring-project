import PropertyModel from './../models/Property';
import express from 'express';
import mongoose from 'mongoose';
import Property from '../interfaces/property.interface';
import Controller from '../interfaces/Controller.interface';
import PropertyNotFoundException from '../exceptions/PropertyNotFoundException';
import HttpException from '../exceptions/HttpException';

class PropertyController implements Controller {
    public path = '/properties';
    public router = express.Router();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllProperties);
        this.router.get(`${this.path}/:id`, this.getPropertyById);
        this.router.patch(`${this.path}/:id`, this.updateProperty);
        this.router.delete(`${this.path}/:id`, this.removeProperty);
        this.router.post(this.path, this.createProperty);

    }

    private createProperty(request: express.Request, response: express.Response, next: express.NextFunction) {
        let propertyData: Property = request.body;
        const createdProperty = new PropertyModel({
            _id: new mongoose.Types.ObjectId(),
            name: propertyData.name,
            price: propertyData.price,
            address: propertyData.address,
            contact: propertyData.contact,
            description: propertyData.description,
            inspected: propertyData.inspected,
            company: propertyData.company
        });
        createdProperty
            .save()
            .then(result => {
                response.status(201).json(result);
            })
            .catch(err => {
                console.log(err);
                next(new HttpException(500, 'Error creating a property'))
            })
    }
    
    private getAllProperties(request: express.Request, response: express.Response, next: express.NextFunction) {
        PropertyModel.find()
            .select('name address price inspected image description contact')
            .populate('company')
            .exec()
            .then(docs => {
                const resp = {
                    count: docs.length,
                    data: docs
                }
                response.status(200).json(resp);
            })
            .catch(err => {
                next(new HttpException(500, 'Error get all properties'))
            });
    }
    
    private getPropertyById(request: express.Request, response: express.Response, next: express.NextFunction) {
        const id = request.params.id;
        PropertyModel.findById(id)
            .select("_id name description inspected price image address contact")
            .exec()
            .then(doc => {
                if (doc) {
                    response.status(200).json({
                        page: doc,
                        request: {
                            type: 'GET',
                            description: 'Get all properties',
                            url: 'http://localhost:7001/properties'
                        }
                    });
                } else {
                    next(new PropertyNotFoundException(id));
                }
            });
    }
    
    private updateProperty(request: express.Request, response: express.Response, next: express.NextFunction) {
        const id = request.params.id;
        const propertyData: Property = request.body;
        PropertyModel.findByIdAndUpdate(id, propertyData, { new: true })
            .then(property => {
                response.status(200).json(property)
            })
            .catch(err => next(new PropertyNotFoundException(id)));
    }
    
    private removeProperty(request: express.Request, response: express.Response, next: express.NextFunction) {
        const id = request.params.id;
        PropertyModel.findByIdAndDelete(id)
            .then(successResponse => {
                if (successResponse) {
                    response.status(200).json({ message: 'Property deleted'})
                } else {
                    next(new PropertyNotFoundException(id));
                }
            })
    }
}

export default PropertyController;