import { Result } from 'antd'
import React from 'react'

const NotFoundPage = () => {
  return (
    <Result
    status="404"
    title="Can not access"
    subTitle="You can not access this page! Go to my page!" 
    />
  )
}

export default NotFoundPage