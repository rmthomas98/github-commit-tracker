import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";

const App = () => {
  // declare Octokit
  const octokit = new Octokit();
  // state where commits will be
  const [commits, setCommits] = useState();

  useEffect(() => {
    // function to get all commits for this repository
    const getCommits = async () => {
      const commits = await octokit.request(
        "GET /repos/rmthomas98/github-commit-tracker/commits"
      );
      setCommits(commits.data);
    };
    getCommits();
  }, []);

  console.log(commits);

  return (
    <div className="wrapper">
      <div className="container">
        {commits
          ? commits.map((element, index) => {
              const { name, date } = element.commit.author;
              const { message, url } = element.commit;
              return (
                <div className="commit-container" key={index}>
                  <p className="desc">{name}</p>
                  <p className="desc">{date}</p>
                  <p className="desc">{message}</p>
                  <p className="desc">{url}</p>
                </div>
              );
            })
          : "Loading commits"}
      </div>
    </div>
  );
};

export default App;
