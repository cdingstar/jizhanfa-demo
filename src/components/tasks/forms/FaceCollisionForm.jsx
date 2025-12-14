import React, { useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

// 转换为datetime-local格式: YYYY-MM-DDTHH:mm
const toDateTimeLocal = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

// 从datetime-local格式转换为显示格式
const fromDateTimeLocal = (str) => {
  if (!str) return '';
  const d = new Date(str);
  return fmt(d);
};

export default function FaceCollisionForm({ onSubmit, onCancel }) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  
  const [taskName, setTaskName] = useState('');
  const [scopes, setScopes] = useState([
    { 
      id: 1, 
      label: '范围1:', 
      value: '默认全选',
      startTime: toDateTimeLocal(todayStart),
      endTime: toDateTimeLocal(now)
    },
    { 
      id: 2, 
      label: '范围2:', 
      value: '默认全选',
      startTime: toDateTimeLocal(todayStart),
      endTime: toDateTimeLocal(now)
    }
  ]);

  // 碰撞次数始终等于范围个数
  const minTimes = scopes.length;

  const addScope = () => {
    const newId = Math.max(...scopes.map(s => s.id)) + 1;
    setScopes([...scopes, { 
      id: newId, 
      label: `范围${newId}:`, 
      value: '默认全选',
      startTime: toDateTimeLocal(todayStart),
      endTime: toDateTimeLocal(now)
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

  const updateScopeTime = (id, field, value) => {
    setScopes(scopes.map(scope => 
      scope.id === id ? { ...scope, [field]: value } : scope
    ));
  };

  const handleSave = () => {
    if (!taskName.trim()) return;
    
    // 转换范围的时间格式为显示格式
    const formattedScopes = scopes.map(scope => ({
      ...scope,
      startTime: fromDateTimeLocal(scope.startTime),
      endTime: fromDateTimeLocal(scope.endTime)
    }));
    
    onSubmit({
      name: taskName.trim(),
      extended: {
        config: {
          minTimes,
          scopes: formattedScopes
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
            <label>碰撞次数</label>
            <input type="number" value={minTimes} readOnly style={{backgroundColor: '#f5f5f5', cursor: 'not-allowed'}} />
          </div>

          <div className="field-group">
            <div className="scope-header">
              <label>选择范围</label>
              <button type="button" className="new-scope-btn" onClick={addScope}>新建范围</button>
            </div>
            {scopes.map((scope) => (
              <div key={scope.id} className="scope-item-group">
                <div className="scope-item">
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
                <div className="scope-time-range">
                  <label>时间范围：</label>
                  <div className="range-row">
                    <input 
                      type="datetime-local" 
                      value={scope.startTime} 
                      onChange={(e) => updateScopeTime(scope.id, 'startTime', e.target.value)} 
                    />
                    <span className="range-sep">-</span>
                    <input 
                      type="datetime-local" 
                      value={scope.endTime} 
                      onChange={(e) => updateScopeTime(scope.id, 'endTime', e.target.value)} 
                    />
                  </div>
                </div>
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