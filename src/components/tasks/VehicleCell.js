import React from 'react';
import './VehicleCell.css';

const VehicleCell = ({ vehicle, onClick, showCount = true, clickable = true }) => {
  return (
    <div 
      className={`vehicle-cell ${!clickable ? 'non-clickable' : ''}`} 
      onClick={clickable ? () => onClick(vehicle) : undefined}
    >
      {/* 右上角数字标识 - 根据showCount参数决定是否显示 */}
      {showCount && (
        <div className="count-indicator">
          <span className="count-number">{vehicle.count}</span>
        </div>
      )}
      
      {/* 车辆预览图区域 */}
      <div className="vehicle-preview-container">
        <div className="vehicle-image-wrapper">
          <div className="vehicle-image">
            <div className="image-placeholder">
              <span className="vehicle-icon">🚗</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部信息区域 */}
      <div className="cell-info">
        <div className="plate-info">
          <span className="plate-icon">🚙</span>
          <span className="plate-text">{vehicle.plateNumber}</span>
        </div>
        <div className="vehicle-type">
          <span className="type-icon">🏷️</span>
          <span className="type-text">{vehicle.vehicleType}</span>
        </div>
        <div className="time-info">
          <span className="time-icon">🕐</span>
          <span className="time-text">{vehicle.firstTime}</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCell;