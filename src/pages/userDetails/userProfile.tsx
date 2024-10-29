import Image from "next/image";
import { Search, ChevronDown, Edit2, X } from "lucide-react";
import { useState } from "react";

interface StyledInputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput: React.FC<StyledInputProps> = ({
  placeholder,
  type,
  value,
  onChange,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-1 py-2 border-b-2 border-[#E8E8E8] placeholder-[#555555] text-[#555555] text-sm focus:outline-none focus:border-blue-500"
  />
);

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  const toggleTab = () => {
    setActiveTab(activeTab === "personal" ? "password" : "personal");
  };
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  const handleSave = () => {
    console.log("Saving:", { fullName, email });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
            </div>
            <div className="ml-4 relative w-full sm:w-auto">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="form-input block w-full sm:text-sm sm:leading-5 pr-10 py-2 px-3 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2 hidden sm:inline">
              1 (800) 657 8976
            </span>
            <div className="flex items-center">
              <Image
                src="/placeholder.svg"
                alt="Profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-gray-700">Jon Doe</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>
      <div className="bg-[#0064D2] bg-opacity-20 w-full h-[415px] relative">
        <div className="absolute top-[40px] left-[30px]">
          <h1 className="text-[#1F2937] text-2xl font-bold">Profile</h1>
        </div>
        <div className="absolute top-[40px] right-[30px] w-6 h-6 bg-[#0064D2] bg-opacity-20 rounded-md flex items-center justify-center">
          <X className="w-4 h-4 text-[#0064D2]" />
        </div>

        <div className="absolute bottom-[112px] left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Image
                src="/placeholder.svg"
                alt="Jon Doe"
                width={120}
                height={120}
                className="h-32 w-32 rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <Edit2 className="h-5 w-5 text-blue-500" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Jon Doe
            </h2>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="absolute top-[430px] left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-[310px]">
            <button
              className="relative w-full h-[51px] bg-white rounded-lg shadow-md overflow-hidden"
              onClick={toggleTab}
            >
              {/* Left part: Personal Info */}
              <div
                className={`absolute left-3 top-[6px] w-1/2 h-[32px] rounded-lg flex items-center justify-center transition-all duration-300 ${
                  activeTab === "personal" ? "bg-[#5E81F4]" : "bg-white"
                }`}
              >
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    activeTab === "personal" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Personal Info
                </span>
              </div>

              {/* Right part: Password */}
              <div
                className={`absolute right-3 top-[6px] w-1/2 h-[32px] rounded-lg flex items-center justify-center transition-all duration-300 ${
                  activeTab === "password" ? "bg-[#5E81F4]" : "bg-transparent"
                }`}
              >
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    activeTab === "password" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Password
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="max-w-md mx-auto">
          {activeTab === "personal" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-10 mt-10">
                <StyledInput
                  placeholder="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="mb-10">
                <StyledInput
                  placeholder="Your Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="w-20 bg-blue-500 rounded-3xl text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {activeTab === "password" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-10">
                <StyledInput
                  placeholder="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-10">
                <StyledInput
                  placeholder="Confirm Password"
                  type="password"
                  value={Cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="w-20 bg-blue-500 rounded-3xl text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      
    </div>
  );
}
