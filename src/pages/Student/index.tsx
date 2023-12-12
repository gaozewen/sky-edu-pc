import { PageContainer } from '@ant-design/pro-components'
import { Card, Pagination, Space } from 'antd'

import { useGetStudentsService } from '@/service/student'
import { IStudent } from '@/types'
import { ImgUtils } from '@/utils'

import styles from './index.module.scss'

const Student = () => {
  const { loading, data, pageInfo, refetch } = useGetStudentsService()

  const onPageChange = (pageNum: number, pageSize: number) => {
    refetch({
      pageInfo: {
        pageNum,
        pageSize,
      },
    })
  }

  return (
    <div className={styles.container}>
      <PageContainer
        loading={loading}
        header={{
          title: '学员管理',
        }}
      >
        <Card>
          {data?.map((item: IStudent) => (
            <Card
              key={item.id}
              hoverable
              className={styles.card}
              cover={
                <img
                  className={styles.avatar}
                  src={ImgUtils.getThumb({
                    url: item.avatar,
                    w: 200,
                    h: 200,
                    isAvatar: true,
                  })}
                />
              }
            >
              <Card.Meta
                title={item.nickname || '无昵称'}
                description={
                  <Space wrap>
                    {[item.account || '无账号', item.tel || '无手机号']}
                  </Space>
                }
              />
            </Card>
          ))}
          <div className={styles.page}>
            <Pagination
              pageSize={pageInfo?.pageSize}
              current={pageInfo?.pageNum}
              total={pageInfo?.total}
              onChange={onPageChange}
            />
          </div>
        </Card>
      </PageContainer>
    </div>
  )
}

export default Student
