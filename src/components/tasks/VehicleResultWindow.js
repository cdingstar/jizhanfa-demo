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

  // 视图模式切换处理函数
  const handleVehicleClick = (vehicle) => {
    if (viewMode === 'summary') {
      setSelectedVehicle(vehicle);
      setViewMode('detail');
      setNavigationPath(['同行车辆对比汇总', '详情']);
    } else if (viewMode === 'detail') {
      setSelectedVehicle(vehicle);
      setViewMode('image');
      setNavigationPath(['同行车辆对比汇总', '详情', '图片模式']);
    }
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
      <div className="result-header">
        <div className="header-left">
          <h2>任务结果查看</h2>
          <div className="task-info">
            <span>任务名称: {task?.name || '未知任务'}</span>
            <span>创建时间: {task?.createTime || '未知时间'}</span>
          </div>
        </div>
        <div className="header-right">
          <div className="summary-stats">
            {viewMode === 'summary' ? (
              <>
                <div className="stat-item">
                  <span className="stat-number">{mockVehicleGroups.length}</span>
                  <span className="stat-label">检测车辆</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{mockVehicleGroups.reduce((sum, v) => sum + v.count, 0)}</span>
                  <span className="stat-label">总出现次数</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">12小时</span>
                  <span className="stat-label">检测时长</span>
                </div>
              </>
            ) : (
              <>
                <div className="stat-item">
                  <span className="stat-number">{currentData.length}</span>
                  <span className="stat-label">车辆记录组</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{currentData.filter(v => v.count > 5).length}</span>
                  <span className="stat-label">高频出现</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{selectedVehicle?.plateNumber || '未选择'}</span>
                  <span className="stat-label">当前车牌</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="result-content">
        {/* 导航路径 */}
        <NavigationBreadcrumb 
          navigationPath={navigationPath}
          onNavigationClick={handleNavigationClick}
        />

        {/* 图片详情模式 */}
        {viewMode === 'image' ? (
          <VehicleDetailView 
            selectedVehicle={selectedVehicle}
          />
        ) : (
          <>
            {/* 缩略图网格视图 */}
            <div className="thumbnail-grid">
              {currentItems.map((item) => (
                <VehicleCell 
                  key={item.id}
                  vehicle={item}
                  onClick={handleVehicleClick}
                />
              ))}
            </div>

            {/* 分页控件 */}
            <PaginationControls 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={currentData.length}
              itemType={viewMode === 'summary' ? '辆车辆' : '个记录'}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onPageClick={handlePageClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleResultWindow;