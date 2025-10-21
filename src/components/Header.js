import React, { useState } from 'react';
import './Header.css';
import FeedbackDialog from './FeedbackDialog';

const Header = () => {
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const menuItems = [
    { name: '设备感知', icon: '📱' },
    { name: '智能搜索', icon: '🔍' },
    { name: '案件中心', icon: '📋' },
    { name: '动态数据', icon: '📊' },
    { name: '技战法', icon: '👤' },
    { name: '布控预警', icon: '⚠️' }
  ];

  const subMenuItems = [
    { name: '后台管理', version: 'v4.0.0(3)' },
    { name: '来源登记管理', version: '' },
    { name: '体态数据集1', version: '' },
    { name: '采集工作台', version: '' },
    { name: '体态库', version: '' }
  ];

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-left">
          <h1 className="logo">秀语智能分析</h1>
        </div>
        <div className="header-center">
          {menuItems.map((item, index) => (
            <div key={index} className="nav-item">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="notification-icon">🔔</span>
            <button 
              className="feedback-btn"
              onClick={() => setShowFeedbackDialog(true)}
              title="用户反馈"
            >
              💬
            </button>
            <span className="user-name">admin</span>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="sub-nav">
          {subMenuItems.map((item, index) => (
            <div key={index} className={`sub-nav-item ${index === 0 ? 'active' : ''}`}>
              <span className="sub-nav-name">{item.name}</span>
              {item.version && <span className="sub-nav-version">{item.version}</span>}
            </div>
          ))}
        </div>
        <div className="header-actions">
          <span className="action-link">内部项目管理组</span>
        </div>
      </div>
      
      <FeedbackDialog 
        isOpen={showFeedbackDialog}
        onClose={() => setShowFeedbackDialog(false)}
      />
    </div>
  );
};

export default Header;