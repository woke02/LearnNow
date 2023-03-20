import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { getChapters } from '../util/appReqs';

export const AppContext = createContext({
  chapters: []
});

function AppContextProvider({ children }) {
  const [chapters, setChapters] = useState()
  const [isFetching, setIsFetching] = useState(true)
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isLoading, setIsLoading] = useState(true)
  async function updateChapters(chapters) {
    setChapters(chapters)
    await AsyncStorage.setItem('chapters', JSON.stringify(chapters))
  }
  async function updateChapter(updatedChapter, chapterId) {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        return { ...updatedChapter }
      }
      return chapter
    })
    setChapters(updatedChapters)
    await AsyncStorage.setItem('chapters', JSON.stringify(updatedChapters))
  }
  useLayoutEffect(() => {
    async function fetchChapters() {
      try {
        const fetchedChapters = await AsyncStorage.getItem('chapters')
        const chapters = fetchedChapters ? JSON.parse(fetchedChapters) : undefined;
        //If chapters not in async storage, means chapters are getting fetched for the first time, proceed to fetch from database
        if (chapters === undefined) {
          const fetchedChapters = await getChapters()
          await updateChapters(fetchedChapters)
        } else {
          setChapters(chapters)
        }
        setIsFetching(false)
      } catch (error) {
        <ErrorOverlay message={error.message}/>
      }
    }
    fetchChapters()
  }, [])
  
  useEffect(() => {
    const loadNavigationState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem('navigationState');
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        setInitialNavigationState(state);
      } catch (error) {
        <ErrorOverlay message={error.message}/>
      } finally {
        setIsLoading(false);
      }
    };
    loadNavigationState();
  }, []);
  if (isLoading || isFetching) {
    return (<LoadingOverlay/>)
  }
  const value = {
    chapters: chapters,
    updateChapters: updateChapters,
    updateChapter: updateChapter,
    initialNavigationState: initialNavigationState,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;