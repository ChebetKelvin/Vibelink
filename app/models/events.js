import { client, ObjectId } from "../.server/mongo";

let db = client.db("vibelink");
let collection = db.collection("events");

export async function getEvents() {
  return collection.find().toArray();
}

export async function addEvent(event) {
  return collection.insertOne(event);
}

export async function getEventsCount() {
  return collection.countDocuments();
}

export async function getEventById(id) {
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function updateEvent(id, event) {
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: event });
}

export async function deleteEvent(id) {
  return collection.deleteOne({ _id: new ObjectId(id) });
}

export async function getEventsByCategory(category, excludeId = null) {
  const filter = {
    category,
    status: "approved", // Only fetch approved events
  };

  // Only exclude if excludeId is provided and valid
  if (excludeId && ObjectId.isValid(excludeId)) {
    filter._id = { $ne: new ObjectId(excludeId) };
  }

  return db.collection("events").find(filter).limit(3).toArray();
}

export async function getEventStats() {
  try {
    const total = await collection.countDocuments();
    const approved = await collection.countDocuments({ status: "approved" });
    const pending = await collection.countDocuments({ status: "pending" });
    const rejected = await collection.countDocuments({ status: "rejected" });

    return { total, approved, pending, rejected };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return { total: 0, approved: 0, pending: 0, rejected: 0 };
  }
}
