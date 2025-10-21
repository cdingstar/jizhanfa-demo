import React from 'react';
import PeerPersonForm from './forms/PeerPersonForm';
import PeerVehicleForm from './forms/PeerVehicleForm';
import FaceCollisionForm from './forms/FaceCollisionForm';
import VehicleCollisionForm from './forms/VehicleCollisionForm';
import SimpleForm from './forms/SimpleForm';
import '../TaskManager.css';

export default function CreateTaskModal({ activeMenu, visible, onClose, onSubmit }) {
  if (!visible) return null;

  const renderForm = () => {
    switch (activeMenu) {
      case '同行人':
        return <PeerPersonForm onSubmit={onSubmit} onCancel={onClose} />;
      case '同行车辆':
        return <PeerVehicleForm onSubmit={onSubmit} onCancel={onClose} />;
      case '人脸碰撞':
        return <FaceCollisionForm onSubmit={onSubmit} onCancel={onClose} />;
      case '车辆碰撞':
        return <VehicleCollisionForm onSubmit={onSubmit} onCancel={onClose} />;
      default:
        return <SimpleForm title={`新建${activeMenu}任务`} onSubmit={onSubmit} onCancel={onClose} />;
    }
  };

  const getModalClass = () => {
    switch (activeMenu) {
      case '同行人':
        return 'modal wide';
      case '同行车辆':
      case '人脸碰撞':
      case '车辆碰撞':
        return 'modal medium';
      default:
        return 'modal';
    }
  };

  return (
    <div className="modal-overlay">
      <div className={getModalClass()}>
        <div className="modal-header">
          <h4>新建{activeMenu}任务</h4>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}