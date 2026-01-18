import HeaderComponent from "../components/HeaderComponent";
import SuggestedThreads from "../components/Threads/SuggestedThreads";
import ThreadForm from "../components/Threads/ThreadForm";

export default function HomeLayout() {
  return (
    <div>
      <HeaderComponent page="Home" />
      <ThreadForm />
      <SuggestedThreads />
    </div>
  );
}
