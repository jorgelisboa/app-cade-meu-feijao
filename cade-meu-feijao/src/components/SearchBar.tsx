import { View } from 'react-native'
import { Searchbar } from 'react-native-paper'

export interface Props {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = (props: Props) => {
    const onChangeSearch = (query: string) => props.setSearchQuery(query)
    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={props.searchQuery}
            />
        </View>
    )
}

export default SearchBar