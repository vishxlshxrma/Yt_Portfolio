import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback } from "components/ui/avatar";

export default function ChannelInfo() {
  const [showContact, setShowContact] = useState(false);
  const [selectedContactType, setSelectedContactType] = useState(null);
  const [formData, setFormData] = useState({});

  const contactOptions = [
    "Employers / Recruiters",
    "Freelance / Client Work Enquiries",
    "Networking / Students / Learners",
    "Casual Chat / AI Enthusiasts",
  ];

  const handleContactTypeSelect = (type) => {
    setSelectedContactType(type);
    setFormData({}); // Reset form data
  };

  const handleBackToOptions = () => {
    setSelectedContactType(null);
    setFormData({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { type: selectedContactType, ...formData });
    alert("Thank you! Your message has been sent.");
    setShowContact(false);
    setSelectedContactType(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg mb-6">
        {/* Left: Avatar + Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#FF0000] text-white font-bold">
              VK
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Vishal Kumar</h3>
            <p className="text-sm text-gray-400">
              2+ years experience • Available for hire
            </p>
          </div>
        </div>

        {/* Contact Button */}
        <Button
          onClick={() => setShowContact(true)}
          className="bg-[#FF0000] hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium"
        >
          Contact
        </Button>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     backdrop-blur-md bg-black/60 animate-fadeIn"
        >
          <div
            className="bg-[#1a1a1a] w-[480px] rounded-xl p-6 shadow-2xl
                       border border-gray-700 animate-popupIn max-h-[90vh] overflow-y-auto"
          >
            {!selectedContactType ? (
              // Initial contact type selection
              <>
                <h2 className="text-lg font-semibold mb-4 text-center">
                  How would you like to connect?
                </h2>

                <div className="space-y-3">
                  {contactOptions.map((category) => (
                    <Button
                      key={category}
                      onClick={() => handleContactTypeSelect(category)}
                      variant="outline"
                      className="w-full bg-[#222] text-white border-gray-700 hover:bg-[#333] transition-colors"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={() => setShowContact(false)}
                  className="mt-6 bg-[#272727] hover:bg-[#333333] text-white w-full"
                >
                  Close
                </Button>
              </>
            ) : (
              // Detailed contact form based on selection
              <ContactForm
                contactType={selectedContactType}
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleFormSubmit}
                onBack={handleBackToOptions}
                onClose={() => setShowContact(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Contact Form Component
function ContactForm({ contactType, formData, onInputChange, onSubmit, onBack, onClose }) {
  const renderFormFields = () => {
    switch (contactType) {
      case "Employers / Recruiters":
        return (
          <>
          <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(e) => onInputChange("yourName", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <input
                type="text"
                value={formData.companyName || ""}
                onChange={(e) => onInputChange("companyName", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Position/Title</label>
              <input
                type="text"
                value={formData.position || ""}
                onChange={(e) => onInputChange("position", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="e.g., HR Manager, Tech Lead"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="your.email@company.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => onInputChange("phone", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tell me about the opportunity *</label>
              <textarea
                value={formData.message || ""}
                onChange={(e) => onInputChange("message", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none resize-none"
                rows="4"
                placeholder="Describe the role, team, and why you're reaching out..."
                required
              />
            </div>
          </>
        );

      case "Freelance / Client Work Enquiries":
        return (
          <>
          <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(e) => onInputChange("yourName", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Project Type *</label>
              <select
                value={formData.projectType || ""}
                onChange={(e) => onInputChange("projectType", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white focus:border-[#FF0000] focus:outline-none"
                required
              >
                <option value="">Select project type</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="ai-ml">AI/ML Solution</option>
                <option value="consulting">Technical Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Budget Range *</label>
              <select
                value={formData.budget || ""}
                onChange={(e) => onInputChange("budget", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white focus:border-[#FF0000] focus:outline-none"
                required
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="over-50k">Over $50,000</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Timeline *</label>
              <select
                value={formData.timeline || ""}
                onChange={(e) => onInputChange("timeline", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white focus:border-[#FF0000] focus:outline-none"
                required
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 2 month</option>
                <option value="2-3-months">3-5 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => onInputChange("phone", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Project Description *</label>
              <textarea
                value={formData.message || ""}
                onChange={(e) => onInputChange("message", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none resize-none"
                rows="4"
                placeholder="Describe your project requirements, goals, and any specific technologies..."
                required
              />
            </div>
          </>
        );

      case "Networking / Students / Learners":
        return (
          <>
          <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(e) => onInputChange("yourName", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Current Role/Field *</label>
              <input
                type="text"
                value={formData.role || ""}
                onChange={(e) => onInputChange("role", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="e.g., Computer Science Student, Junior Developer"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Areas of Interest *</label>
              <input
                type="text"
                value={formData.interests || ""}
                onChange={(e) => onInputChange("interests", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="e.g., React, AI, Web Development, Machine Learning"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">LinkedIn/GitHub Profile (Optional)</label>
              <input
                type="url"
                value={formData.portfolio || ""}
                onChange={(e) => onInputChange("portfolio", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                value={formData.message || ""}
                onChange={(e) => onInputChange("message", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none resize-none"
                rows="4"
                placeholder="What would you like to discuss or learn about?"
                required
              />
            </div>
          </>
        );

      case "Casual Chat / AI Enthusiasts":
        return (
          <>
          <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(e) => onInputChange("yourName", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">AI/Tech Interests *</label>
              <input
                type="text"
                value={formData.interests || ""}
                onChange={(e) => onInputChange("interests", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="e.g., Machine Learning, ChatGPT, Robotics, Future of AI"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Preferred Communication *</label>
              <select
                value={formData.communication || ""}
                onChange={(e) => onInputChange("communication", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white focus:border-[#FF0000] focus:outline-none"
                required
              >
                <option value="">Select preference</option>
                <option value="email">Email</option>
                <option value="discord">Discord</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">What would you like to chat about? *</label>
              <textarea
                value={formData.message || ""}
                onChange={(e) => onInputChange("message", e.target.value)}
                className="w-full p-3 bg-[#222] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FF0000] focus:outline-none resize-none"
                rows="4"
                placeholder="Share your thoughts on AI, ask questions, or suggest discussion topics..."
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-gray-400 hover:text-white p-2 mr-2"
        >
          ← Back
        </Button>
        <h2 className="text-lg font-semibold flex-1 text-center mr-8">
          {contactType}
        </h2>
      </div>

      <form onSubmit={onSubmit}>
        {renderFormFields()}

        <div className="flex space-x-3 mt-6">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1 bg-[#272727] hover:bg-[#333333] text-white border-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#FF0000] hover:bg-red-600 text-white"
          >
            Send Message
          </Button>
        </div>
      </form>
    </>
  );
}

/*
Animations (if not already present in global.css):

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes popupIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
.animate-popupIn { animation: popupIn 0.25s ease-out forwards; }
*/
