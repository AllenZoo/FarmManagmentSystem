package util;

import java.sql.Date;

public class JSONParser {


    public Date parseDate(String json) {
        // JSON is of format: 'yyyy-mm-dd'
        String year = json.substring( 0, 4);
        String month = json.substring(5, 7);
        String day = json.substring(8, 10);

        Date date = new Date(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
        return date;
    }
}
