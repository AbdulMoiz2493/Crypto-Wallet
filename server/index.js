import dotenv  from "dotenv"
dotenv.config();
import app from "./app.js";
import connectDB from "./Database/db.js";
const port = process.env.PORT || 80;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`App listening on PORT ${port}`);
    })

}).catch((err) => {
    console.log("App Failed to run", err);
});

