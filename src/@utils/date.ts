import * as moment from "moment";

export const setNameTitle = (name = '') => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const formatHrs = (time = '') => {
  if(time === "Invalid date" || !time){
    return '';
  }
  return moment(time, 'h:mm').format('HH:mm');
}

export const isTime = param => {
  return param !== null && param !== "" && param !== "Invalid Time";
}

export const format12Hrs = (time = {}) => {
  if(time === "Invalid date" || !time){
    return '';
  }
  return moment(time, 'h:mm A').format('HH:mm');
}

export const format12HrsSettings = (time = '') => {
  if(time === "Invalid date" || !time){
    return '';
  }
  return moment(time, 'h:mm A').format('HH:mm');
}

export const formatDate = dob => {
  return moment(dob).format("YYYY-MM-DD");
};

export const formatExportDate = dob => {
  return moment(dob).format("MM-DD-YYYY");
};

export const formatExportDateTime = (time = '') => {
  if(time === "Invalid date" || !time){
    return '';
  }
  return moment(time).format('HH:mm:ss');
}

export const formatExportDates = (date = '') => {
  if(date === "Invalid date" || !date){
    return '';
  }
  return moment(date).format('MM-DD-YYYY');
}

export const DateFormat = (date = '') => {
  if(date === "Invalid date" || !date){
    return '';
  }
  return moment(date).format('MM/DD/YYYY');
}

export const formatExportTime = (time = '') => {
  if(time === "Invalid time" || !time){
    return '';
  }
  return moment(time).format('h:mm A');
}

export const formatExportExcelDateTime = datetime => {
  return moment(datetime).format('MM/DD/YYYY h:mm A');
};

export const formatExportExcelDateTimes = datetime => {
  return moment(datetime).format('MM/DD/YYYY, h:mm:ss a');
};

export const formatManualDateTime = (datetime = '') => {
  if(datetime === "Invalid date" || !datetime){
    return '';
  }
  return moment(datetime).format('MM/DD/YYYY h:mm A');
}

export const isDateEmpty = param => {
  return param !== null && param !== "" && param !== "Invalid Date";
}

export const isTimeEmpty = param => {
  return param !== null && param !== "" && param !== "Invalid Time";
}

export const isDateView = datetime => {
  return moment(datetime).format('MM-DD-YYYY, h:mm A');
};