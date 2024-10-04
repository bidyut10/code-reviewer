import useGitHubData from "../utils/useGitHubData";
import UserDetails from "../components/User/UserDetails";
import RepoSelector from "../components/RepoSelector/RepoSelector";
import Navbar from '../components/Navbar'
const GitHubHome = () => {
  const { repos, events, user } = useGitHubData();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-20 flex justify-between gap-40 px-40">
        <UserDetails user={user} events={events} repos={repos} />
        <RepoSelector />
      </div>
    </div>
  );
};

export default GitHubHome;
