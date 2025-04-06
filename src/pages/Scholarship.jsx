import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import WaveBackground from "../components/WaveBackground/WaveBackground";
import {
  FaSearch,
  FaUniversity,
  FaRupeeSign,
  FaUserGraduate,
  FaGraduationCap,
  FaFilter,
  FaBook,
  FaClock,
  FaUser,
  FaTimes,
  FaCalendarAlt,
  FaCheckCircle,
  FaDownload,
  FaInfoCircle,
  FaExclamationCircle,
} from "react-icons/fa";

// Sample scholarship data - EXPANDED
const scholarshipData = [
  {
    id: 1,
    name: "National Merit Scholarship",
    provider: "Government of India",
    description:
      "Merit-based scholarship for high-achieving students across all disciplines.",
    amount: "₹50,000 per year",
    deadline: "October 30, 2025",
    type: "government",
    eligibility: {
      cgpa: 8.5,
      income: 800000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Academic transcripts (10th, 12th, and current semester)",
      "Income certificate from authorized government body",
      "Domicile certificate",
      "Character certificate from current institution",
      "2 recommendation letters from faculty members",
    ],
    benefits: [
      "Annual stipend of ₹50,000",
      "Book allowance of ₹5,000 per year",
      "Research/project funding opportunities",
      "Access to national conferences and workshops",
    ],
    applicationProcess:
      "Online application through National Scholarship Portal followed by document verification at the institution level.",
    contactPerson: "Dr. Rajesh Kumar",
    contactEmail: "nms.support@education.gov.in",
  },
  {
    id: 2,
    name: "Tech Innovators Fund",
    provider: "TechCorp Foundation",
    description:
      "Supporting technology students with innovative project ideas and strong academics.",
    amount: "₹75,000 per year",
    deadline: "September 15, 2025",
    type: "private",
    eligibility: {
      cgpa: 7.5,
      income: 1200000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Project proposal (max 5 pages)",
      "Academic transcripts",
      "Recommendation letter from department head",
      "Personal statement",
      "Demo/prototype (if applicable)",
    ],
    benefits: [
      "Annual financial support of ₹75,000",
      "Mentorship from industry professionals",
      "Internship opportunities at TechCorp partners",
      "Incubation support for promising projects",
    ],
    applicationProcess:
      "Submit application through TechCorp website. Shortlisted candidates will be invited for an online interview and project presentation.",
    contactPerson: "Ms. Ananya Singh",
    contactEmail: "scholarships@techcorp.org",
  },
  {
    id: 3,
    name: "Women in STEM Scholarship",
    provider: "WiSTEM Organization",
    description:
      "Encouraging women to pursue careers in Science, Technology, Engineering and Mathematics.",
    amount: "₹60,000 per year",
    deadline: "November 20, 2025",
    type: "private",
    eligibility: {
      cgpa: 7.0,
      income: 1500000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Female"],
    },
    requirements: [
      "Academic transcripts",
      "Personal essay on career goals in STEM (500-800 words)",
      "Two recommendation letters",
      "Proof of enrollment in a STEM program",
      "List of extracurricular activities related to STEM",
    ],
    benefits: [
      "Annual stipend of ₹60,000",
      "Mentorship from women leaders in STEM",
      "Networking events and workshops",
      "Industry exposure through company visits",
    ],
    applicationProcess:
      "Online application followed by evaluation. Selected candidates may be invited for an interview.",
    contactPerson: "Dr. Priya Mehta",
    contactEmail: "scholarships@wistem.org",
  },
  {
    id: 4,
    name: "Post-Matric Scholarship",
    provider: "Ministry of Social Justice",
    description:
      "Financial assistance for scheduled caste students pursuing post-matriculation education.",
    amount: "₹45,000 per year",
    deadline: "December 5, 2025",
    type: "government",
    eligibility: {
      cgpa: 6.0,
      income: 600000,
      category: ["SC"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Caste certificate",
      "Income certificate of parents/guardian",
      "Previous academic records",
      "Bank account details (linked with Aadhaar)",
      "Institution verification",
    ],
    benefits: [
      "Annual maintenance allowance of ₹45,000",
      "Reimbursement of non-refundable fees",
      "Book allowance",
      "Disability allowance (if applicable)",
    ],
    applicationProcess:
      "Apply through National Scholarship Portal with institution verification and document submission.",
    contactPerson: "Shri Mohan Lal",
    contactEmail: "pms.support@socialjustice.gov.in",
  },
  {
    id: 5,
    name: "Global Leaders Program",
    provider: "International Education Fund",
    description:
      "Supporting students with leadership potential and global perspective.",
    amount: "₹100,000 per year",
    deadline: "August 30, 2025",
    type: "private",
    eligibility: {
      cgpa: 8.0,
      income: 1000000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Leadership portfolio",
      "Essay on global challenges (800-1000 words)",
      "Academic records",
      "Evidence of extracurricular activities",
      "Video introduction (2 minutes)",
    ],
    benefits: [
      "Annual scholarship of ₹100,000",
      "International conference participation",
      "Leadership development workshops",
      "Global networking opportunities",
      "Exchange program eligibility",
    ],
    applicationProcess:
      "Multi-stage application including written application, video submission, and panel interview for finalists.",
    contactPerson: "Mr. James Anderson",
    contactEmail: "glp@internationaleducation.org",
  },
  {
    id: 6,
    name: "Rural Student Empowerment Scholarship",
    provider: "Rural Development Trust",
    description:
      "Supporting talented students from rural areas to pursue higher education.",
    amount: "₹40,000 per year",
    deadline: "October 15, 2025",
    type: "private",
    eligibility: {
      cgpa: 7.0,
      income: 400000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Proof of rural residence",
      "Academic transcripts",
      "Income certificate",
      "Essay on rural development",
      "Recommendation from school principal",
    ],
    benefits: [
      "Annual financial assistance of ₹40,000",
      "Mentoring support",
      "Career counseling",
      "Remedial coaching if needed",
    ],
    applicationProcess:
      "Paper application to be submitted to local RDT office or online through the official website.",
    contactPerson: "Ms. Lakshmi Devi",
    contactEmail: "scholarships@ruraltrust.org",
  },
  {
    id: 7,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Government of India",
    description:
      "Merit-based scholarship for children of armed forces personnel.",
    amount: "₹36,000 per year",
    deadline: "July 31, 2025",
    type: "government",
    eligibility: {
      cgpa: 6.5,
      income: 900000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Certificate of eligibility from armed forces",
      "Academic records",
      "Birth certificate",
      "Parent's service certificate",
      "Bank account details",
    ],
    benefits: [
      "Annual scholarship of ₹36,000",
      "Recognition certificate",
      "Priority in hostel accommodation",
    ],
    applicationProcess:
      "Online application through official website with verification by the armed forces unit.",
    contactPerson: "Wg Cdr Praveen Singh",
    contactEmail: "pmss.support@mod.gov.in",
  },
  {
    id: 8,
    name: "Future Engineers Fellowship",
    provider: "IndTech Association",
    description:
      "Supporting engineering students with exceptional technical aptitude.",
    amount: "₹65,000 per year",
    deadline: "September 30, 2025",
    type: "private",
    eligibility: {
      cgpa: 8.0,
      income: 1000000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Technical project portfolio",
      "Coding assessment results",
      "Academic transcripts",
      "Letter of recommendation from technical mentor",
      "Statement of purpose",
    ],
    benefits: [
      "Annual stipend of ₹65,000",
      "Industry internship placement",
      "Technical workshops and bootcamps",
      "Access to premium online courses",
    ],
    applicationProcess:
      "Online application with technical assessment and video interview for shortlisted candidates.",
    contactPerson: "Dr. Vikram Mehta",
    contactEmail: "fellowship@indtech.org",
  },
  {
    id: 9,
    name: "Minority Welfare Scholarship",
    provider: "Ministry of Minority Affairs",
    description:
      "Financial assistance for students from notified minority communities.",
    amount: "₹30,000 per year",
    deadline: "November 30, 2025",
    type: "government",
    eligibility: {
      cgpa: 6.0,
      income: 500000,
      category: ["General", "OBC"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Minority community certificate",
      "Income certificate",
      "Academic records",
      "Bank account details",
      "Institution verification",
    ],
    benefits: [
      "Annual maintenance allowance of ₹30,000",
      "Course fee reimbursement",
      "Study material allowance",
    ],
    applicationProcess:
      "Apply through National Scholarship Portal with institution verification.",
    contactPerson: "Mr. Ahmed Khan",
    contactEmail: "mws.support@minorityaffairs.gov.in",
  },
  {
    id: 10,
    name: "Green Innovators Scholarship",
    provider: "EcoTech Foundation",
    description:
      "Supporting students developing sustainable and eco-friendly solutions.",
    amount: "₹55,000 per year",
    deadline: "October 10, 2025",
    type: "private",
    eligibility: {
      cgpa: 7.0,
      income: 1100000,
      category: ["General", "OBC", "SC", "ST"],
      gender: ["Male", "Female", "Other"],
    },
    requirements: [
      "Sustainability project proposal",
      "Academic transcripts",
      "Essay on environmental challenges",
      "Recommendation letter",
      "Video presentation of project idea",
    ],
    benefits: [
      "Annual stipend of ₹55,000",
      "Mentorship from sustainability experts",
      "Project implementation support",
      "Presentation opportunity at Green Summit",
    ],
    applicationProcess:
      "Two-stage application with initial proposal submission followed by detailed project presentation.",
    contactPerson: "Dr. Sunita Narain",
    contactEmail: "scholarships@ecotech.org",
  },
];

const Scholarship = ({ cartItems = [] }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    cgpa: "",
    tenthMarks: "",
    twelfthMarks: "",
    income: "",
    category: "",
    gender: "",
  });

  const [matchedScholarships, setMatchedScholarships] = useState([]);
  const [profileComplete, setProfileComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  // Updated date and time
  const currentDateTime = "2025-04-06 02:18:17";
  const currentUser = "tanishyadav06012005";

  // State for the scholarship detail popup
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Check if profile is complete enough to filter scholarships
  useEffect(() => {
    const requiredFields = ["cgpa", "income", "category", "gender"];
    const isComplete = requiredFields.every((field) => profile[field] !== "");
    setProfileComplete(isComplete);

    if (isComplete) {
      filterScholarships();
    }
  }, [profile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter scholarships based on profile
  const filterScholarships = () => {
    const filtered = scholarshipData.filter((scholarship) => {
      const { eligibility } = scholarship;

      // Check CGPA
      if (parseFloat(profile.cgpa) < eligibility.cgpa) return false;

      // Check income
      if (parseFloat(profile.income) > eligibility.income) return false;

      // Check category
      if (!eligibility.category.includes(profile.category)) return false;

      // Check gender
      if (!eligibility.gender.includes(profile.gender)) return false;

      return true;
    });

    setMatchedScholarships(filtered);
  };

  // Filter scholarships by type (all, government, private)
  const getFilteredScholarships = () => {
    if (activeTab === "all") return matchedScholarships;
    return matchedScholarships.filter((s) => s.type === activeTab);
  };

  // Open scholarship detail modal
  const openScholarshipDetail = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowDetailModal(true);
    setApplicationSubmitted(false);
  };

  // Close scholarship detail modal
  const closeScholarshipDetail = () => {
    setShowDetailModal(false);
    setSelectedScholarship(null);
  };

  // Handle scholarship application submission
  const handleApplySubmit = (e) => {
    e.preventDefault();
    // Simulate application submission
    setTimeout(() => {
      setApplicationSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* Background with waves */}
      <WaveBackground />

      <Navbar cartItems={cartItems} onCartClick={() => navigate("/checkout")} />

      <div className="container mx-auto pt-28 pb-20 px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Scholarship Dashboard
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Find scholarships that match your profile
          </p>

          {/* User info and datetime in a subtle banner */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Input Section */}
          <div className="bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Student Profile
              </h2>
              <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <FaUserGraduate className="text-indigo-600 text-sm" />
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current CGPA
                </label>
                <input
                  type="number"
                  name="cgpa"
                  placeholder="e.g. 8.5"
                  min="0"
                  max="10"
                  step="0.1"
                  value={profile.cgpa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    10th Marks (%)
                  </label>
                  <input
                    type="number"
                    name="tenthMarks"
                    placeholder="e.g. 85"
                    min="0"
                    max="100"
                    value={profile.tenthMarks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    12th Marks (%)
                  </label>
                  <input
                    type="number"
                    name="twelfthMarks"
                    placeholder="e.g. 80"
                    min="0"
                    max="100"
                    value={profile.twelfthMarks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Family Income (₹)
                </label>
                <input
                  type="number"
                  name="income"
                  placeholder="e.g. 500000"
                  value={profile.income}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={profile.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {!profileComplete && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700 border border-blue-100">
                  <div className="flex items-start">
                    <FaBook className="text-blue-500 mt-0.5 mr-2" />
                    <p>Complete your profile to see matching scholarships</p>
                  </div>
                </div>
              )}

              {profileComplete && (
                <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700 border border-green-100">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-0.5 mr-2" />
                    <p>
                      Profile complete! We found {matchedScholarships.length}{" "}
                      matching scholarships for you.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Scholarships List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-gray-100 h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Available Scholarships
                  </h2>
                  <div className="ml-2 h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center">
                    <FaGraduationCap className="text-indigo-600 text-sm" />
                  </div>
                </div>

                {/* Filter tabs */}
                <div className="flex bg-gray-50 rounded-lg p-1">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      activeTab === "all"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      activeTab === "government"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("government")}
                  >
                    Government
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      activeTab === "private"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("private")}
                  >
                    Private
                  </button>
                </div>
              </div>

              {profileComplete ? (
                <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
                  {getFilteredScholarships().length > 0 ? (
                    getFilteredScholarships().map((scholarship) => (
                      <div
                        key={scholarship.id}
                        className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {scholarship.name}
                          </h3>
                          <span
                            className={`text-xs px-3 py-1 rounded-lg font-medium ${
                              scholarship.type === "government"
                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                : "bg-purple-50 text-purple-700 border border-purple-100"
                            }`}
                          >
                            {scholarship.type === "government"
                              ? "Government"
                              : "Private"}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          {scholarship.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div className="flex items-center text-sm">
                            <FaUniversity className="text-indigo-600 mr-2" />
                            <span>{scholarship.provider}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <FaRupeeSign className="text-indigo-600 mr-2" />
                            <span>{scholarship.amount}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm font-medium text-red-600">
                            Deadline: {scholarship.deadline}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="text-indigo-600 hover:text-indigo-800 text-sm py-1.5 px-3 rounded-lg border border-indigo-200 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 transition-all duration-200"
                              onClick={() => openScholarshipDetail(scholarship)}
                            >
                              View Details
                            </button>
                            <button
                              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm py-1.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                              onClick={() => openScholarshipDetail(scholarship)}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
                      <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
                      <p className="text-gray-600 text-lg font-medium">
                        No matching scholarships found
                      </p>
                      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                        Try adjusting your profile details to find more
                        opportunities that match your qualifications.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-gray-100">
                  <FaUserGraduate className="text-gray-300 text-5xl mb-4" />
                  <p className="text-gray-600 text-lg font-medium text-center">
                    Complete your student profile
                  </p>
                  <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
                    Enter your academic, financial, and demographic details to
                    view scholarships that match your profile.
                  </p>
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <FaFilter className="text-sm" />
                      <span className="font-medium">
                        Filter criteria required
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Detail Modal */}
      {showDetailModal && selectedScholarship && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedScholarship.name}
              </h2>
              <button
                onClick={closeScholarshipDetail}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              {applicationSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your application for the {selectedScholarship.name} has been
                    received. We will contact you soon.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg inline-block">
                    <p className="text-sm text-gray-700">
                      Application Reference Number:
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      SCH-{selectedScholarship.id}-
                      {Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={closeScholarshipDetail}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          selectedScholarship.type === "government"
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "bg-purple-50 text-purple-700 border border-purple-100"
                        }`}
                      >
                        {selectedScholarship.type === "government"
                          ? "Government"
                          : "Private"}
                      </span>
                      <span className="ml-3 text-sm text-red-600 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        Deadline: {selectedScholarship.deadline}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-indigo-600">
                      {selectedScholarship.amount}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      About This Scholarship
                    </h3>
                    <p className="text-gray-700">
                      {selectedScholarship.description}
                    </p>
                    <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm">
                        <FaUniversity className="text-indigo-600 mr-2" />
                        <span className="font-medium text-gray-600">
                          Provider:
                        </span>
                        <span className="ml-2 text-gray-800">
                          {selectedScholarship.provider}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Eligibility Requirements
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Minimum CGPA:{" "}
                            <span className="font-medium">
                              {selectedScholarship.eligibility.cgpa}
                            </span>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Maximum Family Income:{" "}
                            <span className="font-medium">
                              ₹
                              {selectedScholarship.eligibility.income.toLocaleString()}
                            </span>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Categories:{" "}
                            <span className="font-medium">
                              {selectedScholarship.eligibility.category.join(
                                ", "
                              )}
                            </span>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Gender:{" "}
                            <span className="font-medium">
                              {selectedScholarship.eligibility.gender.join(
                                ", "
                              )}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Benefits
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {selectedScholarship.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Required Documents
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {selectedScholarship.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Application Process
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {selectedScholarship.applicationProcess}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Contact Person:</p>
                        <p className="font-medium text-gray-800">
                          {selectedScholarship.contactPerson}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email:</p>
                        <p className="font-medium text-gray-800">
                          {selectedScholarship.contactEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Apply for this Scholarship
                    </h3>

                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Your phone number"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Institution
                          </label>
                          <input
                            type="text"
                            placeholder="Your current institution"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Statement of Purpose
                        </label>
                        <textarea
                          placeholder="Briefly explain why you should be considered for this scholarship..."
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          required
                        ></textarea>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mr-2"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-700"
                        >
                          I confirm that all information provided is accurate
                          and complete.
                        </label>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-100">
                        <div className="flex items-start">
                          <FaExclamationCircle className="text-yellow-500 mt-0.5 mr-2" />
                          <div>
                            <p className="font-medium">
                              Note: Document Upload Required
                            </p>
                            <p className="mt-1">
                              After submitting this initial application, you
                              will be required to upload all necessary documents
                              as listed above.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={closeScholarshipDetail}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition-all"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarship;
