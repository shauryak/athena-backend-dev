'use strict';

const { APIAI_TOKEN } = require('../config/config');

const express = require('express');
const app = express();
const cors = require('cors');
var router = express.Router();
var sql = require('../data/msSqlUtil')
const apiai = require('apiai')(APIAI_TOKEN);
const mysql = require('mysql');
const requestModule = require('request');
var base64Img = require('base64-img');
const download = require('image-downloader');
const baseUrl = require('../constants/baseUrl').BASE_URL;

module.exports.getBotResponse = function (req, res, next) {

  if (!req.query.userId) return res.status(400).send("userId cannot be empty");
  if (!req.query.q) return res.status(400).send("user query q cannot be empty");
  const userId = req.query.userId;
  const text = req.query.q;


  let apiaiReq = apiai.textRequest(text, {
    sessionId: userId
  });


  apiaiReq.on('response', (response) => {

    let paramteresJson = response.result.parameters;

    let contextJson = response.result.contexts;
    if (typeof contextJson !== 'undefined' && contextJson) {
      let length = contextJson.length;

      if (length > 0) {
        if (typeof contextJson[length - 1].parameters !== 'undefined' && contextJson[length - 1].parameters) {
          paramteresJson = contextJson[length - 1].parameters;
        }
      }

    }

    //  console.log(paramteresJson);

    let entity0 = "",
      entity1 = "",
      entity2 = "",
      entity3 = "",
      entity4 = "",
      entity5 = "",
      sector = "",
      businessUnit = "",
      division = "",
      subDivision = "",
      department = "",
      subDepartment = "",
      company = "",
      grade = "",
      level = "",
      year = "",
      domainType = "",
      gender = "",
      ageGroup = "",
      startDate = "",
      endDate = "",
      listSort = "",
      groupBy = "",
      tenureGroup = "",
      month = "",
      employeeGroup = "",
      spanOfControl = "",
      date = "",
      filter = "",
      filter1 = "",
      typeDuration = "",
      operator = "",
      sysNumber = "",
      yoy = "",
      percentage = "",
      overallAFStransfer = "",
      difference = "",
      which = "",
      Year = "",
      kpi_transfers = "",
      kpi_transfers1 = "",
      headcountgrowthKPI = "",
      businessFunction = "",
      transferFlag = "",
      common_others_bf = "",
      band = "",
      Group_by2 = "",
      kpi_attrition = "",
      employeeGroup1 = "",
      employeeGroup2 = "",
      age = "",
      tenure = "",
      sizeOfTeam = "",
      differenceTransfers = "",
      maximumPerformers = "",
      timeLevel = "",
      compare = "",
      compare1 = "",
      sysNumber1 = "",
      operator1 = "",
      versus = ""
      // compare_value ="",
      // compare_value1 = ""

      ;

    // console.log(paramteresJson);

    var json = {};

    if (paramteresJson) {

      if (paramteresJson.kpi_name) {
        entity1 = paramteresJson.kpi_name;
        if (paramteresJson.kpi_name.kpi_name) entity1 = paramteresJson.kpi_name.kpi_name;
      }
      if (paramteresJson.kpi_name1) entity2 = paramteresJson.kpi_name1;
      if (paramteresJson.Commonly_used_terms) entity3 = paramteresJson.Commonly_used_terms;
      if (paramteresJson.Transfer_flag) transferFlag = paramteresJson.Transfer_flag;
      if (paramteresJson.which) which = paramteresJson.which;
      if (paramteresJson.percentage) percentage = paramteresJson.percentage;
      if (paramteresJson.overall_afs_avg) overallAFStransfer = paramteresJson.overall_afs_avg;
      if (paramteresJson.difference) difference = paramteresJson.difference;
      if (paramteresJson.difference_transfers) differenceTransfers = paramteresJson.difference_transfers;
      if (paramteresJson.size_of_team) sizeOfTeam = paramteresJson.size_of_team;
      if (paramteresJson.maximum_performers) maximumPerformers = paramteresJson.maximum_performers;
      if (paramteresJson.Time_level_PP) timeLevel = paramteresJson.Time_level_PP;
      if (paramteresJson.Group_by) groupBy = paramteresJson.Group_by;
      if (paramteresJson.number) sysNumber = paramteresJson.number;
      if (paramteresJson.list_sort) entity3 = "LIST";
      if (paramteresJson.greaterthan_lessthan) operator = paramteresJson.greaterthan_lessthan;
      if (paramteresJson.greaterthan_lessthan1) operator1 = paramteresJson.greaterthan_lessthan1;
      if (paramteresJson.versus) {
        let versusfilterValue = paramteresJson.versus;
        let versusFilter = "";
        if(versusfilterValue.compare_value && versusfilterValue.compare_value1){
         
          let comparefilterValue = versusfilterValue.compare_value;
          if (comparefilterValue.Sector) {
            sysNumber = comparefilterValue.Sector;
            versusFilter = "Sector";
          }
         else if (comparefilterValue.business_unit){
          sysNumber = comparefilterValue.business_unit;
          versusFilter = "business_unit";
         } 
         else if (comparefilterValue.business_function) {
          sysNumber = comparefilterValue.business_function;
          versusFilter = "business_function";
          }
         else if (comparefilterValue.Sub_division) {
          sysNumber = comparefilterValue.Sub_division;
          versusFilter = "Sub_division";
         }
         else if (comparefilterValue.Division){
          sysNumber = comparefilterValue.Division;
          versusFilter = "Division";
          }
         else if (comparefilterValue.Band){
          sysNumber = comparefilterValue.Band;
          versusFilter = "Band";
          }
         else if (comparefilterValue.Employee_Group){
          sysNumber = comparefilterValue.Employee_Group;
          versusFilter = "Employee_Group";
          }
         else if (comparefilterValue.employee_grade) {
          sysNumber = comparefilterValue.employee_grade;
          versusFilter = "employee_grade";
          }
         else if (comparefilterValue.age_group) {
          sysNumber = comparefilterValue.age_group;
          versusFilter = "age_group";
         }
         else if (comparefilterValue.domain_type) {
          sysNumber = comparefilterValue.domain_type;
          versusFilter = "domain_type";
          }
         else if (comparefilterValue.Gender) {
           sysNumber = comparefilterValue.Gender;
           versusFilter = "Gender";
          }
         else if (comparefilterValue.Year) {
           sysNumber = comparefilterValue.Year;
           versusFilter = "Year";
          }
         else if (comparefilterValue["date-period"]) {
           sysNumber = comparefilterValue["date-period"];
           versusFilter = "date-period";
          }
         else if (comparefilterValue.number) {
           sysNumber = comparefilterValue.number;
           versusFilter = "number";
          }
         else if (comparefilterValue.Department) {
           sysNumber = comparefilterValue.Department;
           versusFilter = "Department";
          }
         else if (comparefilterValue.Sub_department) {
           sysNumber = comparefilterValue.Sub_department;
           versusFilter = "Sub_department";
          }
         else if (comparefilterValue.company) {
           sysNumber = comparefilterValue.company;
           versusFilter = "company";
          }
         
          let comparefilterValue1 = versusfilterValue.compare_value1;

          if (comparefilterValue1[versusFilter]) {
            sysNumber1 = comparefilterValue1[versusFilter];
          }

          compare = compare1 = filter = versusFilter;
          groupBy = "group_by";
          versus = "versus";
        }
      
      
      }

      if (paramteresJson.value_needed) {
        let value_needed = paramteresJson.value_needed;
        if (value_needed.filter) filter = value_needed.filter;
        if (value_needed.duration_type) typeDuration = value_needed.duration_type;

      }
      if (paramteresJson.top_bottom) entity4 = paramteresJson.top_bottom;
      if (paramteresJson.FollowupByDimensions && paramteresJson.FollowupByDimensions.filter) filter = paramteresJson.FollowupByDimensions.filter;
      if (paramteresJson.FollowupByDimensions && paramteresJson.FollowupByDimensions.duration_type) typeDuration = paramteresJson.FollowupByDimensions.duration_type;


      if (paramteresJson.Dynamic_filter_group_by) {
        var dynamicFilter = paramteresJson.Dynamic_filter_group_by;
        if (dynamicFilter.KPI_name) {
          entity1 = dynamicFilter.KPI_name;
          if (dynamicFilter.KPI_name.kpi_name) entity1 = dynamicFilter.KPI_name.kpi_name;
        }

        if (dynamicFilter.Group_by) groupBy = dynamicFilter.Group_by;
        if(dynamicFilter.value1){
          if(dynamicFilter.value1.filter) filter1 = dynamicFilter.value1.filter;
        }
        if (dynamicFilter.value) {
          var dynamicFilterValue = dynamicFilter.value;
          if (dynamicFilterValue.filter) filter = dynamicFilterValue.filter;
          if (dynamicFilterValue.YOY) yoy = dynamicFilterValue.YOY;
          if (dynamicFilterValue.kpi_name) filter = dynamicFilterValue.kpi_name;
          if (dynamicFilterValue.duration_type) typeDuration = dynamicFilterValue.duration_type;
          if (dynamicFilterValue.yoy_true) yoy = dynamicFilterValue.yoy_true;

          if (dynamicFilterValue["FollowupWhereFilter"]) {
            let followupdynamicfilterValue = dynamicFilterValue["FollowupWhereFilter"];
            if (followupdynamicfilterValue.Sector) sector = followupdynamicfilterValue.Sector;
            if (followupdynamicfilterValue.business_unit) businessUnit = followupdynamicfilterValue.business_unit;
            if (followupdynamicfilterValue.business_function) businessFunction = followupdynamicfilterValue.business_function;
            if (followupdynamicfilterValue.Sub_division) subDivision = followupdynamicfilterValue.Sub_division;
            if (followupdynamicfilterValue.Division) division = followupdynamicfilterValue.Division;
            if (followupdynamicfilterValue.Band) band = followupdynamicfilterValue.Band;
            if (followupdynamicfilterValue.Employee_Group) employeeGroup = followupdynamicfilterValue.Employee_Group;
            if (followupdynamicfilterValue.employee_grade) grade = followupdynamicfilterValue.employee_grade;
            if (followupdynamicfilterValue.age_group) ageGroup = followupdynamicfilterValue.age_group;
            if (followupdynamicfilterValue.domain_type) domainType = followupdynamicfilterValue.domain_type;
            if (followupdynamicfilterValue.Gender) gender = followupdynamicfilterValue.Gender;
            if (followupdynamicfilterValue.Year) year = followupdynamicfilterValue.Year;
            if (followupdynamicfilterValue["date-period"]) date = followupdynamicfilterValue["date-period"];
            if (followupdynamicfilterValue.number) sysNumber = followupdynamicfilterValue.number;
            if (followupdynamicfilterValue.Department) department = followupdynamicfilterValue.Department;
            if (followupdynamicfilterValue.Sub - department) subDepartment = followupdynamicfilterValue.Sub - department;
            if (followupdynamicfilterValue.company) company = followupdynamicfilterValue.company;
          }

        }


        if (dynamicFilter.FollowupWhereFilter) {
          let followup = dynamicFilter.FollowupWhereFilter;

          if (followup.Sector) sector = followup.Sector;
          if (followup.business_unit) businessUnit = followup.business_unit;
          if (followup.business_function) businessFunction = followup.business_function;
          if (followup.Sub_division) subDivision = followup.Sub_division;
          if (followup.Division) division = followup.Division;
          if (followup.Band) band = followup.Band;
          if (followup.Employee_Group) employeeGroup = followup.Employee_Group;
          if (followup.employee_grade) grade = followup.employee_grade;
          if (followup.age_group) ageGroup = followup.age_group;
          if (followup.domain_type) domainType = followup.domain_type;
          if (followup.Gender) gender = followup.Gender;
          if (followup.Year) year = followup.Year;
          if (followup["date-period"]) date = followup["date-period"];
          if (followup.number) sysNumber = followup.number;
          if (followup.Department) department = followup.Department;
          if (followup.Sub - department) subDepartment = followup.Sub - department;
          if (followup.company) company = followup.company;
        }

      }


      if (paramteresJson.FollowupWhereFilter) {
        var followup = paramteresJson.FollowupWhereFilter;

        if (followup.Sector) sector = followup.Sector;
        if (followup.business_unit) businessUnit = followup.business_unit;
        if (followup.business_function) businessFunction = followup.business_function;
        if (followup.Sub_division) subDivision = followup.Sub_division;
        if (followup.Division) division = followup.Division;
        if (followup.Band) band = followup.Band;
        if (followup.Employee_Group) employeeGroup = followup.Employee_Group;
        if (followup.employee_grade) grade = followup.employee_grade;
        if (followup.age_group) ageGroup = followup.age_group;
        if (followup.domain_type) domainType = followup.domain_type;
        if (followup.Gender) gender = followup.Gender;
        if (followup.Year) year = followup.Year;
        if (followup["date-period"]) date = followup["date-period"];
        if (followup.number) sysNumber = followup.number;
        if (followup.Department) department = followup.Department;
        if (followup.Sub - department) subDepartment = followup.Sub - department;
        if (followup.company) company = followup.company;
      }


      if (paramteresJson.Dynamic_filter) {
        var Dynamic_filter = paramteresJson.Dynamic_filter;
        if (Dynamic_filter.kpi_name && Dynamic_filter.kpi_name.kpi_name) entity1 = Dynamic_filter.kpi_name.kpi_name;
        if (Dynamic_filter.compare && Dynamic_filter.compare.where) compare = Dynamic_filter.compare.where;
        if (Dynamic_filter.compare1 && Dynamic_filter.compare1.where) compare1 = Dynamic_filter.compare1.where;
        if (Dynamic_filter.compare_value && Dynamic_filter.compare_value.where) sysNumber = Dynamic_filter.compare_value.where;
        if (Dynamic_filter.compare_value1 && Dynamic_filter.compare_value1.where) sysNumber1 = Dynamic_filter.compare_value1.where;
        if (Dynamic_filter.greaterthan_lessthan) operator = Dynamic_filter.greaterthan_lessthan;
        if (Dynamic_filter.greaterthan_lessthan1) operator1 = Dynamic_filter.greaterthan_lessthan1;
      }



      if (paramteresJson.Dimension) {
        var Dimension = paramteresJson.Dimension;

        if (Dimension.greaterthan_lessthan) operator = Dimension.greaterthan_lessthan;

        if (Dimension.FollowupWhereFilter) {
          var followupwherefilter = Dimension.FollowupWhereFilter;
          if (followupwherefilter.Sector) sector = followupwherefilter.Sector;
          if (followupwherefilter.business_unit) businessUnit = followupwherefilter.business_unit;
          if (followupwherefilter.business_function) businessFunction = followupwherefilter.business_function;
          if (followupwherefilter.Sub_division) subDivision = followupwherefilter.Sub_division;
          if (followupwherefilter.Division) division = followupwherefilter.Division;
          if (followupwherefilter.Band) band = followupwherefilter.Band;
          if (followupwherefilter.Employee_Group) employeeGroup = followupwherefilter.Employee_Group;
          if (followupwherefilter.employee_grade) grade = followupwherefilter.employee_grade;
          if (followupwherefilter.age_group) ageGroup = followupwherefilter.age_group;
          if (followupwherefilter.domain_type) domainType = followupwherefilter.domain_type;
          if (followupwherefilter.Gender) gender = followupwherefilter.Gender;
          if (followupwherefilter.Year) year = followupwherefilter.Year;
          if (followupwherefilter["date-period"]) date = followupwherefilter["date-period"];
          if (followupwherefilter.number) sysNumber = followupwherefilter.number;
          if (followupwherefilter.Department) department = followupwherefilter.Department;
          if (followupwherefilter.Sub - department) subDepartment = followupwherefilter.Sub - department;
          if (followupwherefilter.company) company = followupwherefilter.company;

          if (Dimension.FollowupWhereFilter1) {
            var followupwherefilter1 = Dimension.FollowupWhereFilter1;

            if (followupwherefilter1.Sector) sector = followupwherefilter1.Sector;
            if (followupwherefilter1.business_unit) businessUnit = followupwherefilter1.business_unit;
            if (followupwherefilter1.business_function) businessFunction = followupwherefilter1.business_function;
            if (followupwherefilter1.Sub_division) subDivision = followupwherefilter1.Sub_division;
            if (followupwherefilter1.Division) division = followupwherefilter1.Division;
            if (followupwherefilter1.Band) band = followupwherefilter1.Band;
            if (followupwherefilter1.Employee_Group) employeeGroup = followupwherefilter1.Employee_Group;
            if (followupwherefilter1.employee_grade) grade = followupwherefilter1.employee_grade;
            if (followupwherefilter1.age_group) ageGroup = followupwherefilter1.age_group;
            if (followupwherefilter1.domain_type) domainType = followupwherefilter1.domain_type;
            if (followupwherefilter1.Gender) gender = followupwherefilter1.Gender;
            if (followupwherefilter1.Year) year = followupwherefilter1.Year;
            if (followupwherefilter1["date-period"]) date = followupwherefilter1["date-period"];
            if (followupwherefilter1.number) sysNumber = followupwherefilter1.number;
            if (followupwherefilter1.Department) department = followupwherefilter1.Department;
            if (followupwherefilter1.Sub - department) subDepartment = followupwherefilter1.Sub - department;
            if (followupwherefilter1.company) company = followupwherefilter1.company;
          }

          if (Dimension.FollowupWhereFilter2) {
            var followupwherefilter2 = Dimension.FollowupWhereFilter2;

            if (followupwherefilter2.Sector) sector = followupwherefilter2.Sector;
            if (followupwherefilter2.business_unit) businessUnit = followupwherefilter2.business_unit;
            if (followupwherefilter2.business_function) businessFunction = followupwherefilter2.business_function;
            if (followupwherefilter2.Sub_division) subDivision = followupwherefilter2.Sub_division;
            if (followupwherefilter2.Division) division = followupwherefilter2.Division;
            if (followupwherefilter2.Band) band = followupwherefilter2.Band;
            if (followupwherefilter2.Employee_Group) employeeGroup = followupwherefilter2.Employee_Group;
            if (followupwherefilter2.employee_grade) grade = followupwherefilter2.employee_grade;
            if (followupwherefilter2.age_group) ageGroup = followupwherefilter2.age_group;
            if (followupwherefilter2.domain_type) domainType = followupwherefilter2.domain_type;
            if (followupwherefilter2.Gender) gender = followupwherefilter2.Gender;
            if (followupwherefilter2.Year) year = followupwherefilter2.Year;
            if (followupwherefilter2["date-period"]) date = followupwherefilter2["date-period"];
            if (followupwherefilter2.number) sysNumber = followupwherefilter2.number;
            if (followupwherefilter2.Department) department = followupwherefilter2.Department;
            if (followupwherefilter2.Sub-department) subDepartment = followupwherefilter2.Sub-department;
            if (followupwherefilter2.company) company = followupwherefilter2.company;
          }

        }

      }

      if (date.length > 10) {
        paramteresJson["date-period"] = date;
        date = "";
      }

      if (paramteresJson.date) {
        date = paramteresJson.date;
      }

      else {

        if (paramteresJson["date-period"]) {

          let datePeriod = paramteresJson["date-period"];

          if (datePeriod.includes("/")) {
            var result = datePeriod.split("/");
            startDate = result[0];
            endDate = result[1];
          }

          //  date = datePeriod;
          if (paramteresJson["date-period"].startDate && paramteresJson["date-period"].endDate) {
            startDate = paramteresJson["date-period"].startDate;
            endDate = paramteresJson["date-period"].endDate;
          }
        }

      }

      if (!paramteresJson["date-period"] && year) {
        date = year;
      }
    }

    // if (text) json.question = text;
    // if (entity0) json.entity0 = entity0;
    // if (entity1) json.entity1 = entity1;
    // if (entity2) json.entity2 = entity2;
    // if (entity3) json.entity3 = entity3;
    // if (filter) json.filter = filter;
    // if (entity4) json.entity4 = entity4;
    // if (entity5) json.entity5 = entity5;
    // if (sector) json.sector = sector;
    // if (businessUnit) json.businessUnit = businessUnit;
    // if (division) json.division = division;
    // if (subDivision) json.subDivision = subDivision;
    // if (department) json.department = department;
    // if (subDepartment) json.subDepartment = subDepartment;
    // if (company) json.company = company;
    // if (grade) json.grade = grade;
    // if (timeLevel) json.level = timeLevel;
    // if (date) json.date = date;
    // if (domainType) json.domainType = domainType;
    // if (gender) json.gender = gender;
    // if (ageGroup) json.ageGroup = ageGroup;
    // if (startDate) json.startDate = startDate;
    // if (endDate) json.endDate = endDate;
    // if (groupBy) json.groupBy = groupBy;
    // if (tenureGroup) json.tenureGroup = tenureGroup;
    // if (month) json.month = month;
    // if (employeeGroup) json.employeeGroup = employeeGroup;
    // if (spanOfControl) json.spanOfControl = spanOfControl;
    // if (which) json.which = which;
    // if (typeDuration) json.typeDuration = typeDuration;
    // if (operator) json.operator = operator;
    // if (sysNumber) json.sysNumber = sysNumber;
    // if (yoy) json.yoy = yoy;
    // if (percentage) json.percentage = percentage;
    // if (overallAFStransfer) json.overallAFStransfer = overallAFStransfer;
    // if (difference) json.difference = difference;
    // if (businessFunction) json.businessFunction = businessFunction;
    // if (transferFlag) json.transferFlag = transferFlag;
    // if (band) json.band = band;
    // if (age) json.json.age = age;
    // if (tenure) json.tenure = tenure;
    // if (sizeOfTeam) json.sizeOfTeam = sizeOfTeam;
    // if (compare) json.compare = compare;
    // if (compare1) json.compare1 = compare1;
    // if (sysNumber1) json.sysNumber1 = sysNumber1;
    // if (operator1) json.operator1 = operator1;

    var json = {
      "question": text,
      "entity0": entity0,
      "entity1": entity1,
      "entity2": entity2,
      "entity3": entity3,
      "filter": filter,
      "filter1":filter1,
      "entity4": entity4,
      // "entity5" : entity5,
      "sector": sector,
      "businessUnit": businessUnit,
      "division": division,
      "subDivision": subDivision,
      "department": department,
      "subDepartment": subDepartment,
      "company": company,
      "grade": grade,
      "level": timeLevel,
      "date": date,
      "domainType": domainType,
      "gender": gender,
      "ageGroup": ageGroup,
      "startDate": startDate,
      "endDate": endDate,
      "listSort": "",
      "groupBy": groupBy,
      "tenureGroup": tenureGroup,
      "month": month,
      "employeeGroup": employeeGroup,
      "spanOfControl": spanOfControl,
      "which": which,
      "typeDuration": typeDuration,
      "operator": operator,
      "sysNumber": sysNumber,
      "yoy": yoy,
      "percentage": percentage,
      "overallAFStransfer": overallAFStransfer,
      "difference": difference,
      "businessFunction": businessFunction,
      "transferFlag": transferFlag,
      "band": band,
      "age": age,
      "tenure": tenure,
      "sizeOfTeam": sizeOfTeam,
      "compare": compare,
      "compare1": compare1,
      "sysNumber1": sysNumber1,
      "operator1": operator1,
      "versus" : versus

      // "employeeGroup1": employeeGroup1,
      // "employeeGroup2": employeeGroup2

    };

  //  console.log("DL model request body is " + JSON.stringify(json, null, 4));

    let employeeId = userId;

    var query = 'SELECT * FROM employee WHERE Employee_Id = ' + mysql.escape(employeeId);
    if (sector !== "") {
      query = query + `AND SA_Sector like '%${sector}%' `;

    }

    if (businessUnit !== "") {
      query = query + `AND SA_BU like '%${businessUnit}%' `;
    }

    if (division !== "") {
      query = query + `AND SA_Division like '%${division}%' `;
    }

    //console.log(query);

    // if (entity1 !== "" || businessUnit !== "" || sector !== "" || division != "") {
    // create Request object
    // var request = new sql.Request();

    var aiText = response.result.fulfillment.speech;

    if (!aiText.includes("****")) {
      insertRecord(next, employeeId, text, aiText, function (id) {
        return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "id": id }));
      });
    }

    else {
      requestModule.post("http://13.232.168.178:8000/customapi", { json: json },
        function (error, responseDlModel, body) {
          if (!error && responseDlModel.statusCode == 200) {
            var concatedAiText = "";
            if (body.Text && body.Text == 1) {
              concatedAiText = aiText.replace("****", body.TextContent);
              insertRecord(next, employeeId, text, concatedAiText, function (id) {
                return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": concatedAiText, "id": id }));
              });
            }
            else if (body.Chart && body.ChartURL && body.Chart == 1) {
              insertRecord(next, employeeId, text, body.ChartURL, function (id) {
                return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body, "id": id }));
              });
            } else {
              return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body }));
            }
          }
          else {
            return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": error, "response": null }))
          }

        });

    }

    // request.query(query, function (err, recordset) {

    //   if (err) {
    //     console.log("Error while querying database :- ");
    //     return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": err, "response": null }));
    //   }

    //   else {

    //     if (recordset.recordset.length > 0) {

    //       var aiText = response.result.fulfillment.speech;

    //       if (!aiText.includes("****")) {
    //        // insertRecord(employeeId, text, aiText);
    //         return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
    //       }

    //       else {

    //         requestModule.post("http://13.232.168.178:8000/customapi", { json: json },

    //           function (error, responseDlModel, body) {

    //             if (!error && responseDlModel.statusCode == 200) {

    //               var concatedAiText = "";
    //               if (body.Text && body.Text == 1) {

    //                 concatedAiText = aiText.replace("****", body.TextContent);
    //                 insertRecord(employeeId, text, concatedAiText);
    //                 return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": concatedAiText }));
    //               }
    //               else {
    //                 return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body }));
    //               }
    //             }
    //             else {
    //               return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": error, "response": null }))
    //             }

    //           });

    //       }
    //     }

    //     else {
    //       aiText = `According to the authentication list, you are not supposed to view the data for this particular dimension. 
    //               Please try asking information on the other dimensions of Mahindra.`;

    //       insertRecord(employeeId, text, aiText);

    //       return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
    //     }

    //   }

    // });

    // }

    // else {
    //   var aiText = response.result.fulfillment.speech;
    //   //  insertRecord(employeeId, text, aiText);
    //   return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
    // }



  });

  apiaiReq.on('error', (error) => {
    // console.log(error);
  });

  apiaiReq.end();

};

//var insertRecord = function (employeeId, userText, aiText) {

async function insertRecord(next, employeeId, userText, aiText, fn) {
  var request = new sql.Request();
  request.input('HD_MASK_ID', sql.VarChar, employeeId);
  request.input('text', sql.VarChar, userText);
  request.input('aiText', sql.VarChar, aiText);
  var chatHistorySql = "INSERT INTO chat_history (employee_id, user_query,bot_response) VALUES (@HD_MASK_ID,@text,@aiText);SELECT SCOPE_IDENTITY() AS id;";
  request.query(chatHistorySql, function (err, result) {
    if (err) {
      //console.log(err);
      return next(err);
    }

    else {
      // console.log("chat history record inserted");
      if (result && result.recordset && result.recordset.length) {
        fn(result.recordset[0]["id"]);
      }
    }
  });
}

function saveBase64ToFile(base64Data) {
  base64Img.img('https://www.shezar.in/ecataloguestaging/api/images/image/SnFlRklmOEx1QXlFZzk5Q1BYRTdwdz09', 'dest', '1', function (err, filepath) {
    if (err) throw err;
    console.log(filepath);
    console.log("base 64 file created");
  });
}

async function downloadIMG(options) {
  try {
    const { filename, image } = await download.image(options)
    console.log(filename) // => /path/to/dest/image.jpg 
  } catch (e) {
    console.error(e)
  }
}





