var util = require('util');
var helpers = require('../helpers');
	
/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/email-create.htm
https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-create.html
*/	
	
var Account = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'Account';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

Account.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

Account.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for Email retrieval.', documentation: 'https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/email-create.htm'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};

Account.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

Account.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};



module.exports = Account;