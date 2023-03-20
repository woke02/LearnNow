import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Bar } from 'react-native-progress'
import { Colors } from '../../constants/styles';

function ChapterOverview({id,progress,title}) {
const navigation= useNavigation()
  return (
    <Pressable style={({ pressed }) => (pressed && styles.pressed)} 
    onPress={()=>{
      navigation.navigate('Chapter',{
        chapterId:id
      })
    }}>
      <View style={styles.chapterOverview}>
        <Text style={styles.chapterTitle}>{title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Overall Progress {progress}%</Text>
          <Bar width={null} progress={progress/100} height={9} />
        </View>
      </View>
    </Pressable>
  )
}

export default ChapterOverview

const styles = StyleSheet.create({
  chapterOverview: {
    backgroundColor: Colors.primary800,
    borderRadius: 10,
    padding: 11,
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 12
  },
  chapterTitle: {
    fontFamily: 'source-sans-semi',
    fontSize: 18
  },
  progressContainer: {
    width: '100%',
  },
  progressText: {
    fontFamily: 'source-sans-light',
    fontSize: 13
  },
  pressed: {
    opacity: 0.7,
  },
})