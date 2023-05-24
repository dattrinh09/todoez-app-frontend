import React, { useState } from 'react'
import MainLayout from '../../../../components/Layout/MainLayout/MainLayout'
import { Container, SrpintLayout } from './sprint-styles'
import { Button } from 'antd'
import CreateSprint from './Form/CreateSprint'

const SprintList = () => {
    const [isCreate, setIsCreate] = useState(false);
  return (
    <MainLayout>
        <SrpintLayout>
            <Container>
                <Button onClick={() => setIsCreate(true)}>Create sprint</Button>
                {isCreate && (
                    <CreateSprint
                    open={isCreate}
                    onClose={() => setIsCreate(false)} 
                    />
                )}
            </Container>
        </SrpintLayout>
    </MainLayout>
  )
}

export default SprintList