import { useState } from 'react';

const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='border-b border-gray-200'>
      <ul className='flex'>
        {children.map((child, index) => (
          <li
            key={index}
            onClick={() => handleTabClick(index)}
            className={`text-lg mr-10 cursor-pointer ${
              index === activeTab
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 border-b-2 border-transparent'
            } transition duration-500 ease-in-out`}
          >
            {child.props.title}
            {index === activeTab && (
              <div className='absolute -bottom-1 w-full h-1 bg-blue-500 rounded-full transition-all duration-500 ease-in-out'></div>
            )}
          </li>
        ))}
      </ul>
      <div>
        {children.map((child, index) => (
          <div
            key={index}
            className={`${
              index === activeTab ? 'block' : 'hidden'
            } mt-4 transition duration-500 ease-in-out ${
              index === activeTab ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

const TabPanel = ({ children }) => {
  return <>{children}</>;
};

export { Tab, TabPanel };
