import React, { useState } from 'react';
import './TaskResultWindow.css';
import ImageDetailView from './ImageDetailView';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import FacePairCell from './FacePairCell';

import PaginationControls from './PaginationControls';

import { mockPersonGroups } from './mockData';

const TaskResultWindow = ({ task, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [viewMode, setViewMode] = useState('summary'); // 'summary', 'detail', 'image'
  const [navigationPath, setNavigationPath] = useState(['同行人对比汇总']);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // 根据视图模式选择数据源
  const currentData = viewMode === 'summary' ? mockPersonGroups : 
                     viewMode === 'detail' ? generateDetailCells(selectedPerson) : [];

  // 为详情模式生成对应数量的FacePairCell
  function generateDetailCells(person) {
    if (!person) return [];
    
    const cells = [];
    for (let i = 0; i < person.count; i++) {
      cells.push({
        id: `${person.id}-${i}`,
        person: person.person,
        count: 1, // 详情模式每个cell显示1
        firstTime: person.firstTime,
        lastTime: person.lastTime,
        cameras: person.cameras
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
  const handlePersonClick = (person) => {
    if (viewMode === 'summary') {
      setSelectedPerson(person);
      setViewMode('detail');
      setNavigationPath(['同行人对比汇总', '详情']);
    } else if (viewMode === 'detail') {
      setSelectedPerson(person);
      setViewMode('image');
      setNavigationPath(['同行人对比汇总', '详情', '图片模式']);
    }
  };



  // 导航路径点击
  const handleNavigationClick = (index) => {
    if (index === 0) {
      setViewMode('summary');
      setNavigationPath(['同行人对比汇总']);
      setSelectedPerson(null);
    } else if (index === 1) {
      setViewMode('detail');
      setNavigationPath(['同行人对比汇总', '详情']);
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
                  <span className="stat-number">{mockPersonGroups.length}</span>
                  <span className="stat-label">检测人员</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{mockPersonGroups.reduce((sum, p) => sum + p.count, 0)}</span>
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
                  <span className="stat-label">人脸对比组</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{currentData.filter(p => parseFloat(p.similarity) > 90).length}</span>
                  <span className="stat-label">高相似度</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{selectedPerson?.person || '未选择'}</span>
                  <span className="stat-label">当前人员</span>
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
          <ImageDetailView 
            selectedPerson={selectedPerson}
          />
        ) : (
          <>


            {/* 缩略图网格视图 */}
            <div className="thumbnail-grid">
              {currentItems.map((item) => (
                <FacePairCell 
                  key={item.id}
                  person={item}
                  onClick={handlePersonClick}
                />
              ))}
            </div>

            {/* 分页控件 */}
            <PaginationControls 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={currentData.length}
              itemType={viewMode === 'summary' ? '个人员' : '个记录'}
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

export default TaskResultWindow;