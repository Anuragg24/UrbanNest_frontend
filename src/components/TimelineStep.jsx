import React from 'react';

const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
  // Determine the icon's styles dynamically
  const iconBgColor = isCurrent
    ? 'bg-blue-500' // Current step background
    : isCompleted
    ? 'bg-green-500' // Completed step background
    : 'bg-gray-100'; // Default background for inactive steps

  const iconTextColor = isCurrent || isCompleted ? 'text-white' : 'text-gray-500';

  // Connector styles
  const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';

  // Label and description styles
  const labelTextColor = isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500';
  const descriptionTextColor = isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500';

  return (
    <li className="relative mb-6 sm:mb-0 sm:pl-10">
      <div className="flex items-center">
        {/* Icon */}
        <div
          className={`z-10 flex items-center justify-center w-6 h-6 ${iconBgColor} ${iconTextColor} rounded-full ring-0 ring-white shrink-0`}
        >
          <i className={`ri-${icon.iconName} text-xl`}></i>
        </div>

        {/* Connector */}
        {!isLastStep && (
          <div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`}></div>
        )}
      </div>

      {/* Label and Description */}
      <div className="mt-3 sm:pe-8">
        <h3 className={`font-medium text-base ${labelTextColor}`}>{step.label}</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
          {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
        </time>
        <p className={`text-base font-normal ${descriptionTextColor}`}>{description}</p>
      </div>
    </li>
  );
};

export default TimelineStep;
