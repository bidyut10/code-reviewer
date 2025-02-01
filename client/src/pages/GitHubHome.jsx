import useGitHubData from "../utils/useGitHubData";
import UserDetails from "../components/User/UserDetails";
import RepoSelector from "../components/RepoSelector/RepoSelector";
import Navbar from '../components/Navbar'
import FullScreenLoader from "../components/FullScreenLoader";

const GitHubHome = () => {
  const { repos, events, user, loading } = useGitHubData();

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <FullScreenLoader loading={loading} />
      <div className="min-h-screen w-full max-w-5xl mt-10 flex flex-col md:flex-row md:justify-between gap-10 md:mt-20 md:mb-0 mb-20">
        <UserDetails user={user} events={events} repos={repos} />
        <RepoSelector />
      </div>
    </div>
  );
};

export default GitHubHome;
