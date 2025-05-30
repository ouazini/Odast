import clientPromise from "./mongo";

export async function fetchSubmissionsFromDB() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  // For example, fetch users who are not yet approved or verified
  const submissions = await db
    .collection("users")
    .find({ approved: null }) // or your actual filter for "pending submissions"
    .toArray();

  return submissions.map((user) => ({
    _id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    profession: user.profession,
    approved: user.approved,
    message: user.message || "", // or wherever the message is stored
  }));
}
