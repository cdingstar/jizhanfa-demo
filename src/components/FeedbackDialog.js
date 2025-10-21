import React, { useState } from 'react';
import './FeedbackDialog.css';

const FeedbackDialog = ({ isOpen, onClose }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  const feedbackTypes = [
    { value: 'bug', label: '错误报告' },
    { value: 'feature', label: '功能建议' },
    { value: 'improvement', label: '改进建议' },
    { value: 'other', label: '其他' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!feedbackType || !description.trim()) {
      alert('请填写反馈类型和描述信息');
      return;
    }

    // 这里可以添加提交反馈的逻辑
    console.log('反馈提交:', {
      type: feedbackType,
      description: description.trim(),
      contact: contact.trim()
    });

    // 重置表单
    setFeedbackType('');
    setDescription('');
    setContact('');
    
    alert('反馈提交成功！感谢您的建议。');
    onClose();
  };

  const handleClose = () => {
    setFeedbackType('');
    setDescription('');
    setContact('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-overlay">
      <div className="feedback-dialog">
        <div className="feedback-header">
          <h3>用户反馈</h3>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="feedbackType">反馈类型 *</label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              required
            >
              <option value="">请选择反馈类型</option>
              {feedbackTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">描述信息 *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="your feedback/comment"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">联系方式</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="your contact info"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              取消
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackDialog;