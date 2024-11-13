import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";
import { useSelector } from "react-redux";
import { getUserName } from "../features/user/userSlice";

function Header() {
  const userName = useSelector(getUserName);
  return (
    <header
      className="flex items-center justify-between border-b
     border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6"
    >
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {userName && <UserName />}
    </header>
  );
}

export default Header;
