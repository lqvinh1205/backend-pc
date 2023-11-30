import { promises as fs } from "fs";
import { join } from "path";
import { format } from "date-fns";

const fileName = join(__dirname, "../Logs", "logs.log");
const logEvents = async (msg) => {
  try {
    const dateTime = `${format(new Date(), "dd-MM-yyyy\tss:mm:HH")}`;
    const contentLog = `${dateTime}------${msg}\n`;
    fs.appendFile(fileName, contentLog);
  } catch (error) {
    console.log(error);
  }
};

export default logEvents;
