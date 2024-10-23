import React, { useState } from "react";
import { FaChevronDown, FaSearch, FaTimes, FaCheck } from "react-icons/fa";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [work, setWork] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [workSearch, setWorkSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] =
    useState(false);
  const [hasExperience, setHasExperience] = useState(null);
  const [ageGroup, setAgeGroup] = useState("");

  const workOptions = [
    "AC Repair & Service",
    "Plumber",
    "Electrician",
    "Painter",
    "Carpenter",
    "Beautician-Fresher",
    "Chimney Repair",
    "Full Home Cleaning",
    "Gas stove repair",
    "Geyser Repair",
    "Kitchen Cleaning",
    "Pest Control",
    "TV Repair",
    "Wall makeover",
    "RO Water Purifier Repair",
    "Refrigerator Repair",
    "Painting contractor",
    "Spa for women",
    "Massage therapist",
  ];
  const cityOptions = [
    "Indore",
    "Bhopal",
    "Ujjain",
    "Delhi",
    "Pune",
    "Mumbai",
    "Noida",
    "Gurgaon",
    "Nashik",
    "Nagpur",
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Surat",
    "Kochi",
    "Varanasi",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsWorkExperienceModalOpen(true);
  };

  const filteredWorkOptions = workOptions.filter((option) =>
    option.toLowerCase().includes(workSearch.toLowerCase())
  );

  const filteredCityOptions = cityOptions.filter((option) =>
    option.toLowerCase().includes(citySearch.toLowerCase())
  );

  const FullScreenModal = ({
    isOpen,
    onClose,
    title,
    options,
    searchValue,
    onSearchChange,
    onSelect,
    selectedValue,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-2xl">
              &times;
            </button>
          </div>
          <div className="mb-4 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
            />
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  onClose();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center justify-between">
                <span>{option}</span>
                <div
                  className={`w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center ${
                    selectedValue === option ? "bg-blue-500" : ""
                  }`}>
                  {selectedValue === option && (
                    <FaCheck className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const WorkExperienceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed h-screen  inset-0 flex items-center justify-center z-50">
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Tell us about your work!
            </h2>
            <button
              onClick={onClose}
              className="text-2xl text-gray-600 hover:text-gray-800 transition-colors">
              &times;
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Do you have any experience in {work} services?
                </p>
                <div className="space-y-2">
                  {["Yes", "No"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center justify-between border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <label
                        className="py-3 px-4 text-black text-left flex-grow cursor-pointer"
                        htmlFor={`experience-${option.toLowerCase()}`}>
                        {option}
                      </label>
                      <input
                        id={`experience-${option.toLowerCase()}`}
                        type="radio"
                        name="experience"
                        value={option.toLowerCase()}
                        className="form-radio h-5 w-5 text-blue-600 cursor-pointer mr-4"
                        onChange={() => setHasExperience(option === "Yes")}
                        checked={hasExperience === (option === "Yes")}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  What is your age?
                </p>
                <div className="space-y-2">
                  {[
                    "Less than 18 years",
                    "18-45 years",
                    "More than 45 years",
                  ].map((age) => (
                    <div
                      key={age}
                      className="flex items-center justify-between border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <label
                        className="py-3 px-4 text-black text-left flex-grow cursor-pointer"
                        htmlFor={`age-${age}`}>
                        {age}
                      </label>
                      <input
                        id={`age-${age}`}
                        type="radio"
                        name="age"
                        value={age}
                        className="form-radio h-5 w-5 text-blue-600 cursor-pointer mr-4"
                        onChange={() => setAgeGroup(age)}
                        checked={ageGroup === age}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 w-full">
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 py-14">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Tell us about yourself!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700 mx-4">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="work"
              className="block mb-2 text-sm font-medium text-gray-700 mx-4">
              What work do you do?
            </label>
            <button
              type="button"
              onClick={() => setIsWorkModalOpen(true)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:border-transparent text-left flex items-center justify-between">
              <span>{work || "Select work"}</span>
              <FaChevronDown className="transition-transform duration-300" />
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700 mx-4">
              Where do you live?
            </label>
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:border-transparent text-left flex items-center justify-between">
              <span>{location || "Select city"}</span>
              <FaChevronDown className="transition-transform duration-300" />
            </button>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
              By proceeding, you agree to company's{" "}
              <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={!agreeTerms}>
            Continue
          </button>
        </form>
      </div>

      <FullScreenModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        title="Select Work"
        options={filteredWorkOptions}
        searchValue={workSearch}
        onSearchChange={(e) => setWorkSearch(e.target.value)}
        onSelect={setWork}
        selectedValue={work}
      />

      <FullScreenModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        title="Select City"
        options={filteredCityOptions}
        searchValue={citySearch}
        onSearchChange={(e) => setCitySearch(e.target.value)}
        onSelect={setLocation}
        selectedValue={location}
      />

      <WorkExperienceModal
        isOpen={isWorkExperienceModalOpen}
        onClose={() => setIsWorkExperienceModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
