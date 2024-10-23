import React, { useState, useEffect } from "react";
import { FaLock, FaChevronDown, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [getUpdates, setGetUpdates] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const countryOptions = [
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    // Add more country options as needed
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      // Send OTP logic here
      console.log("Sending OTP to:", selectedCountryCode + phoneNumber);
      setOtpSent(true);
    } else {
      // Verify OTP logic here
      console.log("Verifying OTP:", otp);
      console.log("For phone number:", selectedCountryCode + phoneNumber);
      console.log("Get updates on WhatsApp:", getUpdates);
      // OTP verification is now handled by the Link component
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  if (!isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <p className="text-xl text-center">
          This application is optimized for mobile devices. Please access it on
          a mobile device for the best experience.
        </p>
      </div>
    );
  }

  if (showLanguagePopup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white px-6 py-6 rounded-2xl shadow-2xl w-full max-w-xs">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b-2 border-gray-200 pb-2">
            Select Language
          </h2>
          <div className="space-y-4">
            {["english", "hindi"].map((lang) => (
              <div
                key={lang}
                className="flex items-center justify-between border-b-2 border-gray-200 last:border-b-0">
                <label
                  className="py-3 px-4 text-black text-left flex-grow cursor-pointer"
                  htmlFor={`lang-${lang}`}>
                  {lang === "english" ? "English" : "हिन्दी (Hindi)"}
                </label>
                <input
                  id={`lang-${lang}`}
                  type="radio"
                  name="language"
                  value={lang}
                  className="form-radio h-5 w-5 text-blue-600 cursor-pointer"
                  onChange={() => handleLanguageSelect(lang)}
                  checked={selectedLanguage === lang}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center border-t-2 border-gray-200 pt-4">
            <button
              className={`text-white font-bold py-3 px-6 rounded-full transition duration-300 w-full ${
                selectedLanguage
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                if (selectedLanguage) {
                  setShowLanguagePopup(false);
                }
              }}
              disabled={!selectedLanguage}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative">
            <div className="flex">
              <div className="relative">
                <button
                  type="button"
                  className="appearance-none px-3 py-3 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between min-w-[90px]"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span className="flex items-center">
                    <span className="mr-2 text-lg">
                      {
                        countryOptions.find(
                          (option) => option.code === selectedCountryCode
                        )?.flag
                      }
                    </span>
                    <span className="font-medium">{selectedCountryCode}</span>
                  </span>
                  <FaChevronDown
                    className={`ml-2 text-sm transition-transform duration-300 ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                    {countryOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center transition duration-150 ease-in-out"
                        onClick={() => {
                          setSelectedCountryCode(option.code);
                          setIsDropdownOpen(false);
                        }}>
                        <span className="mr-3 text-lg">{option.flag}</span>
                        <span className="font-medium">{option.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 border-l-0 rounded-r-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-0 focus:z-10"
                placeholder="Enter mobile number"
                required
                disabled={otpSent}
              />
            </div>
          </div>
          {otpSent && (
            <div>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter OTP"
                required
              />
            </div>
          )}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={getUpdates}
                onChange={(e) => setGetUpdates(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700 text-sm">
                Get account updates on{" "}
                <FaWhatsapp className="inline-block mr-1 mb-1" />
                WhatsApp
              </span>
            </label>
          </div>
          <div>
            {otpSent ? (
              <div>
                <a
                  href="/dashboard"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center text-lg">
                  <FaLock className="mr-2" />
                  Verify OTP
                </a>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center text-lg">
                <FaLock className="mr-2" />
                Log In / Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
