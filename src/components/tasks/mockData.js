// 模拟人员分组数据
export const mockPersonGroups = [
  {
    id: 1,
    person: "人员A",
    count: 3,
    similarity: "95.2%",
    firstTime: "2023-07-31 09:08:45",
    lastTime: "2023-07-31 11:22:10",
    cameras: ["入口摄像头1", "大厅摄像头3", "出口摄像头5"]
  },
  {
    id: 2,
    person: "人员B", 
    count: 2,
    similarity: "92.8%",
    firstTime: "2023-07-31 10:15:23",
    lastTime: "2023-07-31 14:30:45",
    cameras: ["大厅摄像头4", "电梯摄像头7"]
  },
  {
    id: 3,
    person: "人员C",
    count: 4,
    similarity: "89.5%",
    firstTime: "2023-07-31 11:22:10",
    lastTime: "2023-07-31 18:20:33",
    cameras: ["出口摄像头6", "电梯摄像头8", "停车场摄像头9", "门禁摄像头11"]
  },
  {
    id: 4,
    person: "人员D",
    count: 1,
    similarity: "96.7%",
    firstTime: "2023-07-31 14:30:45",
    lastTime: "2023-07-31 14:30:45",
    cameras: ["电梯摄像头8"]
  },
  {
    id: 5,
    person: "人员E",
    count: 2,
    similarity: "91.3%",
    firstTime: "2023-07-31 16:45:12",
    lastTime: "2023-07-31 19:55:18",
    cameras: ["停车场摄像头10", "走廊摄像头13"]
  }
];

// 模拟人脸对比数据
export const mockFaceComparisons = [
  {
    id: 1,
    targetFace: "目标人脸A",
    matchedFace: "匹配人脸A1",
    similarity: "98.5%",
    confidence: "高",
    timestamp: "2023-07-31 09:15:30",
    camera: "入口摄像头1"
  },
  {
    id: 2,
    targetFace: "目标人脸A",
    matchedFace: "匹配人脸A2", 
    similarity: "96.2%",
    confidence: "高",
    timestamp: "2023-07-31 11:22:45",
    camera: "大厅摄像头3"
  },
  {
    id: 3,
    targetFace: "目标人脸B",
    matchedFace: "匹配人脸B1",
    similarity: "94.8%",
    confidence: "中",
    timestamp: "2023-07-31 14:30:12",
    camera: "电梯摄像头7"
  },
  {
    id: 4,
    targetFace: "目标人脸B",
    matchedFace: "匹配人脸B2",
    similarity: "92.1%",
    confidence: "中",
    timestamp: "2023-07-31 16:45:33",
    camera: "出口摄像头5"
  },
  {
    id: 5,
    targetFace: "目标人脸C",
    matchedFace: "匹配人脸C1",
    similarity: "89.7%",
    confidence: "低",
    timestamp: "2023-07-31 18:20:55",
    camera: "停车场摄像头9"
  }
];

// 模拟车辆分组数据
export const mockVehicleGroups = [
  {
    id: 1,
    plateNumber: "京A12345",
    vehicleType: "小型轿车",
    count: 5,
    firstTime: "2023-07-31 08:30:15",
    lastTime: "2023-07-31 17:45:22",
    cameras: "入口摄像头A1, 停车场摄像头B3, 出口摄像头C2"
  },
  {
    id: 2,
    plateNumber: "沪B67890",
    vehicleType: "SUV",
    count: 3,
    firstTime: "2023-07-31 09:15:33",
    lastTime: "2023-07-31 16:20:45",
    cameras: "入口摄像头A2, 停车场摄像头B1"
  },
  {
    id: 3,
    plateNumber: "粤C54321",
    vehicleType: "商务车",
    count: 7,
    firstTime: "2023-07-31 07:45:10",
    lastTime: "2023-07-31 18:30:55",
    cameras: "入口摄像头A1, 停车场摄像头B2, 出口摄像头C1, 内部摄像头D3"
  },
  {
    id: 4,
    plateNumber: "浙D98765",
    vehicleType: "货车",
    count: 2,
    firstTime: "2023-07-31 10:20:18",
    lastTime: "2023-07-31 15:10:30",
    cameras: "货运入口摄像头E1, 装卸区摄像头F2"
  },
  {
    id: 5,
    plateNumber: "苏E11223",
    vehicleType: "小型轿车",
    count: 4,
    firstTime: "2023-07-31 11:35:42",
    lastTime: "2023-07-31 19:25:15",
    cameras: "入口摄像头A3, 停车场摄像头B4, 出口摄像头C3"
  },
  {
    id: 6,
    plateNumber: "川F44556",
    vehicleType: "面包车",
    count: 1,
    firstTime: "2023-07-31 13:50:25",
    lastTime: "2023-07-31 13:50:25",
    cameras: "访客入口摄像头G1"
  },
  {
    id: 7,
    plateNumber: "鲁G77889",
    vehicleType: "轿车",
    count: 6,
    firstTime: "2023-07-31 06:45:08",
    lastTime: "2023-07-31 20:15:40",
    cameras: "入口摄像头A1, 停车场摄像头B1, 停车场摄像头B5, 出口摄像头C2"
  },
  {
    id: 8,
    plateNumber: "豫H33445",
    vehicleType: "SUV",
    count: 3,
    firstTime: "2023-07-31 12:25:50",
    lastTime: "2023-07-31 17:40:12",
    cameras: "入口摄像头A2, 停车场摄像头B3, 出口摄像头C1"
  }
];

// 模拟车辆碰撞分组数据
export const mockVehicleCollisionGroups = [
  {
    id: 1,
    plateNumber: "京A88888",
    vehicleType: "小型轿车",
    count: 3,
    firstTime: "2023-07-31 08:15:30",
    lastTime: "2023-07-31 16:45:15",
    cameras: "路口摄像头R1, 事故现场摄像头S2, 医院摄像头H1",
    collisionType: "追尾",
    severity: "轻微"
  },
  {
    id: 2,
    plateNumber: "沪B99999",
    vehicleType: "SUV",
    count: 2,
    firstTime: "2023-07-31 10:30:45",
    lastTime: "2023-07-31 14:20:10",
    cameras: "十字路口摄像头C1, 事故处理摄像头A3",
    collisionType: "侧撞",
    severity: "中等"
  },
  {
    id: 3,
    plateNumber: "粤C77777",
    vehicleType: "货车",
    count: 1,
    firstTime: "2023-07-31 13:45:20",
    lastTime: "2023-07-31 13:45:20",
    cameras: "高速路口摄像头H5",
    collisionType: "单车事故",
    severity: "严重"
  },
  {
    id: 4,
    plateNumber: "浙D66666",
    vehicleType: "面包车",
    count: 4,
    firstTime: "2023-07-31 07:20:15",
    lastTime: "2023-07-31 18:30:40",
    cameras: "市区摄像头M1, 路口摄像头R3, 停车场摄像头P2, 维修站摄像头W1",
    collisionType: "多车连撞",
    severity: "严重"
  },
  {
    id: 5,
    plateNumber: "苏E55555",
    vehicleType: "小型轿车",
    count: 2,
    firstTime: "2023-07-31 11:10:25",
    lastTime: "2023-07-31 15:50:35",
    cameras: "环岛摄像头E1, 医院急诊摄像头H2",
    collisionType: "刮擦",
    severity: "轻微"
  },
  {
    id: 6,
    plateNumber: "川F44444",
    vehicleType: "客车",
    count: 1,
    firstTime: "2023-07-31 16:25:50",
    lastTime: "2023-07-31 16:25:50",
    cameras: "客运站摄像头B1",
    collisionType: "撞护栏",
    severity: "中等"
  }
];

// 人脸碰撞记录数据
export const mockFaceCollisionRecords = [
  { id: 101, personLabel: '人员1', location: '门口', timestamp: '2025/12/02 18:51:48' },
  { id: 102, personLabel: '人员2', location: '门口', timestamp: '2025/12/02 18:51:18' },
  { id: 103, personLabel: '人员3', location: '公司大门', timestamp: '2025/12/02 18:51:16' },
  { id: 104, personLabel: '人员4', location: '门口', timestamp: '2025/12/02 18:51:16' },
  { id: 105, personLabel: '人员5', location: '公司摄像头', timestamp: '2025/12/02 18:51:15' },
  { id: 106, personLabel: '人员6', location: '2号楼4层西通道', timestamp: '2025/12/02 18:50:44' },
  { id: 107, personLabel: '人员7', location: '2号楼4层西通道', timestamp: '2025/12/02 18:50:00' },
  { id: 108, personLabel: '人员8', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:56' },
  { id: 109, personLabel: '人员9', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:52' },
  { id: 110, personLabel: '人员10', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:46' },
  { id: 111, personLabel: '人员11', location: '2号楼4层西向通道', timestamp: '2025/12/02 18:49:40' },
  { id: 112, personLabel: '人员12', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:36' },
  { id: 113, personLabel: '人员13', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:32' },
  { id: 114, personLabel: '人员14', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:45' },
  { id: 115, personLabel: '人员15', location: '2号楼4层西通道', timestamp: '2025/12/02 18:49:46' },
  { id: 116, personLabel: '人员16', location: '公司摄像头', timestamp: '2025/12/02 18:49:28' },
  { id: 117, personLabel: '人员17', location: '大厅', timestamp: '2025/12/02 17:42:18' },
  { id: 118, personLabel: '人员18', location: '大厅', timestamp: '2025/12/02 17:41:55' },
  { id: 119, personLabel: '人员19', location: '入口', timestamp: '2025/12/02 17:35:12' },
  { id: 120, personLabel: '人员20', location: '入口', timestamp: '2025/12/02 17:34:08' },
  { id: 121, personLabel: '人员21', location: '停车场', timestamp: '2025/12/02 16:50:10' },
  { id: 122, personLabel: '人员22', location: '停车场', timestamp: '2025/12/02 16:49:58' },
  { id: 123, personLabel: '人员23', location: '电梯', timestamp: '2025/12/02 16:31:16' },
  { id: 124, personLabel: '人员24', location: '走廊', timestamp: '2025/12/02 16:21:02' }
];
