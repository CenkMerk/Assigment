import Header from "../../components/Header/Header.jsx";
import LastAdd from "../../components/LastAdd/LastAdd.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { HomepageContainer, HomepageContent } from "./Homepage.js";
import { useSelector } from "react-redux";

const Homepage = () => {
  const { companyItems } = useSelector((store) => store.company);
  console.log(companyItems);
  return (
    <HomepageContainer>
      <Header />
      <HomepageContent>
        <Navbar />
        <img src="11021.jpg" alt="sc" width="50%" />
        <div>
          <h1 style={{color:"#2B3D63"}}>Son Eklenen Şirketler</h1>
          {companyItems.slice(0, 3).map((company, index) => (
            <LastAdd key={index} data={company} />
          ))}
        </div>
      </HomepageContent>
    </HomepageContainer>
  );
};

export default Homepage;
