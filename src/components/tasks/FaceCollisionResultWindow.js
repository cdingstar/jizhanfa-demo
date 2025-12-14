import React, { useState } from 'react';
import './TaskResultWindow.css';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import PaginationControls from './PaginationControls';
import ImageDetailView from './ImageDetailView';
import FaceCollisionCell from './FaceCollisionCell';
import { mockFaceCollisionRecords } from './mockData';

const FaceCollisionResultWindow = ({ task, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [viewMode, setViewMode] = useState('summary');
  const [navigationPath, setNavigationPath] = useState(['人脸碰撞汇总']);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const currentData = mockFaceCollisionRecords;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(0, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  const handlePageClick = (i) => setCurrentPage(i);

  const handleRecordClick = (record, order) => {
    setSelectedRecord(record);
    setViewMode('image');
    setNavigationPath(['人脸碰撞汇总', `${record.personLabel} 图片`]);
  };

  const handleNavigationClick = (index) => {
    if (index === 0) {
      setViewMode('summary');
      setNavigationPath(['人脸碰撞汇总']);
      setSelectedRecord(null);
    }
  };

  const uniquePersons = new Set(currentData.map(r => r.personLabel)).size;
  const totalRecords = currentData.length;

  const participationTimes =
    viewMode === 'image' && selectedRecord
      ? currentData.filter(r => r.personLabel === selectedRecord.personLabel).length
      : totalRecords;
  const resultTimes =
    viewMode === 'image' && selectedRecord
      ? currentData.filter(r => r.personLabel === selectedRecord.personLabel).length
      : uniquePersons;

  return (
    <div className="task-result-window face-collision">
      <div className="navigation-header">
        <NavigationBreadcrumb 
          navigationPath={navigationPath}
          onNavigationClick={handleNavigationClick}
          rightContent={
            <div className="inline-summary">
              一共参与碰撞人次：<span className="number">{participationTimes}</span>
              &nbsp;&nbsp;碰撞结果人次：<span className="number">{resultTimes}</span>
            </div>
          }
        />
      </div>

      <div className="result-content">
        {viewMode === 'image' ? (
          <ImageDetailView selectedPerson={{ person: selectedRecord?.personLabel }} />
        ) : (
          <>
            <div className="thumbnail-grid">
              {currentItems.map((item) => (
                <FaceCollisionCell 
                  key={item.id}
                  record={item}
                  onClick={(rec) => handleRecordClick(rec)}
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
    </div>
  );
};

export default FaceCollisionResultWindow;
