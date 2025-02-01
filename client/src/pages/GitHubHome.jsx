import useGitHubData from "../utils/useGitHubData";
import UserDetails from "../components/User/UserDetails";
import RepoSelector from "../components/RepoSelector/RepoSelector";
import Navbar from '../components/Navbar'
import FullScreenLoader from "../components/FullScreenLoader";

const GitHubHome = () => {
  const { repos, events, user, loading } = useGitHubData();

  return (
    <div>
      <Navbar />
      <FullScreenLoader loading={loading} />
      <div className="min-h-screen w-full max-w-5xl mt-10 flex flex-col md:flex-row md:justify-between gap-20 px-4 md:mt-20 md:mb-0 mb-20 md:gap-40 md:px-0">
        <UserDetails user={user} events={events} repos={repos} />
        <RepoSelector />
      </div>
    </div>
  );
};

export default GitHubHome;
