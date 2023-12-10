import Button from "@/components/button";
import React from "react";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-2 px-3">
        <div className="text-xl font-semibold">Dashboard.</div>
        <div className="mb-4 flex flex-row flex-wrap gap-4 rounded-lg border p-4 shadow-md">
          <Button title="Filter Data" />
          <Button type="warning" title="Download report" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
