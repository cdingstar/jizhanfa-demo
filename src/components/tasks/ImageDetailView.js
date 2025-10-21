import React, { useState } from 'react';
import './ImageDetailView.css';

const ImageDetailView = ({ selectedPerson }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  // 模拟图片数据
  const mockImages = [
    { id: 1, time: '2023-07-31 09:08:45', camera: '入口摄像头1' },
    { id: 2, time: '2023-07-31 09:08:47', camera: '入口摄像头2' },
    { id: 3, time: '2023-07-31 10:15:23', camera: '大厅摄像头3' },
    { id: 4, time: '2023-07-31 10:15:25', camera: '大厅摄像头4' }
  ];

  return (
    <div className="image-detail-view">


      <div className="detail-content">
        {/* 左侧区域 */}
        <div className="left-panel">
          {/* 大图显示 */}
          <div className="main-image">
            <div className="surveillance-image">
              {/* 模拟摄像头拍摄的场景背景 */}
              <div className="scene-background">
                {/* 虚拟人物 */}
                <div className="virtual-person">
                  <div className="person-body">
                    {/* 人脸区域带红色边框 */}
                    <div className="face-detection-box">
                      <div className="face-avatar">👤</div>
                    </div>
                  </div>
                </div>
                
                {/* 摄像头信息叠加层 */}
                <div className="camera-overlay">
                  <div className="camera-info">
                    <span className="camera-id">{mockImages[selectedThumbnail]?.camera}</span>
                    <span className="timestamp">{mockImages[selectedThumbnail]?.time}</span>
                  </div>
                  <div className="detection-status">
                    <span className="status-indicator">●</span>
                    <span>人脸检测</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 横向缩略图列表 */}
          <div className="thumbnail-list">
            <h4>相关图片 (横向预览)</h4>
            <div className="thumbnails horizontal">
              {mockImages.map((img, index) => (
                <div 
                  key={img.id}
                  className={`thumbnail ${index === selectedThumbnail ? 'active' : ''}`}
                  onClick={() => setSelectedThumbnail(index)}
                >
                  <div className="image-placeholder small">
                    <span className="face-icon">👤</span>
                  </div>
                  <div className="thumbnail-info">
                    <span>{img.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧区域 */}
        <div className="right-panel">
          {/* 地图区域 */}
          <div className="map-section">
            <h4>地图信息</h4>
            <div className="map-placeholder">
              <div className="map-content">
                <span>🗺️</span>
                <p>地图显示区域</p>
              </div>
            </div>
          </div>

          {/* 目标详情 */}
          <div className="target-details">
            <h4>目标详情</h4>
            <div className="details-content">
              <div className="detail-item">
                <label>人员ID:</label>
                <span>{selectedPerson?.person || '未知'}</span>
              </div>
              <div className="detail-item">
                <label>相似度:</label>
                <span>{selectedPerson?.similarity || '0%'}</span>
              </div>
              <div className="detail-item">
                <label>时间:</label>
                <span>{mockImages[selectedThumbnail]?.time}</span>
              </div>
              <div className="detail-item">
                <label>摄像头:</label>
                <span>{mockImages[selectedThumbnail]?.camera}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailView;