import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ChapterOverview from '../components/ui/ChapterOverview';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AppContext } from '../store/app-context';


function Home() {
  const [initalScrollOffSetY, setInitialScrollOffsetY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { chapters } = useContext(AppContext)
  useLayoutEffect(() => {
    const fetchScrollOffsetY = async () => {
      try {
        const fetchedScrollOffsetY = await AsyncStorage.getItem(`${route.key}`);
        const state = fetchedScrollOffsetY ? JSON.parse(fetchedScrollOffsetY) : undefined;
        if (state !== undefined) {
          setInitialScrollOffsetY(state)
        }
      } catch (error) {
        return <ErrorOverlay message={error.message} />
      } finally {
        setIsLoading(false)
      }
    }
    fetchScrollOffsetY()
  }, [])
  function handleScroll(e) {
    AsyncStorage.setItem(`${route.key}`, JSON.stringify(e.nativeEvent.contentOffset.y))
  }
  if (isLoading) {
    return <LoadingOverlay/>
  }
  return (
    <View style={styles.rootContainer}>
      <ScrollView
        onMomentumScrollEnd={handleScroll}
        contentOffset={{ y: initalScrollOffSetY }}
      >
        <Text style={styles.headers}>Learning Progress</Text>
        {chapters?.map((item) => (
          <View key={item.id}>
            <ChapterOverview id={item.id} progress={item.progress} title={item.title} />
          </View>
        ))}
      </ScrollView>
    </View>

    // <View style={styles.rootContainer}>
    //   <Text style={styles.headers}>Learning Progress</Text>
    //   <FlatList
    //   data={chapters}
    //   renderItem={({item})=> (
    //     <ChapterOverview id={item.id} progress={item.progress} title={item.title}/>
    //   )}
    //   keyExtractor={(item)=>item.id}
    // />

    // </View>
  )
}

export default Home


const styles = StyleSheet.create({
  rootContainer: {
    padding: 10,

  },
  headers: {
    fontFamily: 'source-sans-bold',
    fontSize: 22,
    marginBottom: 18
  },

});