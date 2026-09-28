import app from "./src/app.js";
import connectDatabase from "./src/database/database.js";

await connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});