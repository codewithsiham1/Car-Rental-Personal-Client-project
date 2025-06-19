import React from 'react';

const Sectiontitle = ({ heading, subHeading, headingColor, subHeadingColor }) => {
    return (
        <div className="text-center my-11 space-y-4 flex flex-col justify-center items-center">
              <h3 className={`text-4xl  w-6/12 font-bold uppercase ${headingColor || "text-black"}`}>
                {heading}
            </h3>
            <p className={`text-lg mb-2 ${subHeadingColor || "text-black"}`}>
                 {subHeading}
            </p>
          
        </div>
    );
};

export default Sectiontitle;
