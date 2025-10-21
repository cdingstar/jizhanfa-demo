import React from 'react';
import './PersonSummaryCard.css';

const PersonSummaryCard = ({ person, onClick }) => {
  return (
    <div className="person-summary-card" onClick={() => onClick(person)}>
      {/* 右上角数字标识 */}
      <div className="count-indicator">
        <span className="count-number">{person.count}</span>
      </div>
      
      {/* 双人脸图片区域 */}
      <div className="dual-face-container">
        <div className="face-image-wrapper">
          <div className="face-image">
            <div className="image-placeholder">
              <span className="face-icon">👤</span>
            </div>
          </div>
        </div>
        
        <div className="face-separator">
          <div className="connection-dot"></div>
        </div>
        
        <div className="face-image-wrapper">
          <div className="face-image">
            <div className="image-placeholder">
              <span className="face-icon">👤</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部信息区域 */}
      <div className="card-info">
        <div className="person-id">
          <span className="id-icon">👤</span>
          <span className="id-text">{person.person}</span>
        </div>
        <div className="time-info">
          <span className="time-icon">🕐</span>
          <span className="time-text">{person.firstTime}</span>
        </div>
        <div className="device-info">
          <span className="device-text">属于设备</span>
        </div>
      </div>
    </div>
  );
};

export default PersonSummaryCard;