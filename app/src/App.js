import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
        <div className="label-container">
          <p className="label">Committer</p>
          <p className="label">Date</p>
          <p className="label">Message</p>
          <p className="label" style={{ maxWidth: 123, marginRight: 0 }}>
            Link
          </p>
        </div>
        {commits
          ? commits.map((element, index) => {
              const { name, date } = element.commit.author;
              const { message } = element.commit;
              const { html_url: htmlUrl } = element;
              return (
                <div className="commit-container" key={index}>
                  <p className="desc name">{name}</p>
                  <p className="desc date">
                    {format(new Date(date), "MMMM, dd yyyy h:mm aa")}
                  </p>
                  <p className="desc message">{message}</p>
                  <a
                    href={htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-btn"
                  >
                    View commit
                  </a>
                </div>
              );
            })
          : "Loading commits"}
      </div>
    </div>
  );
};

export default App;
