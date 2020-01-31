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
var path = require('path');
var applicationConstants = require('../constants/applicationConstant');

module.exports.getBotResponse = function (req, res, next) {

  if (!req.body.userId) return res.status(400).send("userId cannot be empty");
  if (!req.body.q) return res.status(400).send("user query q cannot be empty");
  const userId = (String)(req.body.userId);
  const text = req.body.q;

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

    // console.log("Dialogflow response is " + JSON.stringify(paramteresJson, null, 4));

    let entity1 = "",
        entity2 = "",
        entity3 = "",
        entity4 = "",
        kpi_combination = [],
        filter = "",
        filter1 = [],
        sector = [],
        businessUnit = [],
        division = [],
        subDivision = [],
        department = [],
        subDepartment = [],
        businessFunction = [],
        company = [],
        grade = [],
        domainType = [],
        gender = [],
        ageGroup = [],
        band = [],
        talentCategory = [],
        rating = [],
        performanceScore = [],
        employeeGroup = [],
        spanOfControl = [],
        tenureGroup = [],
        age = [],
        tenure = [],
        Year = "",
        year = "",
        startDate = "",
        transferFlag = "",
        endDate = "",
        listSort = "",
        groupBy = "",
        month = "",
        date = "",
        typeDuration = "",
        operator = "",
        sysNumber = "",
        yoy = "",
        percentage = "",
        overallAFStransfer = "",
        difference = "",
        which = "",
        sizeOfTeam = "",
        differenceTransfers = "",
        compare = "",
        compare1 = "",
        sysNumber1 = "",
        operator1 = "",
        versus = "",
        common ="",
        commonType = "",
        requiredInfo = "",
        storyboard = "",
         requireEmp = "";

    var json = {};
    if (paramteresJson) {
      if (paramteresJson.kpi_name) {
        entity1 = paramteresJson.kpi_name;
        if (paramteresJson.kpi_name.kpi_name) entity1 = paramteresJson.kpi_name.kpi_name;
      }
      if (paramteresJson.kpi_name1){
        entity2 = paramteresJson.kpi_name1;
        if (paramteresJson.kpi_name.kpi_name) entity2 = paramteresJson.kpi_name1.kpi_name;
      }
      if(paramteresJson.kpi_combination){
           var comb = paramteresJson.kpi_combination;
           if(comb.kpi_name1) kpi_combination.push(comb.kpi_name1.kpi_name);
           if(comb.kpi_name2) kpi_combination.push(comb.kpi_name2.kpi_name);
           if(comb.kpi_name3) kpi_combination.push(comb.kpi_name3.kpi_name);
           if(comb.kpi_name4) kpi_combination.push(comb.kpi_name4.kpi_name);
      }
      if(paramteresJson.userId) {
        entity1 = "required information";
        requireEmp = paramteresJson.userId.userId;
      };
      if(paramteresJson.requiredInformation) {
        entity1 = "required information";
        requiredInfo = paramteresJson.requiredInformation;
      }
      if(paramteresJson.Month) month = paramteresJson.Month;
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
      if(paramteresJson.commonType) {
        commonType =  paramteresJson.commonType.filter;
      }
      if(paramteresJson.common) common = paramteresJson.common;
      if (paramteresJson.Common_among_dimensions){
        let commonValue = paramteresJson.Common_among_dimensions
        if(commonValue.common){
          common = commonValue.common
        }
      }
      if (paramteresJson.versus) {
        let versusfilterValue = paramteresJson.versus;
        let versusFilter = "";
        if (versusfilterValue.compare_value && versusfilterValue.compare_value1) {
          let comparefilterValue = versusfilterValue.compare_value;
          if (comparefilterValue.Sector) {
            sysNumber = comparefilterValue.Sector;
            versusFilter = "Sector";
          }
          else if (comparefilterValue.business_unit) {
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
          else if (comparefilterValue.Division) {
            sysNumber = comparefilterValue.Division;
            versusFilter = "Division";
          }
          else if (comparefilterValue.Band) {
            sysNumber = comparefilterValue.Band;
            versusFilter = "Band";
          }
          else if (comparefilterValue.Employee_Group) {
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
          
          else if (comparefilterValue.Talent_Category) {
            sysNumber = comparefilterValue.Talent_Category;
            versusFilter = "talent category";
          }
          else if (comparefilterValue.rating) {
            sysNumber = comparefilterValue.rating;
            versusFilter = "current rating";
          }

          let comparefilterValue1 = versusfilterValue.compare_value1;
          if (comparefilterValue1[versusFilter]) {
            sysNumber1 = comparefilterValue1[versusFilter];
          }
          else if(versusFilter == "talent category"){
          sysNumber1 = comparefilterValue1["Talent_Category"];
          }

          else if(versusFilter =="current rating"){
          sysNumber1 = comparefilterValue1["rating"];
          }
          compare = compare1 = versusFilter;
          groupBy = "group_by";
          versus = "versus";
        }
      }

      if (paramteresJson.Sector) sector.push(paramteresJson.Sector);
      if (paramteresJson.business_unit) businessUnit.push(paramteresJson.business_unit);
      if (paramteresJson.business_function) businessFunction.push(paramteresJson.business_function);
      if (paramteresJson.Sub_division) subDivision.push(paramteresJson.Sub_division);
      if (paramteresJson.Division) division.push(paramteresJson.Division);
      if (paramteresJson.Band) band.push(paramteresJson.Band);
      if (paramteresJson.Employee_Group) employeeGroup.push(paramteresJson.Employee_Group);
      if (paramteresJson.employee_grade) grade.push(paramteresJson.employee_grade);
      if (paramteresJson.age_group) ageGroup.push(paramteresJson.age_group);
      if (paramteresJson.domain_type) domainType.push(paramteresJson.domain_type);
      if (paramteresJson.Gender) gender.push(paramteresJson.Gender);
      if (paramteresJson.Year) year = paramteresJson.Year;
      if (paramteresJson["date-period"]) date = paramteresJson["date-period"];
      if (paramteresJson.number) sysNumber = paramteresJson.number;
      if (paramteresJson.Department) department.push(paramteresJson.Department);
      if (paramteresJson.Sub - department) subDepartment.push(paramteresJson.Sub - department);
      if (paramteresJson.company) company.push(paramteresJson.company);
      if (paramteresJson.Talent_Category) talentCategory.push(paramteresJson.Talent_Category);
      if (paramteresJson.rating) rating.push(paramteresJson.rating);

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
        if(dynamicFilter.YOY) yoy = dynamicFilter.YOY;
        if (dynamicFilter.Group_by) groupBy = dynamicFilter.Group_by;
        if (dynamicFilter.value1) {
          var dynamicFilterValue1 = dynamicFilter.value1;
          if (dynamicFilterValue1.filter) filter1.push(dynamicFilterValue1.filter);
          if (dynamicFilterValue1.kpi_name) filter1.push(dynamicFilterValue1.kpi_name.kpi_name);
          if (dynamicFilterValue1.YOY) yoy = dynamicFilterValue1.YOY;
          if (dynamicFilterValue1.duration_type) typeDuration = dynamicFilterValue1.duration_type;
        }
        if (dynamicFilter.value2) {
          var dynamicFilterValue1 = dynamicFilter.value2;
          if (dynamicFilterValue1.filter) filter1.push(dynamicFilterValue1.filter);
          if (dynamicFilterValue1.kpi_name) filter1.push(dynamicFilterValue1.kpi_name.kpi_name);
          if (dynamicFilterValue1.YOY) yoy = dynamicFilterValue1.YOY;
          if (dynamicFilterValue1.duration_type) typeDuration = dynamicFilterValue1.duration_type;
        }
        if (dynamicFilter.value3) {
          var dynamicFilterValue1 = dynamicFilter.value3;
          if (dynamicFilterValue1.filter) filter1.push(dynamicFilterValue1.filter);
          if (dynamicFilterValue1.kpi_name) filter1.push(dynamicFilterValue1.kpi_name.kpi_name);
          if (dynamicFilterValue1.YOY) yoy = dynamicFilterValue1.YOY;
          if (dynamicFilterValue1.duration_type) typeDuration = dynamicFilterValue1.duration_type;
        }
        if (dynamicFilter.value4) {
          var dynamicFilterValue1 = dynamicFilter.value4;
          if (dynamicFilterValue1.filter) filter1.push(dynamicFilterValue1.filter);
          if (dynamicFilterValue1.kpi_name) filter1.push(dynamicFilterValue1.kpi_name.kpi_name);
          if (dynamicFilterValue1.YOY) yoy = dynamicFilterValue1.YOY;
          if (dynamicFilterValue1.duration_type) typeDuration = dynamicFilterValue1.duration_type;
        }
        if (dynamicFilter.value) {
          var dynamicFilterValue = dynamicFilter.value;
          if (dynamicFilterValue.filter) filter = dynamicFilterValue.filter;
          if (dynamicFilterValue.YOY) yoy = dynamicFilterValue.YOY;
          if (dynamicFilterValue.kpi_name) {
            filter = dynamicFilterValue.kpi_name;
            if(dynamicFilterValue.kpi_name.kpi_name){
              filter = dynamicFilterValue.kpi_name.kpi_name;
            }
          }
          if (dynamicFilterValue.duration_type) typeDuration = dynamicFilterValue.duration_type;
          if (dynamicFilterValue.yoy_true) yoy = dynamicFilterValue.yoy_true;
          if (dynamicFilterValue["FollowupWhereFilter"]) {
            let followupdynamicfilterValue = dynamicFilterValue["FollowupWhereFilter"];
            if (followupdynamicfilterValue.Sector) sector.push(followupdynamicfilterValue.Sector);
            if (followupdynamicfilterValue.business_unit) businessUnit.push(followupdynamicfilterValue.business_unit);
            if (followupdynamicfilterValue.business_function) businessFunction.push(followupdynamicfilterValue.business_function);
            if (followupdynamicfilterValue.Sub_division) subDivision.push(followupdynamicfilterValue.Sub_division);
            if (followupdynamicfilterValue.Division) division.push(followupdynamicfilterValue.Division);
            if (followupdynamicfilterValue.Band) band.push(followupdynamicfilterValue.Band);
            if (followupdynamicfilterValue.Employee_Group) employeeGroup.push(followupdynamicfilterValue.Employee_Group);
            if (followupdynamicfilterValue.employee_grade) grade.push(followupdynamicfilterValue.employee_grade);
            if (followupdynamicfilterValue.age_group) ageGroup.push(followupdynamicfilterValue.age_group);
            if (followupdynamicfilterValue.domain_type) domainType.push(followupdynamicfilterValue.domain_type);
            if (followupdynamicfilterValue.Gender) gender.push(followupdynamicfilterValue.Gender);
            if (followupdynamicfilterValue.Year) year = followupdynamicfilterValue.Year;
            if (followupdynamicfilterValue["date-period"]) date = followupdynamicfilterValue["date-period"];
            if (followupdynamicfilterValue.number) sysNumber = followupdynamicfilterValue.number;
            if (followupdynamicfilterValue.Department) department.push(followupdynamicfilterValue.Department);
            if (followupdynamicfilterValue.Sub - department) subDepartment.push(followupdynamicfilterValue.Sub - department);
            if (followupdynamicfilterValue.company) company.push(followupdynamicfilterValue.company);
            if (followupdynamicfilterValue.Talent_Category) talentCategory.push(followupdynamicfilterValue.Talent_Category);
            if (followupdynamicfilterValue.rating) rating.push(followupdynamicfilterValue.rating);
          }
        }
        if(dynamicFilter.Commonly_used_terms) {
          groupBy = "increased";
         }
        if (dynamicFilter.FollowupWhereFilter) {
          let followup = dynamicFilter.FollowupWhereFilter;
          if (followup.Sector) sector.push(followup.Sector);
          if (followup.business_unit) businessUnit.push(followup.business_unit);
          if (followup.business_function) businessFunction.push(followup.business_function);
          if (followup.Sub_division) subDivision.push(followup.Sub_division);
          if (followup.Division) division.push(followup.Division);
          if (followup.Band) band.push(followup.Band);
          if (followup.Employee_Group) employeeGroup.push(followup.Employee_Group);
          if (followup.employee_grade) grade.push(followup.employee_grade);
          if (followup.age_group) ageGroup.push(followup.age_group);
          if (followup.domain_type) domainType.push(followup.domain_type);
          if (followup.Gender) gender.push(followup.Gender);
          if (followup.Year) year = followup.Year;
          if (followup["date-period"]) date = followup["date-period"];
          if (followup.number) sysNumber = followup.number;
          if (followup.Department) department.push(followup.Department);
          if (followup.Sub - department) subDepartment.push(followup.Sub - department);
          if (followup.company) company.push(followup.company);
          if (followup.Talent_Category) talentCategory.push(followup.Talent_Category);
          if (followup.rating) rating.push(followup.rating);
        }
      }

      if (paramteresJson.FollowupWhereFilter) {
        var followup = paramteresJson.FollowupWhereFilter;
        if (followup.Sector) sector.push(followup.Sector);
        if (followup.business_unit) businessUnit.push(followup.business_unit);
        if (followup.business_function) businessFunction.push(followup.business_function);
        if (followup.Sub_division) subDivision.push(followup.Sub_division);
        if (followup.Division) division.push(followup.Division);
        if (followup.Band) band.push(followup.Band);
        if (followup.Employee_Group) employeeGroup.push(followup.Employee_Group);
        if (followup.employee_grade) grade.push(followup.employee_grade);
        if (followup.age_group) ageGroup.push(followup.age_group);
        if (followup.domain_type) domainType.push(followup.domain_type);
        if (followup.Gender) gender.push(followup.Gender);
        if (followup.Year) year = followup.Year;
        if (followup["date-period"]) date = followup["date-period"];
        if (followup.number) sysNumber = followup.number;
        if (followup.Department) department.push(followup.Department);
        if (followup.Sub - department) subDepartment.push(followup.Sub - department);
        if (followup.company) company.push(followup.company);
        if (followup.Talent_Category) talentCategory.push(followup.Talent_Category);
        if (followup.rating) rating.push(followup.rating);
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
          if (followupwherefilter.Sector) sector.push(followupwherefilter.Sector);
          if (followupwherefilter.business_unit) businessUnit.push(followupwherefilter.business_unit);
          if (followupwherefilter.business_function) businessFunction.push(followupwherefilter.business_function);
          if (followupwherefilter.Sub_division) subDivision.push(followupwherefilter.Sub_division);
          if (followupwherefilter.Division) division.push(followupwherefilter.Division);
          if (followupwherefilter.Band) band.push(followupwherefilter.Band);
          if (followupwherefilter.Employee_Group) employeeGroup.push(followupwherefilter.Employee_Group);
          if (followupwherefilter.employee_grade) grade.push(followupwherefilter.employee_grade);
          if (followupwherefilter.age_group) ageGroup.push(followupwherefilter.age_group);
          if (followupwherefilter.domain_type) domainType.push(followupwherefilter.domain_type);
          if (followupwherefilter.Gender) gender.push(followupwherefilter.Gender);
          if (followupwherefilter.Year) year = followupwherefilter.Year;
          if (followupwherefilter["date-period"]) date = followupwherefilter["date-period"];
          if (followupwherefilter.number) sysNumber = followupwherefilter.number;
          if (followupwherefilter.Department) department.push(followupwherefilter.Department);
          if (followupwherefilter.Sub-department) subDepartment.push(followupwherefilter.Sub-department);
          if (followupwherefilter.company) company.push(followupwherefilter.company);
          if (followupwherefilter.Talent_Category) {
            talentCategory.push(followupwherefilter.Talent_Category);
            storyboard = "talent"
          }
          if (followupwherefilter.rating) rating.push(followupwherefilter.rating);
          if (Dimension.FollowupWhereFilter1) {
            var followupwherefilter1 = Dimension.FollowupWhereFilter1;
            if (followupwherefilter1.Sector) sector.push(followupwherefilter1.Sector);
            if (followupwherefilter1.business_unit) businessUnit.push(followupwherefilter1.business_unit);
            if (followupwherefilter1.business_function) businessFunction.push(followupwherefilter1.business_function);
            if (followupwherefilter1.Sub_division) subDivision.push(followupwherefilter1.Sub_division);
            if (followupwherefilter1.Division) division.push(followupwherefilter1.Division);
            if (followupwherefilter1.Band) band.push(followupwherefilter1.Band);
            if (followupwherefilter1.Employee_Group) employeeGroup.push(followupwherefilter1.Employee_Group);
            if (followupwherefilter1.employee_grade) grade.push(followupwherefilter1.employee_grade);
            if (followupwherefilter1.age_group) ageGroup.push(followupwherefilter1.age_group);
            if (followupwherefilter1.domain_type) domainType.push(followupwherefilter1.domain_type);
            if (followupwherefilter1.Gender) gender.push(followupwherefilter1.Gender);
            if (followupwherefilter1.Year) year = followupwherefilter1.Year;
            if (followupwherefilter1["date-period"]) date = followupwherefilter1["date-period"];
            if (followupwherefilter1.number) sysNumber = followupwherefilter1.number;
            if (followupwherefilter1.Department) department.push(followupwherefilter1.Department);
            if (followupwherefilter1.Sub-department) subDepartment.push(followupwherefilter1.Sub-department);
            if (followupwherefilter1.company) company.push(followupwherefilter1.company);
            if (followupwherefilter1.Talent_Category) talentCategory.push(followupwherefilter1.Talent_Category);
            if (followupwherefilter1.rating) rating.push(followupwherefilter1.rating);
          }

          if (Dimension.FollowupWhereFilter2) {
            var followupwherefilter2 = Dimension.FollowupWhereFilter2;
            if (followupwherefilter2.Sector) sector.push(followupwherefilter2.Sector);
            if (followupwherefilter2.business_unit) businessUnit.push(followupwherefilter2.business_unit);
            if (followupwherefilter2.business_function) businessFunction.push(followupwherefilter2.business_function);
            if (followupwherefilter2.Sub_division) subDivision.push(followupwherefilter2.Sub_division);
            if (followupwherefilter2.Division) division.push(followupwherefilter2.Division);
            if (followupwherefilter2.Band) band.push(followupwherefilter2.Band);
            if (followupwherefilter2.Employee_Group) employeeGroup.push(followupwherefilter2.Employee_Group);
            if (followupwherefilter2.employee_grade) grade.push(followupwherefilter2.employee_grade);
            if (followupwherefilter2.age_group) ageGroup.push(followupwherefilter2.age_group);
            if (followupwherefilter2.domain_type) domainType.push(followupwherefilter2.domain_type);
            if (followupwherefilter2.Gender) gender.push(followupwherefilter2.Gender);
            if (followupwherefilter2.Year) year = followupwherefilter2.Year;
            if (followupwherefilter2["date-period"]) date = followupwherefilter2["date-period"];
            if (followupwherefilter2.number) sysNumber = followupwherefilter2.number;
            if (followupwherefilter2.Department) department.push(followupwherefilter2.Department);
            if (followupwherefilter2.Sub-department) subDepartment.push(followupwherefilter2.Sub-department);
            if (followupwherefilter2.company) company.push(followupwherefilter2.company);
            if (followupwherefilter2.Talent_Category) talentCategory.push(followupwherefilter2.Talent_Category);
            if (followupwherefilter2.rating) rating.push(followupwherefilter2.rating);
          }
          if (Dimension.FollowupWhereFilter3) {
            var followupwherefilter = Dimension.FollowupWhereFilter3;
            if (followupwherefilter.Sector) sector.push(followupwherefilter.Sector);
            if (followupwherefilter.business_unit) businessUnit.push(followupwherefilter.business_unit);
            if (followupwherefilter.business_function) businessFunction.push(followupwherefilter.business_function);
            if (followupwherefilter.Sub_division) subDivision.push(followupwherefilter.Sub_division);
            if (followupwherefilter.Division) division.push(followupwherefilter.Division);
            if (followupwherefilter.Band) band.push(followupwherefilter.Band);
            if (followupwherefilter.Employee_Group) employeeGroup.push(followupwherefilter.Employee_Group);
            if (followupwherefilter.employee_grade) grade.push(followupwherefilter.employee_grade);
            if (followupwherefilter.age_group) ageGroup.push(followupwherefilter.age_group);
            if (followupwherefilter.domain_type) domainType.push(followupwherefilter.domain_type);
            if (followupwherefilter.Gender) gender.push(followupwherefilter.Gender);
            if (followupwherefilter.Year) year = followupwherefilter.Year;
            if (followupwherefilter["date-period"]) date = followupwherefilter["date-period"];
            if (followupwherefilter.number) sysNumber = followupwherefilter.number;
            if (followupwherefilter.Department) department.push(followupwherefilter.Department);
            if (followupwherefilter.Sub-department) subDepartment.push(followupwherefilter.Sub-department);
            if (followupwherefilter.company) company.push(followupwherefilter.company);
            if (followupwherefilter.Talent_Category)
            {
              talentCategory.push(followupwherefilter.Talent_Category);
              storyboard = "talent";
            } 
            if (followupwherefilter.rating) rating.push(followupwherefilter.rating);
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

    if(requiredInfo == ""){
      requiredInfo = []
    } 
     if(entity1 === 'critical positions'){
      storyboard = "talent"
    }else{
      storyboard = storyboard
    }

    if (filter.toLowerCase() === "talent category" || filter1.includes("talent category")) {
      storyboard = "talent" 
    }
    var json = {
      "userId": userId,
      "question": text,
      "entity1": entity1,
      "entity2": entity2,
      "entity3": entity3,
      "entity4": entity4,
      "kpiCombination": kpi_combination,
      "filter": filter,
      "filter1": filter1,
      "sector": sector,
      "businessFunction": businessFunction,
      "businessUnit": businessUnit,
      "division": division,
      "subDivision": subDivision,
      "department": department,
      "subDepartment": subDepartment,
      "company": company,
      "grade": grade,
      "band": band,
      "level": "",
      "talentCategory": talentCategory,
      "rating":rating,
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
      "transferFlag": transferFlag,
      "age": age,
      "tenure": tenure,
      "sizeOfTeam": sizeOfTeam,
      "compare": compare,
      "compare1": compare1,
      "sysNumber1": sysNumber1,
      "operator1": operator1,
      "versus": versus,
      "common":common,
      "commonType":commonType,
      "performanceScore": performanceScore,
      "storyboard" : storyboard ,
      "requiredEmployeeId": requireEmp,
      "requiredInformation": requiredInfo
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

    var aiText = response.result.fulfillment.speech;
     
    if (storyboard && storyboard.toLowerCase() === "talent" ){
      aiText = "This kpi is under development . You can try asking the below " + applicationConstants.defaultResponse;
    }

    if (!aiText.includes("****")) {
      var concatedAiText_b = "";
      concatedAiText_b = aiText.substring(0, 100);
   // return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
      insertRecord(next, employeeId, text, concatedAiText_b, function (id) {
        return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "id": id }));
      });
    }

    else {
      requestModule.post("http://13.232.168.178:8000/customapi", { json: json },
        function (error, responseDlModel, body) {
          if (!error && responseDlModel.statusCode == 200) {
            var concatedAiText = "";
            var concatedAiText_t = "";
            if (body.Text && body.Text == 1) {
              concatedAiText = aiText.replace("****", body.TextContent);
              concatedAiText_t = concatedAiText.substring(0, 100);
              if (body.TextContent === "There is no data for this particular question" ||
                  body.TextContent === "You don't have permission to access this data")
                  {
                    if(!entity1){
                      entity1 = "Headcount"
                    }
                    var defaultResponse = `/ ^ ${entity1} by Sector ^ /^ ${entity1} by Business Unit^ /^ ${entity1} by Division^ /^ ${entity1} by Sub Division^ /^ ${entity1} by Department^ /^ ${entity1} by Sub Department^ /`;
                    concatedAiText = body.TextContent + " . You can try asking the below  " + defaultResponse;
                    concatedAiText_t = concatedAiText.substring(0, 100);
                  }
           // return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": concatedAiText }));
              insertRecord(next, employeeId, text, concatedAiText_t, function (id) {
                return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": concatedAiText, "id": id }));
              });
            }
            else if (body.Chart && body.ChartURL && body.Chart == 1) {
          //  return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body }));
              insertRecord(next, employeeId, text, body.ChartURL, function (id) {
                return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body, "id": id }));
              });
            } else {
          //  return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body}));
               insertRecord(next, employeeId, text, concatedAiText, function (id) {
                return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body, "id": id}));
              });
            }
          }
          else {
            return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": "An error occured while processing your request. Please rephrase your question", "response": null }))
          }

        });

    }

  });

  apiaiReq.on('error', (error) => {
    console.log(error);
    return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": "apiai internal sever error ocuured ", "response": null }))

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
      return next(err);
    }

    else {
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
