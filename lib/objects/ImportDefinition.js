var util = require('util');
var helpers = require('../helpers');
		
	
var ImportDefinition = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'ImportDefinition';
	
	//this.config = options;
	options = options || {};
	this.def = options.def || {};

	/*
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.	
	if(options.def || this.def) {
		options = {};
		this.def = options.def;
		options = this.def;
		this.config = options;
	}
	*/
};

ImportDefinition.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

ImportDefinition.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for DE retrieval.', documentation: 'https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/data-extension-retrieve.htm'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};
//performRequestMsg
ImportDefinition.prototype.perform = function(cb) {
	this.parent.SoapClient.perform(
		this.objName,
		this.def,
		function(err,res) {
			if (err) {
				console.log('Definition import error.')
				console.error(err.message);
				console.error(err);
				console.log('End of definition import error.')
			} else {
				console.log("Definition imported.");
				console.log(res);
				console.log('Import result: ')
				for (const result of res.body.Results) {
					//for (const property of result.Properties.Property) {
					  //console.log(res);
					  //console.log('Import Good');
					//}
					console.log(result);
				}
				
			}
		}
	);
};

ImportDefinition.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

module.exports = ImportDefinition;