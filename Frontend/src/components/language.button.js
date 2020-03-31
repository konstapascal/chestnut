import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'

export default function LanguageButton() {
    return (
        <div>
            <Popup
                trigger={<Icon name='language' size='large' />}
                content='Language'
                position='bottom right'
                basic 
            />
        </div>
    )
}
