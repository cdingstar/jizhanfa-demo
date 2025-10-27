import React, { useState } from 'react';
import './TaskResultWindow.css';
import VehicleDetailView from './VehicleDetailView';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import VehicleCell from './VehicleCell';
import PaginationControls from './PaginationControls';
import { mockVehicleGroups } from './mockData';

const VehicleResultWindow = ({ task, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [viewMode, setViewMode] = useState('summary'); // 'summary', 'detail', 'image'
  const [navigationPath, setNavigationPath] = useState(['同行车辆对比汇总']);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // 检索参数和模态框状态
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [filterParams, setFilterParams] = useState({
    plateNumber: '冀E1Y725',
    startTime: '2025-10-10 00:00:00',
    endTime: '2025-10-10 23:59:59',
    interval: 10,
    appearanceCount: 3
  });

  // 车牌号码输入和历史记录状态
  const [plateNumberHistory, setPlateNumberHistory] = useState([
    '冀E1Y725',
    '京A12345', 
    '沪B67890',
    '粤C11111',
    '浙D88888'
  ]);
  const [showPlateDropdown, setShowPlateDropdown] = useState(false);
  const [plateInputValue, setPlateInputValue] = useState('冀E1Y725');

  // 拖拽调整面板大小状态
  const [leftPanelWidth, setLeftPanelWidth] = useState(60); // 左侧面板宽度百分比
  const [isDragging, setIsDragging] = useState(false);
  const [containerRef, setContainerRef] = useState(null);

  // 处理检索
  const handleSearch = () => {
    // 添加到历史记录
    if (plateInputValue && !plateNumberHistory.includes(plateInputValue)) {
      setPlateNumberHistory(prev => [plateInputValue, ...prev.slice(0, 9)]); // 保留最近10条
    }
    
    // 更新检索参数
    setFilterParams(prev => ({
      ...prev,
      plateNumber: plateInputValue
    }));
    
    // 这里可以添加实际的检索逻辑
    console.log('执行检索:', { ...filterParams, plateNumber: plateInputValue });
    setShowSearchModal(false);
  };

  // 取消检索
  const handleCancel = () => {
    setShowSearchModal(false);
    setShowPlateDropdown(false);
  };

  // 车牌号码输入处理
  const handlePlateInputChange = (e) => {
    setPlateInputValue(e.target.value);
  };

  const handlePlateInputFocus = () => {
    setShowPlateDropdown(true);
  };

  const handlePlateInputBlur = () => {
    // 延迟关闭下拉框，允许点击选项
    setTimeout(() => setShowPlateDropdown(false), 200);
  };

  const handlePlateSelect = (plateNumber) => {
    setPlateInputValue(plateNumber);
    setShowPlateDropdown(false);
  };

  // 过滤历史记录
  const filteredHistory = plateNumberHistory.filter(plate => 
    plate.toLowerCase().includes(plateInputValue.toLowerCase())
  );

  // 拖拽处理函数
  const handleMouseDown = (e) => {
    const container = e.target.closest('.summary-layout');
    if (container) {
      setContainerRef(container);
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleMouseMove = React.useCallback((e) => {
    if (!isDragging || !containerRef) return;
    
    const containerRect = containerRef.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;
    const newLeftWidth = (mouseX / containerWidth) * 100;
    
    // 限制拖拽范围在 30% 到 80% 之间
    if (newLeftWidth >= 30 && newLeftWidth <= 80) {
      setLeftPanelWidth(newLeftWidth);
    }
  }, [isDragging, containerRef]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
    setContainerRef(null);
  }, []);

  // 添加全局鼠标事件监听
  React.useEffect(() => {
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
  const currentData = viewMode === 'summary' ? mockVehicleGroups : 
                     viewMode === 'detail' ? generateDetailCells(selectedVehicle) : [];

  // 为详情模式生成对应数量的VehicleCell
  function generateDetailCells(vehicle) {
    if (!vehicle) return [];
    
    const cells = [];
    for (let i = 0; i < vehicle.count; i++) {
      cells.push({
        id: `${vehicle.id}-${i}`,
        plateNumber: vehicle.plateNumber,
        vehicleType: vehicle.vehicleType,
        count: 1, // 详情模式每个cell显示1
        firstTime: vehicle.firstTime,
        lastTime: vehicle.lastTime,
        cameras: vehicle.cameras
      });
    }
    return cells;
  }
  
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const currentItems = currentData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // 分页处理函数
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
      setNavigationPath(['同行车辆对比汇总', `${vehicle.plateNumber} 详情`]);
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
      setNavigationPath(['同行车辆对比汇总']);
      setSelectedVehicle(null);
    } else if (index === 1) {
      setViewMode('detail');
      setNavigationPath(['同行车辆对比汇总', '详情']);
    }
  };

  return (
    <div className="task-result-window">

      <div className={`result-content ${viewMode === 'detail' ? 'detail-mode' : ''}`}>
        {/* 导航路径和检索按钮 */}
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
                  console.log('导出详情数据:', selectedVehicle);
                  alert('导出功能开发中...');
                }}
              >
                导出
              </button>
              <button 
                className="back-button"
                onClick={() => {
                  setViewMode('summary');
                  setNavigationPath(['同行车辆对比汇总']);
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
                  console.log('导出汇总数据:', mockVehicleGroups);
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
                /* 汇总模式：显示所有车辆 */
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
                    itemType="辆车辆"
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                    onPageClick={handlePageClick}
                  />
                </>
              ) : (
                /* 详情模式：显示选中车辆的详细记录 */
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
                    itemType="条记录"
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
                    <h4>车辆轨迹地图</h4>
                    <div className="map-controls">
                      <button className="map-control-btn">+</button>
                      <button className="map-control-btn">-</button>
                    </div>
                    <div className="vehicle-markers">
                      {mockVehicleGroups.slice(0, 5).map((vehicle, index) => (
                        <div 
                          key={vehicle.id}
                          className="vehicle-marker"
                          style={{
                            left: `${20 + index * 15}%`,
                            top: `${30 + index * 10}%`
                          }}
                          title={`${vehicle.plateNumber} - ${vehicle.count}次`}
                        >
                          🚗
                        </div>
                      ))}
                    </div>
                    <div className="map-legend">
                      <div className="legend-item">
                        <span className="legend-marker">🚗</span>
                        <span>车辆位置</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-marker">📍</span>
                        <span>摄像头</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 检索参数模态框 */}
      {showSearchModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>检索参数设置</h3>
              <button className="close-button" onClick={handleCancel}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="param-group">
                <label className="param-label">
                  车牌号码 <span className="required">*</span>
                </label>
                <div className="combo-box-wrapper">
                  <input
                    type="text"
                    value={plateInputValue}
                    onChange={handlePlateInputChange}
                    onFocus={handlePlateInputFocus}
                    onBlur={handlePlateInputBlur}
                    className="combo-input"
                    placeholder="请输入车牌号码"
                  />
                  <button 
                    type="button"
                    className="combo-dropdown-btn"
                    onClick={() => setShowPlateDropdown(!showPlateDropdown)}
                  >
                    ▼
                  </button>
                  {showPlateDropdown && filteredHistory.length > 0 && (
                    <div className="combo-dropdown">
                      {filteredHistory.map((plate, index) => (
                        <div
                          key={index}
                          className="combo-option"
                          onClick={() => handlePlateSelect(plate)}
                        >
                          {plate}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="param-group">
                <label className="param-label">
                  过车时段 <span className="required">*</span>
                </label>
                <div className="time-range">
                  <div className="time-input-wrapper">
                    <input
                      type="text"
                      value={filterParams.startTime}
                      onChange={(e) => setFilterParams({...filterParams, startTime: e.target.value})}
                      className="param-input time-input"
                      placeholder="开始时间"
                    />
                    <span className="time-icon">🕐</span>
                  </div>
                  <div className="time-input-wrapper">
                    <input
                      type="text"
                      value={filterParams.endTime}
                      onChange={(e) => setFilterParams({...filterParams, endTime: e.target.value})}
                      className="param-input time-input"
                      placeholder="结束时间"
                    />
                    <span className="time-icon">🕐</span>
                  </div>
                </div>
              </div>

              <div className="param-group">
                <label className="param-label">
                  伴随间隔 <span className="required">*</span>
                </label>
                <div className="interval-input-wrapper">
                  <input
                    type="number"
                    value={filterParams.interval}
                    onChange={(e) => setFilterParams({...filterParams, interval: parseInt(e.target.value) || 0})}
                    className="param-input interval-input"
                    min="1"
                  />
                  <div className="unit-selector">
                    <span className="unit-text">秒</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                </div>
              </div>

              <div className="param-group">
                <label className="param-label">
                  车牌出现次数 <span className="required">*</span>
                </label>
                <input
                  type="number"
                  value={filterParams.appearanceCount}
                  onChange={(e) => setFilterParams({...filterParams, appearanceCount: parseInt(e.target.value) || 0})}
                  className="param-input"
                  min="1"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCancel}>
                取消
              </button>
              <button className="search-confirm-button" onClick={handleSearch}>
                检索
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleResultWindow;