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