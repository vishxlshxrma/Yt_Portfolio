import React from "react";

export default function EducationTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <h3 className="font-semibold mb-2">Master of Design</h3>
        <p className="text-gray-400 mb-2">Stanford University • 2014-2016</p>
        <p className="text-sm text-gray-300">Human-Computer Interaction, Design Thinking, User Research Methodologies</p>
      </div>
      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <h3 className="font-semibold mb-2">Bachelor of Fine Arts</h3>
        <p className="text-gray-400 mb-2">Art Center College • 2010-2014</p>
        <p className="text-sm text-gray-300">Graphic Design, Digital Media, Visual Communication</p>
      </div>
    </div>
  );
}
