import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';
import TaskResultWindow from './components/tasks/TaskResultWindow';
import FaceCollisionResultWindow from './components/tasks/FaceCollisionResultWindow';
import VehicleResultWindow from './components/tasks/VehicleResultWindow';
import VehicleCollisionResultWindow from './components/tasks/VehicleCollisionResultWindow';

function App() {
  const [activeMenu, setActiveMenu] = useState('同行人');
  const [viewingTask, setViewingTask] = useState(null);
  const [tasks, setTasks] = useState([
    // 同行人：3个
    { id: 1, name: '同行人分析任务001', createTime: '2025-09-10 14:30:25', progress: 75, type: '同行人' },
    { id: 2, name: '同行人分析任务002', createTime: '2025-09-09 10:12:03', progress: 20, type: '同行人' },
    { id: 3, name: '同行人分析任务003', createTime: '2025-09-08 08:22:11', progress: 100, type: '同行人' },
    // 同行车辆：2个
    { id: 4, name: '同行车辆任务A', createTime: '2025-09-10 13:15:10', progress: 45, type: '同行车辆' },
    { id: 5, name: '同行车辆任务B', createTime: '2025-09-07 19:01:45', progress: 10, type: '同行车辆' },
    // 人脸碰撞：4个
    { id: 6, name: '人脸碰撞任务001', createTime: '2025-09-10 12:00:00', progress: 90, type: '人脸碰撞' },
    { id: 7, name: '人脸碰撞任务002', createTime: '2025-09-09 16:20:30', progress: 65, type: '人脸碰撞' },
    { id: 8, name: '人脸碰撞任务003', createTime: '2025-09-08 11:05:12', progress: 5, type: '人脸碰撞' },
    { id: 9, name: '人脸碰撞任务004', createTime: '2025-09-06 09:40:00', progress: 100, type: '人脸碰撞' },
    // 车辆碰撞：3个
    { id: 10, name: '车辆碰撞检测任务001', createTime: '2025-09-05 14:10:00', progress: 30, type: '车辆碰撞' },
    { id: 11, name: '高速公路连环碰撞分析', createTime: '2025-09-09 09:20:15', progress: 85, type: '车辆碰撞' },
    { id: 12, name: '市区交通事故调查', createTime: '2025-09-10 16:30:45', progress: 100, type: '车辆碰撞' }
  ]);

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
  };

  const handleCreateTask = (payload) => {
    // 兼容旧调用：字符串或对象
    const name = typeof payload === 'string' ? payload : payload.name;
    const extended = typeof payload === 'string' ? undefined : payload.extended;

    const newTask = {
      id: tasks.length + 1,
      name,
      createTime: new Date().toLocaleString('zh-CN'),
      progress: 0,
      type: activeMenu,
      ...(extended ? extended : {})
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleViewTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setViewingTask(task);
    }
  };

  const handleCloseTaskView = () => {
    setViewingTask(null);
  };

  const filteredTasks = tasks.filter(task => task.type === activeMenu);

  if (viewingTask) {
    // 根据任务类型选择不同的结果窗口组件
    if (viewingTask.type === '同行车辆') {
      return (
        <VehicleResultWindow 
          task={viewingTask} 
          onClose={handleCloseTaskView}
        />
      );
    } else if (viewingTask.type === '车辆碰撞') {
      return (
        <VehicleCollisionResultWindow 
          task={viewingTask} 
          onClose={handleCloseTaskView}
        />
      );
    } else if (viewingTask.type === '人脸碰撞') {
      return (
        <FaceCollisionResultWindow
          task={viewingTask}
          onClose={handleCloseTaskView}
        />
      );
    } else {
      return (
        <TaskResultWindow 
          task={viewingTask} 
          onClose={handleCloseTaskView}
        />
      );
    }
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar 
          activeMenu={activeMenu} 
          onMenuChange={handleMenuChange}
        />
        <TaskManager 
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onViewTask={handleViewTask}
          onCreateTask={handleCreateTask}
          activeMenu={activeMenu}
        />
      </div>
    </div>
  );
}

export default App;
