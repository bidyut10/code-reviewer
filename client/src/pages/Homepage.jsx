import HomeAbout from "../components/Home/HomeAbout";
import HomeContent from "../components/Home/HomeContent";
// import HomeCustomerSupport from "../components/Home/HomeCustomerSupport";
import HomeFeature from "../components/Home/HomeFeature";
import HomeFooter from "../components/Home/HomeFooter";
import HomeNavbar from "../components/Home/HomeNavbar";
// import HomePricing from "../components/Home/HomePricing";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <HomeNavbar />
      <HomeContent />
      <HomeFeature />
      {/* <HomePricing/> */}
      {/* <HomeCustomerSupport/> */}
      <HomeAbout />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
