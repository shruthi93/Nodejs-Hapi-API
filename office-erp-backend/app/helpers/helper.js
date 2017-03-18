//This file contains all helper methods//
var confs = require('../../config/conf.json');
var log4js = require('log4js');
var logger = log4js.getLogger();
var queryConst = confs.queryParam;
var organizationId = "Simpragma";
module.exports = {
    validateApiKey: function(requestKey) {
        console.log("Inside Validate API key : ", requestKey)
        if (confs.apiKey === requestKey) {
            logger.info("API KEY MATCH")
            return 1;
        } else {
            logger.warn("API KEY NOT MATCHING")
            return 0;
        }
    },
    generateQuery: function(queryParam, value) {
        var queryString;
        logger.info("Inside Generate Query String ..")
        switch (queryParam) {
            case queryConst.empId:
                queryString = {
                    empId: value.toString(),
                    orgId: organizationId
                }
                break;
            case queryConst.orgId:
                queryString = { orgId: organizationId };
                break;
            default:
                logger.info("Query paramas : ", queryString)
        }
        logger.info("Query paramas : ", queryString)
        return queryString
    },
    statusGenerator: function(statusCode, message, description, data, reply) {
        logger.debug("Inside statusGenerator function :- statusCode : ", statusCode, "message : ", message, "description : ", description, "data : ", data);
        var statusMap = {};
        if (statusCode != null) {
            logger.info("Success : ", statusCode);
            statusMap.statusCode = statusCode;
        }
        if (message) {
            logger.info("Msg : ", message);
            statusMap.message = message;
        }
        if (description) {
            logger.info("Description : ", description);
            statusMap.description = description;
        }
        if (data != null) {
            logger.info("Data : ", data);
            statusMap.data = data;
        }
        //return statusMap;
        reply(statusMap);
    },

    updateOrg: function(newObject, orgData) {
        logger.debug("Inside the editFunction : newObject : ", newObject, "orgData : ", orgData);

        if (newObject.orgId) {
            logger.info("newObject orgId : ", newObject.orgId);
            orgData.orgId = newObject.orgId;
        }
        if (newObject.orgName) {
            logger.info("newObject orgName : ", newObject.orgName);
            orgData.orgName = newObject.orgName;
        }
        if (newObject.orgEmail) {
            logger.info("newObject orgEmail : ", newObject.orgEmail);
            orgData.orgEmail = newObject.orgEmail;
        }
        if (newObject.creationDate) {
            logger.info("newObject creationDate : ", newObject.creationDate);
            orgData.creationDate = newObject.creationDate;
        }
        logger.debug("The new data : ", orgData)
        return orgData;
    },

    updateEmployee: function(employeeData, newObject) {
        logger.debug("Inside the updateEmployee :- newObject : ", newObject, "employeeData : ", employeeData);
        if (newObject.empId) {
            employeeData.empId = newObject.empId;
        }
        if (newObject.firstName) {
            employeeData.firstName = newObject.firstName;
        }
        if (newObject.lastName) {
            employeeData.lastName = newObject.lastName;
        }
        if (newObject.birthDate) {
            employeeData.birthDate = newObject.birthDate;
        }
        if (newObject.officialEmail) {
            employeeData.officialEmail = newObject.officialEmail;
        }
        if (newObject.personalEmail) {
            employeeData.personalEmail = newObject.personalEmail;
        }
        if (newObject.designation) {
            employeeData.designation = newObject.designation;
        }
        if (newObject.state) {
            employeeData.state = newObject.state;
        }
        if (newObject.joiningDate) {
            employeeData.joiningDate = newObject.joiningDate;
        }
        if (newObject.leavingDate) {
            employeeData.leavingDate = newObject.leavingDate;
        }
        if (newObject.experience) {
            employeeData.experience = newObject.experience;
        }
        if (newObject.bloodGroup) {
            employeeData.bloodGroup = newObject.bloodGroup;
        }
        if (newObject.mobileNo) {
            employeeData.mobileNo = newObject.mobileNo;
        }
        if (newObject.altMobileNo) {
            employeeData.altMobileNo = newObject.altMobileNo;
        }
        if (newObject.bankAccNo) {
            employeeData.bankAccNo = newObject.bankAccNo;
        }
        if (newObject.IdType) {
            employeeData.IdType = newObject.IdType;
        }
        if (newObject.IdNo) {
            employeeData.IdNo = newObject.IdNo;
        }
        if (newObject.presentAddress) {
            employeeData.presentAddress = newObject.presentAddress;
        }
        if (newObject.permanentAddress) {
            employeeData.permanentAddress = newObject.permanentAddress;
        }
        if (newObject.orgId) {
            employeeData.orgId = newObject.orgId;
        }

        logger.debug("The new data : ", employeeData)
        return employeeData;
    }
}
