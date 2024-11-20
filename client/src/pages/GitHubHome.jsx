import useGitHubData from "../utils/useGitHubData";
import UserDetails from "../components/User/UserDetails";
import RepoSelector from "../components/RepoSelector/RepoSelector";
import Navbar from '../components/Navbar'
const GitHubHome = () => {
  const { repos, events, user } = useGitHubData();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-10 flex flex-col md:flex-row md:justify-between gap-20 px-6 md:mt-20 md:mb-0 mb-20 md:gap-40 md:px-40">
        <UserDetails user={user} events={events} repos={repos} />
        <RepoSelector />
      </div>
    </div>
  );
};

export default GitHubHome;
