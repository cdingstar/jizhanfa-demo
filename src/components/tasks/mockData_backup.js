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

// 模拟人脸对比数据
export const mockFacePairs = [
  {
    id: 1,
    leftFace: { person: "人员A", time: "2023-07-31 09:08:45", camera: "入口摄像头1", location: "大厅入口" },
    rightFace: { person: "人员A", time: "2023-07-31 09:08:47", camera: "入口摄像头2", location: "大厅入口" },
    similarity: "95.2%",
    timestamp: "2023-07-31 09:08:45"
  },
  {
    id: 2,
    leftFace: { person: "人员C", time: "2023-07-31 10:15:23", camera: "大厅摄像头3", location: "电梯口" },
    rightFace: { person: "人员D", time: "2023-07-31 10:15:25", camera: "大厅摄像头4", location: "电梯口" },
    similarity: "92.8%",
    timestamp: "2023-07-31 10:15:23"
  },
  {
    id: 3,
    leftFace: { person: "人员E", time: "2023-07-31 11:22:10", camera: "出口摄像头5", location: "会议室门口" },
    rightFace: { person: "人员F", time: "2023-07-31 11:22:12", camera: "出口摄像头6", location: "会议室门口" },
    similarity: "89.5%",
    timestamp: "2023-07-31 11:22:10"
  },
  {
    id: 4,
    leftFace: { person: "人员G", time: "2023-07-31 14:30:45", camera: "电梯摄像头7", location: "电梯口" },
    rightFace: { person: "人员H", time: "2023-07-31 14:30:47", camera: "电梯摄像头8", location: "电梯口" },
    similarity: "96.7%",
    timestamp: "2023-07-31 14:30:45"
  },
  {
    id: 5,
    leftFace: { person: "人员I", time: "2023-07-31 16:45:12", camera: "停车场摄像头9", location: "停车场" },
    rightFace: { person: "人员J", time: "2023-07-31 16:45:14", camera: "停车场摄像头10", location: "停车场" },
    similarity: "91.3%",
    timestamp: "2023-07-31 16:45:12"
  },
  {
    id: 6,
    leftFace: { person: "人员K", time: "2023-07-31 18:20:33", camera: "门禁摄像头11", location: "门禁区域" },
    rightFace: { person: "人员L", time: "2023-07-31 18:20:35", camera: "门禁摄像头12", location: "门禁区域" },
    similarity: "88.9%",
    timestamp: "2023-07-31 18:20:33"
  },
  {
    id: 7,
    leftFace: { person: "人员M", time: "2023-07-31 19:55:18", camera: "走廊摄像头13", location: "走廊" },
    rightFace: { person: "人员N", time: "2023-07-31 19:55:20", camera: "走廊摄像头14", location: "走廊" },
    similarity: "94.1%",
    timestamp: "2023-07-31 19:55:18"
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