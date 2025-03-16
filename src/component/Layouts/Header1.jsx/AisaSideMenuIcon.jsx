import React from 'react';

const AisaSideMenuIcon = () => {
  return (
    <div className="flex flex-col items-center justify-center w-10 h-10 cursor-pointer">
      <div className="flex flex-col gap-1">
        {/* Top row - 2 circles */}
        <div className="flex gap-1">
          <div className="w-2 h-2 border border-black rounded-full"></div>
          <div className="w-2 h-2 border border-black rounded-full"></div>
        </div>
        
        {/* Middle row - 3 circles */}
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 border border-black rounded-full"></div>
          <div className="w-2 h-2 border border-black rounded-full"></div>
          <div className="w-2 h-2 border border-black rounded-full"></div>
        </div>
        
        {/* Bottom row - 2 circles */}
        <div className="flex gap-1">
          <div className="w-2 h-2 border border-black rounded-full"></div>
          <div className="w-2 h-2 border border-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AisaSideMenuIcon;