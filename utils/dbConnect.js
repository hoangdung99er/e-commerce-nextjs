import mongoose from "mongoose";
const connection = {};

async function dbConnect() {
  const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_USER_DB}:${process.env.NEXT_PUBLIC_PASSWORD_DB}@cluster0.0vger.mongodb.net/${process.env.NEXT_PUBLIC_DB_NAME}?authSource=admin&replicaSet=atlas-nqykex-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
