import React, { useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

export default function PeerVehicleForm({ onSubmit, onCancel }) {
  const now = new Date();
  const [taskName, setTaskName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [minTimes, setMinTimes] = useState(2);
  const [intervalSec, setIntervalSec] = useState(5);
  const [startTime, setStartTime] = useState(fmt(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)));
  const [endTime, setEndTime] = useState(fmt(now));
  const [scope, setScope] = useState('默认全选');

  const handleSave = () => {
    if (!taskName.trim()) return;
    onSubmit({
      name: taskName.trim(),
      extended: {
        config: {
          plateNumber,
          minTimes,
          intervalSec,
          timeRange: { start: startTime, end: endTime },
          scope
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
            <label>车牌号码：</label>
            <input type="text" value={plateNumber} onChange={(e)=>setPlateNumber(e.target.value)} placeholder="请输入车牌号码" />
          </div>

          <div className="field-group">
            <label>至少同行次数</label>
            <input type="number" min="1" value={minTimes} onChange={(e)=>setMinTimes(Number(e.target.value))} />
          </div>

          <div className="field-group">
            <label>同行间隔时间（秒）</label>
            <input type="number" min="1" value={intervalSec} onChange={(e)=>setIntervalSec(Number(e.target.value))} />
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
            <label>选择范围</label>
            <div className="scope-row">
              <input type="text" value={scope} onChange={(e)=>setScope(e.target.value)} placeholder="单击选择单位（默认全选）" />
              <button className="scope-plus">＋</button>
            </div>
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