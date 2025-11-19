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
  let filter = {
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
    let total = await collection.countDocuments();
    let approved = await collection.countDocuments({ status: "approved" });
    let pending = await collection.countDocuments({ status: "pending" });
    let rejected = await collection.countDocuments({ status: "rejected" });

    return { total, approved, pending, rejected };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return { total: 0, approved: 0, pending: 0, rejected: 0 };
  }
}

// UPDATED FUNCTIONS - Using MongoDB native driver syntax
export async function getEventsByOrganizer(organizerEmail) {
  try {
    let events = await collection
      .find({
        contact: organizerEmail,
      })
      .sort({ createdAt: -1 })
      .toArray();
    return events;
  } catch (error) {
    console.error("Error fetching events by organizer:", error);
    return [];
  }
}

export async function getUserEventStats(organizerEmail) {
  try {
    let events = await getEventsByOrganizer(organizerEmail);

    let stats = {
      eventsCreated: events.length,
      eventsAttended: 0, // You can implement attendance tracking later
      approvedEvents: events.filter((e) => e.status === "approved").length,
      pendingEvents: events.filter((e) => e.status === "pending").length,
      rejectedEvents: events.filter((e) => e.status === "rejected").length,
    };

    return stats;
  } catch (error) {
    console.error("Error getting user event stats:", error);
    return {
      eventsCreated: 0,
      eventsAttended: 0,
      approvedEvents: 0,
      pendingEvents: 0,
      rejectedEvents: 0,
    };
  }
}

export async function getUserFavoriteCategories(organizerEmail) {
  try {
    let events = await getEventsByOrganizer(organizerEmail);

    if (events.length === 0) {
      return ["No events yet"];
    }

    // Count categories
    let categoryCount = {};
    events.forEach((event) => {
      categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
    });

    // Get top 3 categories
    let favoriteCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    return favoriteCategories;
  } catch (error) {
    console.error("Error getting favorite categories:", error);
    return ["Error loading categories"];
  }
}
