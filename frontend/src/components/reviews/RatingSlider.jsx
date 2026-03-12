import React, { useState } from 'react';

const RatingSlider = ({ value, onChange }) => {
    const [isDragging, setIsDragging] = useState(false);

    // Get color based on rating
    const getRatingColor = (rating) => {
        if (rating >= 90) return 'bg-gradient-to-r from-green-500 to-green-600';
        if (rating >= 70) return 'bg-gradient-to-r from-blue-500 to-blue-600';
        if (rating >= 50) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
        return 'bg-gradient-to-r from-red-500 to-red-600';
    };

    // Get rating text
    const getRatingText = (rating) => {
        if (rating >= 90) return 'Excellent';
        if (rating >= 80) return 'Very Good';
        if (rating >= 70) return 'Good';
        if (rating >= 60) return 'Fair';
        if (rating >= 40) return 'Below Average';
        return 'Poor';
    };

    return (
        <div className="space-y-4">
            {/* Rating Display */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium text-text-muted mb-1">Your Rating</div>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold bg-gradient-to-r ${getRatingColor(value).replace('bg-', '')} bg-clip-text text-transparent`}>
                            {value}
                        </span>
                        <span className="text-xl font-semibold text-text-muted">/100</span>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-xl font-semibold ${getRatingColor(value)} text-white`}>
                    {getRatingText(value)}
                </div>
            </div>

            {/* Slider */}
            <div className="relative pt-2">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer slider"
                    style={{
                        background: `linear-gradient(to right, 
              ${value >= 90 ? 'rgb(34, 197, 94)' :
                                value >= 70 ? 'rgb(59, 130, 246)' :
                                    value >= 50 ? 'rgb(234, 179, 8)' :
                                        'rgb(239, 68, 68)'} ${value}%, 
              rgb(229, 231, 235) ${value}%)`
                    }}
                />

                {/* Tick Marks */}
                <div className="flex justify-between mt-2 px-1">
                    {[0, 25, 50, 75, 100].map((tick) => (
                        <div key={tick} className="flex flex-col items-center">
                            <div className="w-px h-2 bg-gray-300" />
                            <span className="text-xs text-text-muted mt-1">{tick}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 3px solid ${value >= 90 ? 'rgb(34, 197, 94)' :
                    value >= 70 ? 'rgb(59, 130, 246)' :
                        value >= 50 ? 'rgb(234, 179, 8)' :
                            'rgb(239, 68, 68)'};
          transition: transform 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 3px solid ${value >= 90 ? 'rgb(34, 197, 94)' :
                    value >= 70 ? 'rgb(59, 130, 246)' :
                        value >= 50 ? 'rgb(234, 179, 8)' :
                            'rgb(239, 68, 68)'};
          transition: transform 0.2s;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
        </div>
    );
};

export default RatingSlider;
