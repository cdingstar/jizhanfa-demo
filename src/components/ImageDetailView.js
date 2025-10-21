import React, { useState } from 'react';
import './ImageDetailView.css';

const ImageDetailView = ({ selectedPerson, onBack }) => {
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
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <h3>图片详情模式</h3>
      </div>

      <div className="detail-content">
        {/* 左侧区域 */}
        <div className="left-panel">
          {/* 大图显示 */}
          <div className="main-image">
            <div className="image-placeholder large">
              <span className="face-icon">👤</span>
              <div className="image-info">
                <p>时间: {mockImages[selectedThumbnail]?.time}</p>
                <p>摄像头: {mockImages[selectedThumbnail]?.camera}</p>
              </div>
            </div>
          </div>

          {/* 缩略图列表 */}
          <div className="thumbnail-list">
            <h4>相关图片</h4>
            <div className="thumbnails">
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
            <h4>位置信息</h4>
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
                <label>首次出现:</label>
                <span>{selectedPerson?.leftFace?.time || '未知'}</span>
              </div>
              <div className="detail-item">
                <label>最后出现:</label>
                <span>{selectedPerson?.rightFace?.time || '未知'}</span>
              </div>
              <div className="detail-item">
                <label>出现次数:</label>
                <span>4次</span>
              </div>
              <div className="detail-item">
                <label>活动区域:</label>
                <span>入口大厅、电梯间</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailView;