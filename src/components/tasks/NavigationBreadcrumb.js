import React from 'react';

const NavigationBreadcrumb = ({ navigationPath, onNavigationClick }) => {
  return (
    <div className="navigation-breadcrumb">
      {navigationPath.map((path, index) => (
        <span key={index}>
          <span 
            className={`breadcrumb-item ${index < navigationPath.length - 1 ? 'clickable' : ''}`}
            onClick={() => index < navigationPath.length - 1 && onNavigationClick(index)}
          >
            {path}
          </span>
          {index < navigationPath.length - 1 && <span className="breadcrumb-separator"> / </span>}
        </span>
      ))}
    </div>
  );
};

export default NavigationBreadcrumb;