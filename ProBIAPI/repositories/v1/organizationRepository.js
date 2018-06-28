var parentRepository = require('./parentRepository')();

var organizationRepository = function (entities) {
    var Organization = entities.organizationEntity;

    const addOrganization = function (query, callback) {
        var newOrganization = new Organization({
            name: query.name,
            email: query.email,
            addressDetails: query.addressDetails,
            contact: query.contact
        });
        parentRepository.add(newOrganization, function (err, organizations) {
            if (err) {
                err.message = err.message.replace(/document/g, 'organization');
                callback(err);
            } else {
                callback(false, organizations);
            }
        });
    };

    var getOrganizationByID = function (id, callback) {
        parentRepository.getByID(Organization, id, function (err, organization) {
            if (err) {
                err.message = err.message.replace(/document/g, 'Organization');
                callback(err);
            } else {
                callback(false, organization);
            }
        });
    };

    var getAllOrganizations = function (callback) {
        parentRepository.getAll(Organization, function (err, organization) {
            if (err) {
                err.message = err.message.replace(/document/g, 'Organization');
                callback(err);
            } else {
                callback(false, organization);
            }
        });
    };

    var deleteOrganizationByID = function (id, callback) {
        getOrganizationByID(id, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                parentRepository.remove(result, function (err, organization) {
                    if (err) {
                        err.message = err.message.replace(/document/g, 'Organization');
                        callback(err);
                    } else {
                        callback(false, organization);
                    }
                });
            }
        })
    };

    var updateOrganizationByID = function (id, orgUpdate, callback) {
        Organization.findOneAndUpdate({ _id: id }, orgUpdate, function (err, organization) {
            if (err) {
                err.message = err.message.replace(/document/g, 'Organization');
                callback(err);
            } else {
                callback(false, organization);
            }
        })
    };

    return {
        addOrganization: addOrganization,
        getOrganizationByID: getOrganizationByID,
        getAllOrganizations: getAllOrganizations,
        updateOrganizationByID: updateOrganizationByID,
        deleteOrganizationByID: deleteOrganizationByID
    }
}

module.exports = organizationRepository;