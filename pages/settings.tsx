import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

const Settings = () => {
  const [isInstantSearch, setIsInstantSearch] = useState(false);

  useEffect(() => {
    const instantSearchSetting = localStorage.getItem("isInstantSearch");
    if (instantSearchSetting !== null) {
      setIsInstantSearch(instantSearchSetting === "true");
    } else {
      localStorage.setItem("isInstantSearch", "false");
    }
  }, []);

  const handleInputChange = (value: boolean) => {
    setIsInstantSearch(value);
    localStorage.setItem("isInstantSearch", value.toString());
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100 relative">
      <Link href="/">
        <button className="absolute top-4 right-4 p-2 hover:text-gray-700">
          <FaTimes className="text-gray-500 text-2xl" />
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="w-full max-w-4xl mx-auto mb-4 bg-white rounded-xl p-4">
        <div className="flex items-center mb-4">
          <input
            id="instant"
            type="radio"
            checked={isInstantSearch}
            onChange={() => handleInputChange(true)}
            className="form-radio h-5 w-5 text-blue-600 mr-2"
          />
          <label htmlFor="instant" className="text-gray-800 font-semibold">
            Instant search while typing
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="button"
            type="radio"
            checked={!isInstantSearch}
            onChange={() => handleInputChange(false)}
            className="form-radio h-5 w-5 text-blue-600 mr-2"
          />
          <label htmlFor="button" className="text-gray-800 font-semibold">
            Search when click the button or press Enter
          </label>
        </div>
      </div>
    </main>
  );
};

export default Settings;
