import { aAe, getMinutesFormTimeZones } from "../src/utils/date-format";
import consola from "consola";



consola.info(String(aAe(new Date, "Asia/Shanghai", "Asia/Tokyo")));