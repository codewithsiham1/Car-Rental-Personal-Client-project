import React from 'react';

const Sectiontitle = ({ heading, subHeading, headingColor, subHeadingColor }) => {
    return (
        <div className="text-center my-11 space-y-4 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-0">
            <h3 className={`font-bold uppercase
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                w-full sm:w-9/12 md:w-7/12 lg:w-6/12
                ${headingColor || "text-black"}`}>
                {heading}
            </h3>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl
                w-full sm:w-10/12 md:w-8/12 lg:w-7/12
                ${subHeadingColor || "text-black"}`}>
                {subHeading}
            </p>
        </div>
    );
};

export default Sectiontitle;
