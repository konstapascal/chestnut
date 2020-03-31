import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'

export default function DarkModeButton() {
    return (
            <Popup
                trigger={<Icon name='moon' />}
                content='Dark mode'
                position='bottom right'
                basic 
            />
    )
}
