const mongoose = require("mongoose");

const uri = "mongodb+srv://mahithagatreddi_10:mahitha1012@cluster0.jwujht9.mongodb.net/rjedits_db?appName=Cluster0";

async function run() {
  await mongoose.connect(uri);
  const Reel = mongoose.models.Reel || mongoose.model("Reel", new mongoose.Schema({}));
  await Reel.deleteMany({});
  console.log("Deleted all reels successfully.");
  process.exit(0);
}

run().catch(console.error);
