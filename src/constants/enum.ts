export enum SizeType {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
}

// 学生购买的消费卡记录状态
export enum CardRecordStatus {
  VALID = 'VALID', // 有效
  EXPIRED = 'EXPIRED', // 过期
  DEPLETED = 'DEPLETED', // 耗尽
}

// 学生预约的课程表记录状态
export enum ScheduleRecordStatus {
  PENDING = 'PENDING', // 未开始
  DOING = 'DOING', // 正在上课
  DONE = 'DONE', // 上完课了
  COMMENTED = 'COMMENTED', // 已评价
  CANCEL = 'CANCEL', // 已取消
}
