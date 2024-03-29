import { Avatar, Descriptions, Empty, Space, Spin, Steps } from 'antd'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { DAY_FORMAT, H_M_S_FORMAT } from '@/constants'
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
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

  return (
    <Spin spinning={loading}>
      <Steps
        direction="vertical"
        items={data?.map(s => {
          let status: 'wait' | 'process' | 'finish' | 'error' = 'wait'
          // 现在的时间
          const curTime = dayjs()
          const FORMAT = `${DAY_FORMAT} ${H_M_S_FORMAT}`
          // 课程开始时间
          const courseStartTime = dayjs(`${today} ${s.startTime}`, FORMAT)
          //  课程结束时间
          const courseEndTime = dayjs(`${today} ${s.endTime}`, FORMAT)

          if (curTime.isAfter(courseStartTime) && curTime.isBefore(courseEndTime)) {
            status = 'process'
          } else if (curTime.isAfter(courseEndTime)) {
            status = 'finish'
          }

          const unCanceledScheduleRecords = s.scheduleRecords?.filter(
            sr => sr.status !== ScheduleRecordStatus.CANCEL
          )

          return {
            status,
            title: `${s.startTime} - ${s.endTime} ${s.course.name}`,
            description: (
              <Descriptions
                bordered
                column={1}
                items={[
                  {
                    key: 'teacher',
                    label: '讲师',
                    labelStyle: { width: 80 },
                    children: (
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
                    ),
                  },
                  {
                    key: 'student',
                    label: '学员',
                    contentStyle: {
                      lineHeight: 0,
                    },
                    children: (
                      <>
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
                      </>
                    ),
                  },
                ]}
              ></Descriptions>
            ),
          }
        })}
      />
    </Spin>
  )
})
export default Schedule
