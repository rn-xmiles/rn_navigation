/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, TextInput, Text } from 'react-native'

interface Props {}
interface State {
    text: string;
}

export default class TextInputComponent extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = { text: '' }
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({ text })}
                />

                <Text style={{ padding: 10, fontSize: 42 }}>
                    {this.state.text
                        .split(' ')
                        .map((word) => word && '🍕')
                        .join(' ')}
                </Text>
            </View>
        )
    }
}
