import React from 'react';

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [1, 2, 3];

  return (
    // <div className="w-[30%] flex flex-row items-start justify-center gap-3 pt-6 border-spacing-x-4 border-gray-400">
    //   {steps.map((step) => (
    //     <div
    //       key={step}
    //       className={`rounded-full w-12 h-12 flex items-center justify-center border-2 my-2 ${
    //         step === currentStep ? 'border-blue-500' : 'border-black'
    //       }`}
    //     >
    //       {step}
    //     </div>
    //   ))}
    // </div>
    <div className="w-[25%] relative border-r-2 flex flex-col items-center gap-3 pt-6">
      <div className="sticky top-6 flex flex-row items-start justify-center gap-3 ">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`relative rounded-full w-12 h-12 flex flex-col items-center justify-center border-2 my-2 text-gray-400 ${step === currentStep ? 'border-blue-500' : 'border-gray-400'
              }`}
          >
            {step}
            {/* Line below each step */}
            <div
              className={`absolute bottom-[-15px] rounded-lg w-full h-1 ${step === currentStep ? 'bg-blue-500' : 'bg-gray-400'
                }`}
            ></div>
          </div>
        ))}
      </div>
    </div>



  );
};

export default StepIndicator;
