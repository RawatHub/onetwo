const repositories = require(__dirname + '/../../repositories/v1');
const models = require(__dirname + '/../../models/v1');

const organizationPuppeteer = function (entities) {
    const organizationRepository = repositories.organizationRepository(entities);

    const newOrganization = function (req, res, next) {
        // console.log("triggered!");
        // console.log(req.body);
        organizationRepository.addOrganization(req.body, function (err, organization) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: organization,
                    message: "Successfully Added."
                };
                res.status(200).json(response);
            }
        });
    };

    const getAllOrganizations = function (req, res, next) {
        organizationRepository.getAllOrganizations(function (err, organization) {
            if (err) {
                next(err);
            } else {
                let response = {
                    success: true,
                    data: organization,
                    message: null
                };
                res.status(200).json(response);
            }
        });
    };

    const getOrganizationByID = function (req, res, next) {
        organizationRepository.getOrganizationByID(req.params.id, function (err, organization) {
            if (err) {
                next(err)
            } else {
                let response = {
                    result: true,
                    data: organization,
                    message: null
                };
                res.status(200).json(response);
            }
        })
    };

    const deleteOrganizationByID = function (req, res, next) {
        organizationRepository.deleteOrganizationByID(req.params.id, function (err) {
            if (err) {
                next(err)
            } else {
                let response = {
                    result: true,
                    message: "Successfully Deleted."
                };
                res.status(200).json(response);
            }
        })
    };

    const updateOrganizationByID = function (req, res, next) {
        organizationRepository.updateOrganizationByID(req.params.id, req.body, function (err, organization) {
            if (err) {
                next(err)
            } else {
                let response = {
                    result: true,
                    data: organization,
                    message: "Successfully Updated."
                };
                res.status(200).json(response);
            }
        });
    };

    return {
        newOrganization: newOrganization,
        getAllOrganizations: getAllOrganizations,
        getOrganizationByID: getOrganizationByID,
        deleteOrganizationByID: deleteOrganizationByID,
        updateOrganizationByID: updateOrganizationByID
    }
}

module.exports = organizationPuppeteer;