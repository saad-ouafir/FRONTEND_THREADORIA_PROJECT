import FollowSuggestions from "../components/RightBar/FollowSuggestions";
import SearchInput from "../components/RightBar/SearchInput";

export default function RightBarLayout() {
  return (
    <div>
      <SearchInput />
      <FollowSuggestions />
    </div>
  );
}
