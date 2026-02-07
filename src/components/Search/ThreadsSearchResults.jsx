import { useState } from "react";

export default function ProfileSearchResults({ results }) {
  const [threads] = useState(results.threads);
  return (
    <div>
      {!threads && <p>No threads found</p>}

      {threads &&
        threads.map(thread => (
          <div key={thread.id}>
            <p>{thread.content}</p>
          </div>
        ))}
    </div>
  );
}
