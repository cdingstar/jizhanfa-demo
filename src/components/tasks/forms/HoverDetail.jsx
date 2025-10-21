import React from 'react';
import '../../TaskManager.css';

// 生成要展示的字段列表（可按不同菜单类型扩展）
function buildFields(task) {
  const cfg = task?.extended?.config || {};
  const rc = task?.resultCount ?? task?.extended?.resultCount ?? 0;
  return [
    { k: '创建时间', v: task?.createTime || '-' },
    { k: '最小相似度', v: cfg.similarity ?? '-' },
    { k: '至少同行次数', v: cfg.minTimes ?? '-' },
    { k: '同行间隔(秒)', v: cfg.intervalSec ?? '-' },
    { k: '执行时段', v: cfg.timeRange ? `${cfg.timeRange.start} - ${cfg.timeRange.end}` : '-' },
    { k: '选择范围', v: cfg.scope ?? '-' },
    { k: '结果数量', v: rc },
  ];
}

/**
 * 受控悬浮详情层
 * props:
 * - visible: boolean 是否显示
 * - position: {x, y} 相对任务表容器坐标（已固定）
 * - task: 当前任务对象
 */
export default function HoverDetail({ visible, position, task }) {
  if (!visible || !task) return null;
  const fields = buildFields(task);

  return (
    <div
      className="row-hover-card controlled"
      style={{ left: position.x, top: position.y }}
    >
      <div className="hover-title">任务参数</div>
      <div className="hover-grid">
        {fields.map(({ k, v }, idx) => (
          <div className="hover-item" key={idx}>
            <span className="k">{k}</span>
            <span className="v">{String(v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}