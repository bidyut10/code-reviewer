import { useState } from "react";
import useGitHubData from "../utils/useGitHubData";
import useRepoActions from "../utils/useRepoActions";
import UserDetails from "../components/User/UserDetails";
import RepoSelector from "../components/RepoSelector/RepoSelector";

const GitHubHome = () => {
  const { repos, events, user } = useGitHubData();
  const {
    commits,
    connectedRepo,
    showConfirmation,
    handleConnectRepo,
    handleStartCodeReview,
    handleDisconnectRepo,
    confirmDisconnectRepo,
  } = useRepoActions();
  const [selectedRepo, setSelectedRepo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen gap-20 p-10 flex mt-20">
      <UserDetails user={user} events={events} repos={repos} />
      <RepoSelector
        repos={repos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
        handleConnectRepo={() => handleConnectRepo(selectedRepo)}
        connectedRepo={connectedRepo}
        handleDisconnectRepo={handleDisconnectRepo}
        showConfirmation={showConfirmation}
        confirmDisconnectRepo={confirmDisconnectRepo}
        commits={commits}
        selectedRepoName={selectedRepo}
        handleStartCodeReview={handleStartCodeReview}
      />
    </div>
  );
};

export default GitHubHome;
