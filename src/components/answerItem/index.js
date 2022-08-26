import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  FlexRow,
  FlexRowAndCenter,
  AlignCenter,
} from '../../common/commonStyles'
import { 
  BLACK_FIVE,
  BLACK_FOUR,
  GREEN_DARK,
  WHITE
} from '../../common';

class AnswerItem extends React.Component {
  render() {
    const {
      itemImg,
      itemName,
      feedback,
      showFeedback,
      showDivider,
      onItemPress
    } = this.props

    return (
      <TouchableOpacity onPress={onItemPress}>
        <FlexRowAndCenter paddingRight={30}>
          <Image
            source={itemImg}
            style={styles.optionImage}
          />
          <Text style={styles.textStyle}>{itemName}</Text>
        </FlexRowAndCenter>

        

        { showFeedback &&
        <View marginLeft={-20} marginRight={-20} marginTop={10} paddingTop={10} paddingBottom={10} backgroundColor={GREEN_DARK}>          
          <Text style={styles.feedback}>Feedback</Text>
          <Text style={styles.feedback}>{feedback}</Text>
        </View>
        }

        { showDivider &&
          <FlexRow
            height={1}
            backgroundColor={BLACK_FOUR}
            marginTop={10}
            marginBottom={10}
          />
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  feedback: {
    fontSize: 14,
    color: WHITE,
    marginLeft: 20,
    marginRight: 20
  },
  textStyle: {
    fontSize:16,
    color: BLACK_FIVE,
    marginLeft: 10,
    marginRight: 10
  },
  optionImage: {
    width: 50,
    height: 50,
  }
});

export default AnswerItem