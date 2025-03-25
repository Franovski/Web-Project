const moment = require("moment");


class Utils {

    static async formatDateSQL(date){
            return moment(date).format("YYYY-MM-DD");
        }

        static async formatTimeSQL(time){
            // Assuming time is already in the format HH:mm:ss
            const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
            if (!timeRegex.test(time)) {
                throw new Error('Invalid time format. Expected format: HH:mm:ss');
            }
            return time;  // If valid, return the time string directly
        }
}

module.exports = Utils;