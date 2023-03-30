package util;

import java.sql.Date;

public class JSONParser {


    public Date parseDate(String json) {
        Date date = Date.valueOf(json);
        return date;
    }
}
