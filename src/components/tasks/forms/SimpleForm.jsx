import React, { useState } from 'react';

export default function SimpleForm({ title = '新建任务', onSubmit, onCancel }) {
  const [taskName, setTaskName] = useState('');

  const handleSave = () => {
    if (!taskName.trim()) return;
    onSubmit({
      name: taskName.trim(),
      extended: { resultCount: 0 }
    });
  };

  return (
    <div className="modal-body">
      <label>任务名称（必填）</label>
      <input
        type="text"
        value={taskName}
        onChange={(e)=>setTaskName(e.target.value)}
        placeholder="请输入任务名称"
        autoFocus
      />
      <div className="modal-footer">
        <button className="cancel-btn" onClick={onCancel}>取消</button>
        <button className="confirm-btn" onClick={handleSave}>保存</button>
      </div>
    </div>
  );
}