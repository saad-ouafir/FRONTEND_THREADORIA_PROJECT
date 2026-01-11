import HeaderComponent from "../components/HeaderComponent";
import ProfileResultsCard from "../components/Search/ProfileResultsCard";
import SearchResultBar from "../components/Search/SearchResultBar";
export default function SearchLayout({ results }) {
  const testUsers = [
    {
      id: 1,
      full_name: "Sophia Amrani",
    },
    {
      id: 2,
      full_name: "Youssef El Khomssi",
    },
  ];

  return (
    <div>
      <HeaderComponent page={"Search"} />
      <SearchResultBar />
      <ProfileResultsCard fetchedUsers={testUsers} />
      {/* < */}
    </div>
  );
}
