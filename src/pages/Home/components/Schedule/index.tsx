import { Avatar, Descriptions, Empty, Space, Spin, Steps } from 'antd'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { H_M_S_FORMAT } from '@/constants'
import { ScheduleRecordStatus } from '@/constants/enum'
import { useGetTodaySchedulesService } from '@/service/dashborad'
import { ImgUtils } from '@/utils'

interface IProps {
  today: string
}

export interface IRefProps {
  refetch: () => void
}

/**
 * 某一天的课程表课程表
 */
const Schedule = forwardRef<IRefProps, IProps>(({ today }, ref) => {
  const { getTodaySchedules, data, loading, refetch } = useGetTodaySchedulesService()

  useEffect(() => {
    if (today) {
      getTodaySchedules(today)
    }
  }, [today])

  useImperativeHandle(
    ref,
    () => ({
      refetch: () => {
        refetch()
      },
    }),
    [refetch]
  )

  if (!loading && (!data || data.length === 0))
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无排课，快去排课吧" />
    )

  return (
    <Spin spinning={loading}>
      <Steps
        direction="vertical"
        items={data?.map(s => {
          let status: 'wait' | 'process' | 'finish' | 'error' = 'wait'
          const curTime = dayjs()

          if (
            curTime.isAfter(dayjs(s.startTime, H_M_S_FORMAT)) &&
            curTime.isBefore(dayjs(s.endTime, H_M_S_FORMAT))
          ) {
            status = 'process'
          } else if (curTime.isAfter(dayjs(s.endTime, H_M_S_FORMAT))) {
            status = 'finish'
          }

          const unCanceledScheduleRecords = s.scheduleRecords?.filter(
            sr => sr.status !== ScheduleRecordStatus.CANCEL
          )

          return {
            status,
            title: `${s.startTime} - ${s.endTime} ${s.course.name}`,
            description: (
              <Descriptions bordered>
                <Descriptions.Item span={3} label="讲师" labelStyle={{ width: 80 }}>
                  <Space>
                    {s.course.teachers?.map(t => (
                      <Space key={t.id} align="center">
                        <Avatar
                          shape="square"
                          size="small"
                          src={ImgUtils.getThumb({
                            url: t.avatar,
                            w: 100,
                            h: 100,
                            isAvatar: true,
                          })}
                        />
                        {t.nickname}
                      </Space>
                    ))}
                  </Space>
                </Descriptions.Item>

                <Descriptions.Item
                  span={3}
                  label="学员"
                  contentStyle={{
                    lineHeight: 0,
                  }}
                >
                  {unCanceledScheduleRecords.length === 0 ? (
                    '暂无'
                  ) : (
                    <Avatar.Group
                      maxCount={10}
                      maxStyle={{ color: '#fff', backgroundColor: '#00c6a8' }}
                    >
                      {unCanceledScheduleRecords.map(sr => (
                        <Avatar
                          key={sr.id}
                          src={ImgUtils.getThumb({
                            url: sr.student.avatar,
                            w: 100,
                            h: 100,
                            isAvatar: true,
                          })}
                        />
                      ))}
                    </Avatar.Group>
                  )}
                </Descriptions.Item>
              </Descriptions>
            ),
          }
        })}
      />
    </Spin>
  )
})
export default Schedule
