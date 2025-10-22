import React, { useState } from 'react';
import './VehicleDetailView.css';

const VehicleDetailView = ({ selectedVehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 模拟车辆图片数据
  const vehicleImages = [
    {
      id: 1,
      timestamp: '2025-09-10 14:30:25',
      camera: '摄像头A-01',
      location: '主入口',
      confidence: '98.5%'
    },
    {
      id: 2,
      timestamp: '2025-09-10 15:45:12',
      camera: '摄像头B-03',
      location: '停车场',
      confidence: '96.2%'
    },
    {
      id: 3,
      timestamp: '2025-09-10 16:20:08',
      camera: '摄像头C-05',
      location: '出口通道',
      confidence: '97.8%'
    }
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? vehicleImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === vehicleImages.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = vehicleImages[currentImageIndex];

  return (
    <div className="vehicle-detail-view">
      <div className="detail-container">
        {/* 左侧车辆信息 */}
        <div className="vehicle-info-panel">
          <div className="info-header">
            <h3>车辆信息</h3>
          </div>
          
          <div className="info-content">
            <div className="info-item">
              <span className="info-label">车牌号码:</span>
              <span className="info-value plate-number">{selectedVehicle?.plateNumber || '未知'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">车辆类型:</span>
              <span className="info-value">{selectedVehicle?.vehicleType || '未知'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">出现次数:</span>
              <span className="info-value">{selectedVehicle?.count || 0} 次</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">首次出现:</span>
              <span className="info-value">{selectedVehicle?.firstTime || '未知'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">最后出现:</span>
              <span className="info-value">{selectedVehicle?.lastTime || '未知'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">检测设备:</span>
              <span className="info-value">{selectedVehicle?.cameras || '未知'}</span>
            </div>
          </div>
        </div>

        {/* 右侧图片展示 */}
        <div className="image-display-panel">
          <div className="image-header">
            <h3>车辆图片</h3>
            <div className="image-counter">
              {currentImageIndex + 1} / {vehicleImages.length}
            </div>
          </div>
          
          <div className="image-container">
            <button className="nav-btn prev-btn" onClick={handlePrevImage}>
              ‹
            </button>
            
            <div className="main-image">
              <div className="vehicle-placeholder">
                <span className="vehicle-icon">🚗</span>
                <p>车辆图片预览</p>
              </div>
            </div>
            
            <button className="nav-btn next-btn" onClick={handleNextImage}>
              ›
            </button>
          </div>
          
          {/* 当前图片信息 */}
          <div className="image-info">
            <div className="image-meta">
              <div className="meta-item">
                <span className="meta-label">拍摄时间:</span>
                <span className="meta-value">{currentImage.timestamp}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">摄像设备:</span>
                <span className="meta-value">{currentImage.camera}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">拍摄位置:</span>
                <span className="meta-value">{currentImage.location}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">识别置信度:</span>
                <span className="meta-value confidence">{currentImage.confidence}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部缩略图 */}
      <div className="thumbnail-strip">
        <h4>所有检测记录</h4>
        <div className="thumbnails">
          {vehicleImages.map((image, index) => (
            <div 
              key={image.id}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <div className="thumb-placeholder">
                <span className="thumb-icon">🚗</span>
              </div>
              <div className="thumb-info">
                <div className="thumb-time">{image.timestamp.split(' ')[1]}</div>
                <div className="thumb-camera">{image.camera}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailView;