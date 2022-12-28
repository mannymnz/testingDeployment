import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("testDB")
    switch (req.method) {
        case "POST":
            let newUser = {username: req.body.username, password: req.body.password}
            await db.collection("users").insertOne(newUser)
            res.json({"message": "POST Success"})
        case "GET":
            const data = await db.collection("users")
                .find({})
                .toArray();
            res.json(data)
    }
}