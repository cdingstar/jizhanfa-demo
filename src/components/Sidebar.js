import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { name: '同行人', icon: '👥' },
    { name: '同行车辆', icon: '🚗' },
    { name: '人脸碰撞', icon: '👤' },
    { name: '车辆碰撞', icon: '🚙' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>分析功能</h3>
      </div>
      
      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
            onClick={() => onMenuChange(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;