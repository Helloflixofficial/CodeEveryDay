"use client";
import { useEffect, useState } from "react";

export default function EnkaClientView({ uid }: { uid: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`https://enka.network/u/${uid}/__data.json`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [uid]);

  return (
    <div>
      <h2>Enka Data for UID: {uid}</h2>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}
