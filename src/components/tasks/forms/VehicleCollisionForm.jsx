import React, { useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

export default function VehicleCollisionForm({ onSubmit, onCancel }) {
  const now = new Date();
  const [taskName, setTaskName] = useState('');
  const [minTimes, setMinTimes] = useState(2);
  const [startTime, setStartTime] = useState(fmt(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)));
  const [endTime, setEndTime] = useState(fmt(now));
  const [scopes, setScopes] = useState([
    { id: 1, label: '范围1:', value: '默认全选' }
  ]);

  const addScope = () => {
    const newId = Math.max(...scopes.map(s => s.id)) + 1;
    setScopes([...scopes, { 
      id: newId, 
      label: `范围${newId}:`, 
      value: '默认全选' 
    }]);
  };

  const deleteScope = (id) => {
    if (scopes.length > 1) {
      setScopes(scopes.filter(scope => scope.id !== id));
    }
  };

  const updateScopeValue = (id, value) => {
    setScopes(scopes.map(scope => 
      scope.id === id ? { ...scope, value } : scope
    ));
  };

  const handleSave = () => {
    if (!taskName.trim()) return;
    onSubmit({
      name: taskName.trim(),
      extended: {
        config: {
          minTimes,
          timeRange: { start: startTime, end: endTime },
          scopes: scopes
        },
        resultCount: 0
      }
    });
  };

  return (
    <div className="modal-body">
      <div className="form-grid single-column">
        <div className="form-col fields">
          <div className="field-group">
            <label>任务名称（必填）</label>
            <input type="text" value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder="请输入任务名称" autoFocus />
          </div>

          <div className="field-group">
            <label>至少同行次数</label>
            <input type="number" min="1" value={minTimes} onChange={(e)=>setMinTimes(Number(e.target.value))} />
          </div>

          <div className="field-group">
            <label>执行时段（起 - 止）</label>
            <div className="range-row">
              <input type="text" value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
              <span className="range-sep">-</span>
              <input type="text" value={endTime} onChange={(e)=>setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="field-group">
            <div className="scope-header">
              <label>选择范围</label>
              <button type="button" className="new-scope-btn" onClick={addScope}>新建范围</button>
            </div>
            {scopes.map((scope) => (
              <div key={scope.id} className="scope-item">
                <span className="scope-label">{scope.label}</span>
                <input 
                  type="text" 
                  value={scope.value} 
                  onChange={(e) => updateScopeValue(scope.id, e.target.value)} 
                  placeholder="单击选择单位（默认全选）" 
                />
                <button type="button" className="scope-plus">＋</button>
                <button 
                  type="button" 
                  className="delete-scope-btn" 
                  onClick={() => deleteScope(scope.id)}
                  disabled={scopes.length === 1}
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="cancel-btn" onClick={onCancel}>取消</button>
        <button className="confirm-btn" onClick={handleSave}>保存</button>
      </div>
    </div>
  );
}