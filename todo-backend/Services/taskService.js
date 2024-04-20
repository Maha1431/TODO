// services/taskService.js
const Task = require('../Models/taskModel');

const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://mmahaece07:Maha1431@cluster0.iei1qfm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// Database Name
const dbName = "test";

// Collection Name (Assuming the collection is called "tasks")
const collectionName = "tasks";

const TaskService = {
  async getAllTasks() {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");

      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const tasks = await collection.find({}).toArray();
      return tasks;
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },

  async getTaskById(id) {
    // Validate that the id is in a valid format
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid id format");
    }

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Ensure the id is a valid ObjectId
        const objectId = new ObjectId(id);

        const task = await collection.findOne({ _id: objectId });
        return task;
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    } finally {
        await client.close();
        console.log("Connection closed");
    }
},
  

  

  async createTask(taskData) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");

      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const result = await collection.insertOne(taskData);
      return result
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },

  async updateTask(id, taskData) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");

      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: taskData },
        { returnOriginal: false }
      );
     
      return result.value;
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },

  async deleteTask(id) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");

      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },
};

module.exports = TaskService;

