import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });


export const CONN = process.env.DB_URL;
export const Aceess_Key = process.env.ACCESS_KEY_ID;
export const Secrate_access_key = process.env.SECERATE_ACCESS_KEY_ID;
export const regios = process.env.REGION
export const bucket_name = process.env.BUCKET_NAME;
export const my_secrate = process.env.MY_SECRATE;