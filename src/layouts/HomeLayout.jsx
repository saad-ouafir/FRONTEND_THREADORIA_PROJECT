import HeaderComponent from "../components/HeaderComponent";
import ThreadForm from "../components/Threads/ThreadForm";
import ThreadsCard from "../components/Threads/ThreadsCard";

export default function HomeLayout() {
  return (
    <div>
      <HeaderComponent page="Home" />
      <ThreadForm />
      <ThreadsCard />
    </div>
  );
}
