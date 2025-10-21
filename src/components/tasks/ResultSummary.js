import React from 'react';
import { mockPersonGroups } from './mockData';

const ResultSummary = ({ viewMode, currentData, selectedPerson }) => {
  return (
    <div className="result-summary">
      <h4>分析摘要</h4>
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
  );
};

export default ResultSummary;