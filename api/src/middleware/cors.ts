import cors from "cors";
import { env } from "../env";

export default cors({
  credentials: true,
  origin: env.ALLOWED_ORIGIN,
});
