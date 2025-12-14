import React, { useState, useEffect, useCallback } from 'react';
import './TaskResultWindow.css';
import './SearchPanel.css';
import VehicleDetailView from './VehicleDetailView';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import VehicleCell from './VehicleCell';
import PaginationControls from './PaginationControls';
import { mockVehicleCollisionGroups } from './mockData';

const VehicleCollisionResultWindow = ({ task, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [viewMode, setViewMode] = useState('summary'); // 'summary', 'detail', 'image'
  const [navigationPath, setNavigationPath] = useState(['车辆碰撞对比汇总']);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // 检索参数和模态框状态
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    maxRegions: 2,
    regions: [
      {
        id: 1,
        type: '圆选',
        startTime: '2025-10-10 00:00:00',
        endTime: '2025-10-10 16:48:14'
      },
      {
        id: 2,
        type: '圆选',
        startTime: '2025-10-10 00:00:00',
        endTime: '2025-10-10 16:48:14'
      }
    ]
  });

  // 左右分栏相关状态
  const [leftPanelWidth, setLeftPanelWidth] = useState(60); // 左侧面板宽度百分比
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartWidth, setDragStartWidth] = useState(60);

  // 拖拽处理函数
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartWidth(leftPanelWidth);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const containerWidth = e.currentTarget.offsetWidth || window.innerWidth;
    const deltaX = e.clientX - dragStartX;
    const deltaPercent = (deltaX / containerWidth) * 100;
    const newWidth = Math.max(30, Math.min(80, dragStartWidth + deltaPercent));
    
    setLeftPanelWidth(newWidth);
  }, [isDragging, dragStartX, dragStartWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 添加全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 根据视图模式选择数据源
  const currentData = viewMode === 'summary' ? mockVehicleCollisionGroups : 
                     viewMode === 'detail' ? generateDetailCells(selectedVehicle) : [];

  // 为详情模式生成对应数量的VehicleCell
  function generateDetailCells(vehicle) {
    if (!vehicle) return [];
    
    // 根据车辆的count生成对应数量的详情记录
    const detailCells = [];
    for (let i = 0; i < vehicle.count; i++) {
      detailCells.push({
        id: `${vehicle.id}_detail_${i}`,
        plateNumber: vehicle.plateNumber,
        vehicleType: vehicle.vehicleType,
        firstTime: `2025-09-${String(10 - Math.floor(i/2)).padStart(2, '0')} ${String(8 + i).padStart(2, '0')}:${String(15 + i*5).padStart(2, '0')}:${String(20 + i*3).padStart(2, '0')}`,
        location: `监控点${String.fromCharCode(65 + i)}`,
        count: 1, // 详情记录中每条都是1
        confidence: 0.85 + Math.random() * 0.1
      });
    }
    return detailCells;
  }

  // 分页逻辑
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // 视图模式切换处理函数 - 在左侧面板内展示详情，保持右侧地图
  const handleVehicleClick = (vehicle) => {
    if (viewMode === 'summary') {
      setSelectedVehicle(vehicle);
      setViewMode('detail');
      setNavigationPath(['车辆碰撞对比汇总', `${vehicle.plateNumber} 详情`]);
      setCurrentPage(0); // 重置分页到第一页
    }
    // 详情模式下不处理点击事件，禁用点击
  };

  // 详情模式下的空点击处理函数
  const handleDetailVehicleClick = () => {
    // 详情模式下不执行任何操作
    return;
  };

  // 导航路径点击
  const handleNavigationClick = (index) => {
    if (index === 0) {
      setViewMode('summary');
      setNavigationPath(['车辆碰撞对比汇总']);
      setSelectedVehicle(null);
      setCurrentPage(0);
    } else if (index === 1) {
      setViewMode('detail');
      setNavigationPath(['车辆碰撞对比汇总', '详情']);
    }
  };

  // 检索参数处理
  const handleSearchParamChange = (key, value) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRegionChange = (regionId, field, value) => {
    setSearchParams(prev => ({
      ...prev,
      regions: prev.regions.map(region => 
        region.id === regionId ? { ...region, [field]: value } : region
      )
    }));
  };

  const addRegion = () => {
    if (searchParams.regions.length < searchParams.maxRegions) {
      const newRegion = {
        id: Date.now(),
        type: '圆选',
        startTime: '2025-10-10 00:00:00',
        endTime: '2025-10-10 16:48:14'
      };
      setSearchParams(prev => ({
        ...prev,
        regions: [...prev.regions, newRegion]
      }));
    }
  };

  const removeRegion = (regionId) => {
    setSearchParams(prev => ({
      ...prev,
      regions: prev.regions.filter(region => region.id !== regionId)
    }));
  };

  const handleSearch = () => {
    console.log('执行车辆碰撞检索:', searchParams);
    setShowSearchModal(false);
    // 这里可以添加实际的检索逻辑
  };

  const handleCancel = () => {
    setShowSearchModal(false);
  };

  return (
    <div className="task-result-window">


      <div className="navigation-header">
        <NavigationBreadcrumb 
          navigationPath={navigationPath}
          onNavigationClick={handleNavigationClick}
        />
        {viewMode === 'detail' ? (
          <div className="detail-actions">
            <button 
              className="export-button"
              onClick={() => {
                // 导出详情数据功能
                console.log('导出碰撞详情数据:', selectedVehicle);
                alert('导出功能开发中...');
              }}
            >
              导出
            </button>
            <button 
              className="back-button"
              onClick={() => {
                setViewMode('summary');
                setNavigationPath(['车辆碰撞对比汇总']);
                setSelectedVehicle(null);
                setCurrentPage(0);
              }}
            >
              返回
            </button>
          </div>
        ) : (
          <div className="summary-actions">
            <button 
              className="export-button"
              onClick={() => {
                // 导出汇总数据功能
                console.log('导出碰撞汇总数据:', mockVehicleCollisionGroups);
                alert('导出汇总数据功能开发中...');
              }}
            >
              导出
            </button>
            <button 
              className="search-button wide"
              onClick={() => setShowSearchModal(true)}
            >
              检索...
            </button>
          </div>
        )}
      </div>

      <div className={`result-content ${viewMode === 'detail' ? 'detail-mode' : ''}`}>
        {/* 图片详情模式 */}
        {viewMode === 'image' ? (
          <VehicleDetailView 
            selectedVehicle={selectedVehicle}
          />
        ) : (
          /* 汇总和详情模式都使用左右分栏布局，只替换左侧内容 */
          <div className="summary-layout">
            {/* 左侧面板 - 根据模式显示不同内容 */}
            <div 
              className="vehicle-list-panel"
              style={{ width: `${leftPanelWidth}%` }}
            >
              {viewMode === 'summary' ? (
                /* 汇总模式：显示所有碰撞车辆 */
                <>
                  <div className="thumbnail-grid">
                    {currentItems.map((item) => (
                      <VehicleCell 
                        key={item.id}
                        vehicle={item}
                        onClick={handleVehicleClick}
                        showCount={true}
                      />
                    ))}
                  </div>

                  <PaginationControls 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={currentData.length}
                    itemType="辆碰撞车辆"
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                    onPageClick={handlePageClick}
                  />
                </>
              ) : (
                /* 详情模式：显示选中车辆的详细碰撞记录 */
                <>
                  <div className="thumbnail-grid">
                    {currentItems.map((item) => (
                      <VehicleCell 
                        key={item.id}
                        vehicle={item}
                        onClick={handleDetailVehicleClick}
                        showCount={false}
                        clickable={false}
                      />
                    ))}
                  </div>

                  <PaginationControls 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={currentData.length}
                    itemType="条碰撞记录"
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                    onPageClick={handlePageClick}
                  />
                </>
              )}
            </div>

            {/* 拖拽分隔条 */}
            <div 
              className={`resize-handle ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
            >
              <div className="resize-line"></div>
            </div>

            {/* 右侧地图面板 - 始终保持不变 */}
            <div 
              className="map-panel"
              style={{ width: `${100 - leftPanelWidth}%` }}
            >
              <div className="map-container">
                <div className="map-placeholder">
                  <div className="map-content">
                    <h4>碰撞事故地图</h4>
                    <div className="map-controls">
                      <button className="map-control-btn">+</button>
                      <button className="map-control-btn">-</button>
                    </div>
                    <div className="vehicle-markers">
                      {mockVehicleCollisionGroups.slice(0, 5).map((vehicle, index) => (
                        <div 
                          key={vehicle.id}
                          className="vehicle-marker"
                          style={{
                            left: `${20 + index * 15}%`,
                            top: `${30 + index * 10}%`
                          }}
                          title={`${vehicle.plateNumber} - ${vehicle.count}次碰撞`}
                        >
                          💥
                        </div>
                      ))}
                    </div>
                    <div className="map-legend">
                      <div className="legend-item">
                        <span className="legend-marker">💥</span>
                        <span>碰撞位置</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-marker">📍</span>
                        <span>监控点</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 检索参数浮层 */}
      {showSearchModal && (
        <div className="search-overlay" onClick={handleCancel}>
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <h3>车辆碰撞检索参数设置</h3>
              <button className="close-btn" onClick={handleCancel}>×</button>
            </div>
            
            <div className="search-content">
              {/* 最小区域选择 */}
              <div className="param-section">
                <div className="param-row">
                  <label className="param-label">
                    最小区域选择 <span className="required">*</span>
                  </label>
                  <select 
                    className="param-select small"
                    value={searchParams.maxRegions}
                    onChange={(e) => handleSearchParamChange('maxRegions', parseInt(e.target.value))}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>

              {/* 区域列表 */}
              <div className="regions-container">
                {searchParams.regions.map((region, index) => (
                  <div key={region.id} className="region-item">
                    <div className="region-header">
                      <span className="region-title">区域{index + 1}</span>
                      <div className="region-actions">
                        <button className="select-region-btn" title="选择区域">
                          选择区域
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          title="删除区域"
                          onClick={() => removeRegion(region.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <div className="region-content">
                      <div className="region-type-row">
                        <div className="type-selector">
                          <input 
                            type="radio" 
                            id={`circle-${region.id}`}
                            name={`type-${region.id}`}
                            checked={region.type === '圆选'}
                            onChange={() => handleRegionChange(region.id, 'type', '圆选')}
                          />
                          <label htmlFor={`circle-${region.id}`}>圆选</label>
                        </div>
                        <select className="region-select">
                          <option>圆选</option>
                        </select>
                      </div>
                      
                      <div className="time-section">
                        <label className="time-label">
                          过车时段 <span className="required">*</span>
                        </label>
                        <div className="time-inputs">
                          <div className="time-input-group">
                            <input
                              type="text"
                              className="time-input"
                              value={region.startTime}
                              onChange={(e) => handleRegionChange(region.id, 'startTime', e.target.value)}
                              placeholder="2025-10-10 00:00:00"
                            />
                            <span className="time-icon">🕐</span>
                          </div>
                          <div className="time-input-group">
                            <input
                              type="text"
                              className="time-input"
                              value={region.endTime}
                              onChange={(e) => handleRegionChange(region.id, 'endTime', e.target.value)}
                              placeholder="2025-10-10 16:48:14"
                            />
                            <span className="time-icon">🕐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 添加区域按钮 */}
              {searchParams.regions.length < searchParams.maxRegions && (
                <div className="add-region-section">
                  <button className="add-region-btn" onClick={addRegion}>
                    <span className="add-icon">+</span>
                    <span>添加区域</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="search-footer">
              <button className="search-submit-btn" onClick={handleSearch}>
                查询
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCollisionResultWindow;