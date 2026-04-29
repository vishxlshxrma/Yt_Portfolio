import React, { useEffect, useState } from "react";
import { Button } from "components/ui/button";

const contactOptions = [
  "Employers / Recruiters",
  "Freelance / Client Work Enquiries",
  "Networking / Students / Learners",
  "Casual Chat / AI Enthusiasts",
];

export default function ContactModal({ open, onClose }) {
  const [selectedContactType, setSelectedContactType] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (open) return;
    setSelectedContactType(null);
    setFormData({});
  }, [open]);

  if (!open) return null;

  const handleContactTypeSelect = (type) => {
    setSelectedContactType(type);
    setFormData({});
  };

  const handleBackToOptions = () => {
    setSelectedContactType(null);
    setFormData({});
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { type: selectedContactType, ...formData });
    alert("Thank you! Your message has been sent.");
    onClose?.();
  };

  const handleInputChange = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-[var(--overlay-backdrop)] animate-fadeIn">
      <div className="max-h-[90vh] w-[480px] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text-primary)] shadow-2xl animate-popupIn">
        {!selectedContactType ? (
          <>
            <h2 className="mb-4 text-center text-lg font-semibold">
              How would you like to connect?
            </h2>

            <div className="space-y-3">
              {contactOptions.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleContactTypeSelect(category)}
                  variant="outline"
                  className="w-full border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  {category}
                </Button>
              ))}
            </div>

            <Button
              onClick={onClose}
              className="mt-6 w-full bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-strong)]"
            >
              Close
            </Button>
          </>
        ) : (
          <ContactForm
            contactType={selectedContactType}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleFormSubmit}
            onBack={handleBackToOptions}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

function ContactForm({ contactType, formData, onInputChange, onSubmit, onBack, onClose }) {
  const fieldClassName =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-red)] focus:outline-none";
  const textareaClassName = `${fieldClassName} resize-none`;

  const renderFormFields = () => {
    switch (contactType) {
      case "Employers / Recruiters":
        return (
          <>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(event) => onInputChange("yourName", event.target.value)}
                className={fieldClassName}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Company Name *</label>
              <input
                type="text"
                value={formData.companyName || ""}
                onChange={(event) => onInputChange("companyName", event.target.value)}
                className={fieldClassName}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Your Position/Title</label>
              <input
                type="text"
                value={formData.position || ""}
                onChange={(event) => onInputChange("position", event.target.value)}
                className={fieldClassName}
                placeholder="e.g., HR Manager, Tech Lead"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(event) => onInputChange("email", event.target.value)}
                className={fieldClassName}
                placeholder="your.email@company.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(event) => onInputChange("phone", event.target.value)}
                className={fieldClassName}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                Tell me about the opportunity *
              </label>
              <textarea
                value={formData.message || ""}
                onChange={(event) => onInputChange("message", event.target.value)}
                className={textareaClassName}
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
              <label className="mb-2 block text-sm font-medium">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(event) => onInputChange("yourName", event.target.value)}
                className={fieldClassName}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Project Type *</label>
              <select
                value={formData.projectType || ""}
                onChange={(event) => onInputChange("projectType", event.target.value)}
                className={fieldClassName}
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
              <label className="mb-2 block text-sm font-medium">Budget Range *</label>
              <select
                value={formData.budget || ""}
                onChange={(event) => onInputChange("budget", event.target.value)}
                className={fieldClassName}
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
              <label className="mb-2 block text-sm font-medium">Timeline *</label>
              <select
                value={formData.timeline || ""}
                onChange={(event) => onInputChange("timeline", event.target.value)}
                className={fieldClassName}
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
              <label className="mb-2 block text-sm font-medium">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(event) => onInputChange("email", event.target.value)}
                className={fieldClassName}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(event) => onInputChange("phone", event.target.value)}
                className={fieldClassName}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Project Description *</label>
              <textarea
                value={formData.message || ""}
                onChange={(event) => onInputChange("message", event.target.value)}
                className={textareaClassName}
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
              <label className="mb-2 block text-sm font-medium">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(event) => onInputChange("yourName", event.target.value)}
                className={fieldClassName}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Current Role/Field *</label>
              <input
                type="text"
                value={formData.role || ""}
                onChange={(event) => onInputChange("role", event.target.value)}
                className={fieldClassName}
                placeholder="e.g., Computer Science Student, Junior Developer"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Areas of Interest *</label>
              <input
                type="text"
                value={formData.interests || ""}
                onChange={(event) => onInputChange("interests", event.target.value)}
                className={fieldClassName}
                placeholder="e.g., React, AI, Web Development, Machine Learning"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(event) => onInputChange("email", event.target.value)}
                className={fieldClassName}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                LinkedIn/GitHub Profile (Optional)
              </label>
              <input
                type="url"
                value={formData.portfolio || ""}
                onChange={(event) => onInputChange("portfolio", event.target.value)}
                className={fieldClassName}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Message *</label>
              <textarea
                value={formData.message || ""}
                onChange={(event) => onInputChange("message", event.target.value)}
                className={textareaClassName}
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
              <label className="mb-2 block text-sm font-medium">Your Name *</label>
              <input
                type="text"
                value={formData.yourName || ""}
                onChange={(event) => onInputChange("yourName", event.target.value)}
                className={fieldClassName}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">AI/Tech Interests *</label>
              <input
                type="text"
                value={formData.interests || ""}
                onChange={(event) => onInputChange("interests", event.target.value)}
                className={fieldClassName}
                placeholder="e.g., Machine Learning, ChatGPT, Robotics, Future of AI"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Email Address *</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(event) => onInputChange("email", event.target.value)}
                className={fieldClassName}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Preferred Communication *</label>
              <select
                value={formData.communication || ""}
                onChange={(event) => onInputChange("communication", event.target.value)}
                className={fieldClassName}
                required
              >
                <option value="">Select preference</option>
                <option value="email">Email</option>
                <option value="discord">Discord</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                What would you like to chat about? *
              </label>
              <textarea
                value={formData.message || ""}
                onChange={(event) => onInputChange("message", event.target.value)}
                className={textareaClassName}
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
      <div className="mb-4 flex items-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mr-2 p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          ← Back
        </Button>
        <h2 className="mr-8 flex-1 text-center text-lg font-semibold">{contactType}</h2>
      </div>

      <form onSubmit={onSubmit}>
        {renderFormFields()}

        <div className="mt-6 flex space-x-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-strong)]"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-[var(--accent-red)] text-white hover:opacity-90">
            Send Message
          </Button>
        </div>
      </form>
    </>
  );
}
