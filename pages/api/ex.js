import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix")
        const data = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        res.json(data)
    } catch (e) {
        res.json({message: "error did not work lmao"})
        console.error(e)
    }
}