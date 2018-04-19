/// <reference path="../../contracts/DriverProvider.d.ts" />
import '../../providers/MongooseProvider';
import { IFacade, IFacadeBase } from 'najs-facade';
import { Mongoose, Model, Schema, Document } from 'mongoose';
export declare const MongooseProviderFacade: Najs.Contracts.Eloquent.MongooseProvider<Mongoose, Schema, Model<Document>> & IFacade;
export declare const MongooseProvider: Najs.Contracts.Eloquent.MongooseProvider<Mongoose, Schema, Model<Document>> & IFacadeBase;
