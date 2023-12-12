import { Avatar, Descriptions, Empty, Space, Spin, Steps } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'

import { H_M_S_FORMAT } from '@/constants'
import { useGetTodaySchedulesService } from '@/service/dashborad'
import { ImgUtils } from '@/utils'

interface IProps {
  today: string
}

/**
 * 某一天的课程表课程表
 */
const Schedule = ({ today }: IProps) => {
  const { getTodaySchedules, data, loading } = useGetTodaySchedulesService()

  useEffect(() => {
    if (today) {
      getTodaySchedules(today)
    }
  }, [today])

  if (!loading && (!data || data.length === 0))
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无排课" />

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
                  <Avatar.Group
                    maxCount={10}
                    maxStyle={{ color: '#fff', backgroundColor: '#00c6a8' }}
                  >
                    {s.course.teachers?.map(t => (
                      <Avatar
                        key={t.id}
                        src={ImgUtils.getThumb({
                          url: t.avatar,
                          w: 100,
                          h: 100,
                          isAvatar: true,
                        })}
                      />
                    ))}
                  </Avatar.Group>
                </Descriptions.Item>
              </Descriptions>
            ),
          }
        })}
      />
    </Spin>
  )
}

export default Schedule
