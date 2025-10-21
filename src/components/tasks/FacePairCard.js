import React from 'react';

const FacePairCard = ({ pair, onClick }) => {
  return (
    <div className="face-pair-card" onClick={() => onClick(pair)}>
      <div className="face-pair-header">
        <span className="similarity-badge">{pair.similarity}</span>
        <span className="timestamp">{pair.timestamp}</span>
      </div>
      
      <div className="face-pair-container">
        {/* 左侧人脸 */}
        <div className="face-item left">
          <div className="face-image">
            <div className="image-placeholder">
              <span className="face-icon">👤</span>
            </div>
          </div>
          <div className="face-info">
            <div className="face-label">{pair.leftFace.person}</div>
            <div className="face-time">{pair.leftFace.time}</div>
            <div className="face-camera">{pair.leftFace.camera}</div>
          </div>
        </div>

        {/* 中间连接图标 */}
        <div className="connection-icon">
          <div className="connection-circle">
            <span>⚡</span>
          </div>
        </div>

        {/* 右侧人脸 */}
        <div className="face-item right">
          <div className="face-image">
            <div className="image-placeholder">
              <span className="face-icon">👤</span>
            </div>
          </div>
          <div className="face-info">
            <div className="face-label">{pair.rightFace.person}</div>
            <div className="face-time">{pair.rightFace.time}</div>
            <div className="face-camera">{pair.rightFace.camera}</div>
          </div>
        </div>
      </div>

      <div className="face-pair-actions">
        <button className="detail-btn">查看图片</button>
      </div>
    </div>
  );
};

export default FacePairCard;