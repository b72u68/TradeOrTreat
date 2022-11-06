const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://test-user:czeapUgz2qxK2jnZ@demonhacks.cevcgwn.mongodb.net/test?retryWrites=true&w=majority";

function getConnection() {
  try {
    console.log("Connecting to database...");
    return new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
      connectTimeoutMS: 3000,
    });
  } catch (err) {
    console.log(`Cannot connect to the database: ${err}`);
  }
}

function closeConnection(client) {
  console.log("Closing connection...");
  client && client.close();
}

export async function getPostings() {
  const client = getConnection();
  const database = client.db("test");
  const postings = database.collection("Posting");
  const result = await postings.find().toArray();
  closeConnection(client);
  return result;
}
