// @ts-expect-error TODO: fix ts
import Head from "next/head";
// @ts-expect-error TODO: fix ts
import Link from "next/link";
import React from "react";

// @ts-expect-error TODO: fix ts
import { api } from "~/utils/api";

import styles from "./index.module.css";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>@reliverse/cli</title>
        <meta name="description" content="Generated by @reliverse/cli" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles["main"]}>
        <div className={styles["container"]}>
          <h1 className={styles["title"]}>
            Basic <span className={styles["pinkSpan"]}>Reliverse</span> App
          </h1>
          <div className={styles["cardRow"]}>
            <Link
              className={styles["card"]}
              href="https://docs.reliverse.org/en/usage/first-steps"
              target="_blank"
            >
              <h3 className={styles["cardTitle"]}>First Steps →</h3>
              <div className={styles["cardText"]}>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className={styles["card"]}
              href="https://docs.reliverse.org/en/introduction"
              target="_blank"
            >
              <h3 className={styles["cardTitle"]}>Documentation →</h3>
              <div className={styles["cardText"]}>
                Learn more about @reliverse/cli, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className={styles["showcaseText"]}>
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
}
