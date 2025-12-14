import React, { useState } from 'react';

const VehicleCollisionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    plateNumber: '',
    vehicleType: '',
    collisionType: '',
    timeRange: {
      start: '',
      end: ''
    },
    location: '',
    severity: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.taskName.trim()) {
      newErrors.taskName = '请输入任务名称';
    }
    
    if (!formData.plateNumber.trim()) {
      newErrors.plateNumber = '请输入车牌号码';
    }
    
    if (!formData.vehicleType) {
      newErrors.vehicleType = '请选择车辆类型';
    }
    
    if (!formData.collisionType) {
      newErrors.collisionType = '请选择碰撞类型';
    }
    
    if (!formData.timeRange.start) {
      newErrors['timeRange.start'] = '请选择开始时间';
    }
    
    if (!formData.timeRange.end) {
      newErrors['timeRange.end'] = '请选择结束时间';
    }
    
    if (formData.timeRange.start && formData.timeRange.end) {
      if (new Date(formData.timeRange.start) >= new Date(formData.timeRange.end)) {
        newErrors['timeRange.end'] = '结束时间必须晚于开始时间';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const taskData = {
        ...formData,
        type: '车辆碰撞',
        createTime: new Date().toLocaleString('zh-CN'),
        progress: 0
      };
      
      onSubmit(taskData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-grid single-column">
        {/* 任务名称 */}
        <div className="form-group">
          <label className="form-label">
            任务名称 <span className="required">*</span>
          </label>
          <input
            type="text"
            className={`form-input ${errors.taskName ? 'error' : ''}`}
            placeholder="请输入车辆碰撞分析任务名称"
            value={formData.taskName}
            onChange={(e) => handleInputChange('taskName', e.target.value)}
          />
          {errors.taskName && <span className="error-message">{errors.taskName}</span>}
        </div>

        {/* 车牌号码 */}
        <div className="form-group">
          <label className="form-label">
            车牌号码 <span className="required">*</span>
          </label>
          <input
            type="text"
            className={`form-input ${errors.plateNumber ? 'error' : ''}`}
            placeholder="请输入车牌号码，如：京A12345"
            value={formData.plateNumber}
            onChange={(e) => handleInputChange('plateNumber', e.target.value)}
          />
          {errors.plateNumber && <span className="error-message">{errors.plateNumber}</span>}
        </div>

        {/* 车辆类型 */}
        <div className="form-group">
          <label className="form-label">
            车辆类型 <span className="required">*</span>
          </label>
          <select
            className={`form-select ${errors.vehicleType ? 'error' : ''}`}
            value={formData.vehicleType}
            onChange={(e) => handleInputChange('vehicleType', e.target.value)}
          >
            <option value="">请选择车辆类型</option>
            <option value="小型汽车">小型汽车</option>
            <option value="大型汽车">大型汽车</option>
            <option value="SUV">SUV</option>
            <option value="货车">货车</option>
            <option value="客车">客车</option>
            <option value="面包车">面包车</option>
            <option value="摩托车">摩托车</option>
          </select>
          {errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
        </div>

        {/* 碰撞类型 */}
        <div className="form-group">
          <label className="form-label">
            碰撞类型 <span className="required">*</span>
          </label>
          <select
            className={`form-select ${errors.collisionType ? 'error' : ''}`}
            value={formData.collisionType}
            onChange={(e) => handleInputChange('collisionType', e.target.value)}
          >
            <option value="">请选择碰撞类型</option>
            <option value="追尾">追尾</option>
            <option value="侧撞">侧撞</option>
            <option value="正面碰撞">正面碰撞</option>
            <option value="刮擦">刮擦</option>
            <option value="多车连撞">多车连撞</option>
            <option value="单车事故">单车事故</option>
            <option value="撞护栏">撞护栏</option>
            <option value="其他">其他</option>
          </select>
          {errors.collisionType && <span className="error-message">{errors.collisionType}</span>}
        </div>

        {/* 时间范围 */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              开始时间 <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              className={`form-input ${errors['timeRange.start'] ? 'error' : ''}`}
              value={formData.timeRange.start}
              onChange={(e) => handleInputChange('timeRange.start', e.target.value)}
            />
            {errors['timeRange.start'] && <span className="error-message">{errors['timeRange.start']}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">
              结束时间 <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              className={`form-input ${errors['timeRange.end'] ? 'error' : ''}`}
              value={formData.timeRange.end}
              onChange={(e) => handleInputChange('timeRange.end', e.target.value)}
            />
            {errors['timeRange.end'] && <span className="error-message">{errors['timeRange.end']}</span>}
          </div>
        </div>

        {/* 事故地点 */}
        <div className="form-group">
          <label className="form-label">事故地点</label>
          <input
            type="text"
            className="form-input"
            placeholder="请输入事故发生地点"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        {/* 事故严重程度 */}
        <div className="form-group">
          <label className="form-label">事故严重程度</label>
          <select
            className="form-select"
            value={formData.severity}
            onChange={(e) => handleInputChange('severity', e.target.value)}
          >
            <option value="">请选择严重程度</option>
            <option value="轻微">轻微</option>
            <option value="中等">中等</option>
            <option value="严重">严重</option>
            <option value="特别严重">特别严重</option>
          </select>
        </div>

        {/* 备注描述 */}
        <div className="form-group">
          <label className="form-label">备注描述</label>
          <textarea
            className="form-textarea"
            placeholder="请输入任务描述或备注信息"
            rows="3"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          取消
        </button>
        <button type="submit" className="submit-btn">
          创建任务
        </button>
      </div>
    </form>
  );
};

export default VehicleCollisionForm;