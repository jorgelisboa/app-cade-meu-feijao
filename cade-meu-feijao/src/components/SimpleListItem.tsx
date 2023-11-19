import { View } from 'react-native'
import { List } from 'react-native-paper'
import React from 'react'

export interface SimpleListItemProps {
    title: string
    icon: string
    description: string
    action: any
}

const SimpleListItem = (simpleListItem: SimpleListItemProps) => {
  return (
    <List.Item
        onPress={simpleListItem.action}
        title={simpleListItem.title}
        description={simpleListItem.description}
        left={props => <List.Icon {...props} icon={simpleListItem.icon} />}
    />
  )
}

export default SimpleListItem