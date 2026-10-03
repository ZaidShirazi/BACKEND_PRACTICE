import "dotenv/config";
import app from "./src/app.js";
import connectDatabase from "./src/config/db.js";

async function startServer() {
  try {
    await connectDatabase();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`ERROR IN DATABASE CONNECTION ${error.message}`);
    process.exit(1);
  }
}

startServer();
