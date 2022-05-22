import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";

const App = () => {
  // declare Octokit
  const octokit = new Octokit();
  // state where commits object will be
  const [commits, setCommits] = useState();

  useEffect(() => {
    // function to get all commits for this repository
    const getCommits = async () => {
      const commits = await octokit.request(
        "GET /repos/rmthomas98/github-commit-tracker/commits"
      );
      console.log(commits);
    };
    getCommits();
  }, []);

  return (
    <div className="wrapper">
      <div className="container"></div>
    </div>
  );
};

export default App;
