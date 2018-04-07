# Najs Eloquent Rework

This is a v0.3.0 repository for NajsEloquent, all code here is not published and will be copied to najs-eloquent when
the job done.

Classes, terms & scopes

* **Model**: a "original" definition for Model, contains construct functions only
* **IModelProxy**: an interface which extends the Model
* **IModelProxyManager**: an interface which manage model's proxies
* **ModelAttributes**: implements IModelProxy, loaded by default, manipulates attributes including accessors and mutators
* **ModelFillable**: implements IModelProxy, loaded by default, contains all functions related to mass assignment
* **ModelSerialization**: implements IModelProxy, loaded by default, contains functions related to serialization like .toObject(), .toJson()
* **ModelActiveRecord**: implements IModelProxy, loaded by default, contains active record functions
* **ModelTimestamps**: implements IModelProxy, loaded by default, partial included to Model definition
* **ModelSoftDeletes**: implements IModelProxy, loaded by default, partial included to Model definition
* **ModelQuery**: implements IModelProxy, loaded by driver, not included in Model definition, contains query syntax(instance level)
* **Eloquent**: the constructor which creates Model (after proxify) + ModelQuery
* **Mongoose**: the constructor which creates Model with specific mongoose's members like: schema, collection, options
