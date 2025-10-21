import React, { useState } from 'react';
import './TaskManager.css';
import CreateTaskModal from './tasks/CreateTaskModal';
import HoverDetail from './tasks/forms/HoverDetail';

const TaskManager = ({ tasks, onDeleteTask, onViewTask, onCreateTask, activeMenu }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  // 受控悬浮层状态：当前悬停行与鼠标位置（相对任务表）
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // 最近鼠标位置（未弹出时）
  const [fixedPos, setFixedPos] = useState(null);           // 已弹出后固定位置 {x,y}
  const [hoverTimer, setHoverTimer] = useState(null);       // 1秒延时定时器

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  // 任务查看功能已移至App.js中实现
  const getProgressIcon = (progress) => {
    if (progress === 0) return '⏳';
    if (progress < 50) return '🔄';
    if (progress < 100) return '⚡';
    return '✅';
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return '#999';
    if (progress < 50) return '#ff9800';
    if (progress < 100) return '#2196f3';
    return '#4caf50';
  };

  return (
    <div className="task-manager">
      <div className="task-header left">
        <button className="create-btn" onClick={handleCreateClick}>
          + 新建任务
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <p>暂无任务数据，请点击左侧菜单创建新任务</p>
          <div className="empty-illustration">
            <div className="illustration-bg">
              <span className="illustration-icon">👤</span>
              <span className="illustration-icon">💻</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="task-table hover-scope"
          onMouseLeave={() => {
            if (hoverTimer) { clearTimeout(hoverTimer); setHoverTimer(null); }
            setHoveredId(null);
            setFixedPos(null);
          }}
        >
          <div className="table-header">
            <div className="col-id">序号</div>
            <div className="col-name">任务名称</div>
            <div className="col-time">创建时间</div>
            <div className="col-progress">进度</div>
            <div className="col-result">结果数量</div>
            <div className="col-actions">操作</div>
          </div>
          
          <div className="table-body">
            {tasks.map((task, index) => {
              const resultCount = task.resultCount ?? task.extended?.resultCount ?? 0;
              return (
              <div
                key={task.id}
                className="table-row"
                onMouseEnter={(e) => {
                  // 检查是否在操作列，如果是则不触发悬浮
                  if (e.target.closest('.col-actions')) return;
                  setHoveredId(task.id);
                  // 使用全局坐标，因为浮层是fixed定位
                  const x = e.clientX;
                  const y = e.clientY;
                  setMousePos({ x, y });
                  if (hoverTimer) clearTimeout(hoverTimer);
                  const t = setTimeout(() => {
                    // 使用进入时记录的坐标固定位置
                    setFixedPos(fp => fp ?? mousePos);
                  }, 1000);
                  setHoverTimer(t);
                }}
                onMouseMove={(e) => {
                  // 检查是否在操作列，如果是则不触发悬浮
                  if (e.target.closest('.col-actions')) return;
                  // 使用全局坐标，因为浮层是fixed定位
                  const x = e.clientX;
                  const y = e.clientY;
                  if (fixedPos) {
                    // 已弹出，移动则立即关闭
                    if (hoverTimer) { clearTimeout(hoverTimer); setHoverTimer(null); }
                    setHoveredId(null);
                    setFixedPos(null);
                  } else {
                    setMousePos({ x, y }); // 未弹出时更新待用位置
                  }
                }}
                onMouseLeave={() => {
                  if (hoverTimer) { clearTimeout(hoverTimer); setHoverTimer(null); }
                  setHoveredId((id) => (id === task.id ? null : id));
                  setFixedPos(null);
                }}
              >
                <div className="col-id">{index + 1}</div>
                <div className="col-name">
                  <span className="task-name">{task.name}</span>
                </div>
                <div className="col-time">{task.createTime}</div>
                <div className="col-progress">
                  <div className="progress-container">
                    <span 
                      className="progress-icon"
                      style={{ color: getProgressColor(task.progress) }}
                    >
                      {getProgressIcon(task.progress)}
                    </span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${task.progress}%`,
                          backgroundColor: getProgressColor(task.progress)
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{task.progress}%</span>
                  </div>
                </div>
                <div className="col-result">{resultCount}</div>
                <div className="col-actions">
                  <button 
                    className="action-btn view-btn"
                    onClick={() => onViewTask(task.id)}
                  >
                    查看
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    删除
                  </button>
                </div>
              </div>
            )})}
          </div>
          {/* 仅渲染一个受控浮层，由 forms/HoverDetail 承载内容 */}
          {(() => {
            const visible = Boolean(hoveredId && fixedPos);
            if (!visible) return null;
            const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
            const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
            const cardW = 420;
            const cardH = 260; // 估算高度，确保不出界
            const margin = 12;

            // 默认以鼠标为左上顶点
            let x = fixedPos.x;
            let y = fixedPos.y;

            // 越界修正（双向 clamp）
            x = Math.max(margin, Math.min(x, vw - cardW - margin));
            y = Math.max(margin, Math.min(y, vh - cardH - margin));

            return (
              <HoverDetail
                visible={true}
                position={{ x, y }}
                task={tasks.find(x => x.id === hoveredId)}
              />
            );
          })()}
        </div>
      )}

      <CreateTaskModal
        activeMenu={activeMenu}
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(payload) => {
          onCreateTask(payload);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default TaskManager;