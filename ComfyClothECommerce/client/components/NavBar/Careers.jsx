import React from "react";
import JobCard from "./JobCard";
import { getAllJobs } from "../api/jobs";

const Careers = () => {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    getAllJobs().then((data) => setJobs(data));
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">Join Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
