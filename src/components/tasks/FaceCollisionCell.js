import React from 'react';
import './FaceCollisionCell.css';

const FaceCollisionCell = ({ record, onClick }) => {
  const faceLabel = (record?.personLabel || '').replace(/^人员/, '人脸');
  return (
    <div className="face-collision-cell" onClick={() => onClick(record)}>
      <div className="collision-face-container">
        <div className="face-image-wrapper">
          <div className="face-image">
            <div className="image-placeholder">
              <span className="face-icon">👤</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cell-info two-lines">
        <div className="row-first">
          <span className="text-left">{faceLabel}</span>
          <span className="text-right">{record.location}</span>
        </div>
        <div className="row-second">
          <span className="time-text">{record.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default FaceCollisionCell;
