// Search.js
import { useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import CapsuleWrapper from "./Capsule";

const Search = ({ search, setSearch }) => {

  // const [focus,setFocus]=useState();
  const searchRef=useRef(null);
  useEffect(()=>{
    const handleKeyDown=(e)=>{
      if((e.ctrlKey || e.metaKey) && e.key=='s'){
          e.preventDefault();
          searchRef.current.focus();  
      }
    }
    document.addEventListener('keydown',handleKeyDown);
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown);
    }
  },[])
  return (
    <div className="relative w-[85%] ">
      <input
        type="text"
        ref={searchRef}
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <BiSearchAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

// export default Search;

// Sort.js
import { FaSortAmountDown } from "react-icons/fa";

const Sort = ({ sortOpen, setSortOpen, setSortBy }) => {
  const handleSortSelection = (sortType) => {
    setSortBy(sortType);
    setSortOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative border flex-shrink-0 w-[auto] md:w-[10%]">
      <CapsuleWrapper>
      <button
        onClick={() => setSortOpen(!sortOpen)}
        className="flex items-center justify-evenly p-2 border w-full rounded-3xl  hover:bg-gray-200"
      >
        <HiOutlineAdjustmentsHorizontal className="size-5" />
        <span className="hidden sm:block">Sort</span>
      </button>
      </CapsuleWrapper>

      {sortOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 shadow-md rounded-md">
          <ul className="text-sm">
            <li onClick={() => handleSortSelection("recent")} className="p-2 hover:bg-gray-200 cursor-pointer">
              Recent
            </li>
            <li onClick={() => handleSortSelection("audio")} className="p-2 hover:bg-gray-200 cursor-pointer">
              Audio
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};



// TopBar.js


// TODO: need make some changes regaridng state move upward state or use context
const TopBar = ({setSortBy}) => {
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-3 w-full rounded-md border">
      <Search search={search} setSearch={setSearch} />
      <Sort sortOpen={sortOpen} setSortBy={setSortBy} setSortOpen={setSortOpen} />
    </div>
  );
};

export default TopBar;
