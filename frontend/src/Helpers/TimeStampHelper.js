import moment from "moment";

const convertDateTimeToUTCFormat = (dateTime, dateTimeFormat = '') => {
    // HH:mm format for time
    // YYYY-MM-DD format for date 
    return moment(dateTime, dateTimeFormat).utc().format(dateTimeFormat);
};

const convertDateTimeFromUTCToLocalFormat = (dateTime, dateTimeFormat = '') => {
    var testDateUtc = moment(dateTime, dateTimeFormat).utc()
    var localDate = moment(testDateUtc).utcOffset(10 * 60); //set timezone offset in minutes
    return localDate.format(dateTimeFormat);
};



const TimeStampHelper = {
    convertDateTimeToUTCFormat,
    convertDateTimeFromUTCToLocalFormat
};

export default TimeStampHelper;
