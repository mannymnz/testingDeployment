import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import axios from "axios"
import { GOOGLE_FONT_PROVIDER } from 'next/dist/shared/lib/constants'

export async function getServerSideProps() {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("MongoDB Connected?:", isConnected)

  axios.get("/api/ex").then(
    (res) => {
      console.log(res.data)
    }
  ).catch(
    (e) => (console.log(e))
  )
  return (
      <div>
        hello
      </div>
    )
}
