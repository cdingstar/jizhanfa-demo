import React from 'react';

const NavigationBreadcrumb = ({ navigationPath, onNavigationClick, rightContent }) => {
  return (
    <div className="navigation-breadcrumb">
      <div className="breadcrumb-left">
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
      {rightContent && (
        <div className="breadcrumb-right">
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default NavigationBreadcrumb;
