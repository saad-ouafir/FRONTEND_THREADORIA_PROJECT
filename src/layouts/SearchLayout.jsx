import HeaderComponent from "../components/HeaderComponent";
import ProfilesCard from "../components/Profile/ProfilesCard";
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
      <ProfilesCard fetchedUsers={testUsers} />
      {/* < */}
    </div>
  );
}
