import { ScrollView, StyleSheet, View } from "react-native"
import Section from "../components/ui/Section"
import { useContext, useLayoutEffect, useState } from "react"
import { AppContext } from "../store/app-context"
import { updateChapter } from "../util/appReqs"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import ErrorOverlay from "../components/ui/ErrorOverlay"
function Chapter({ route, navigation }) {
    const [initalScrollOffSetY, setInitialScrollOffsetY] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { chapterId } = route.params
    const appCtx = useContext(AppContext)
    const chapters = appCtx.chapters
    const chapter = chapters.find((chapter) => (chapter.id === chapterId))
    useLayoutEffect(() => {
        navigation.setOptions({
            title: chapter.title,
            headerTitleStyle: {
                fontFamily: 'source-sans-semi',
                fontSize: 18
            }
        })
    }, [chapterId, navigation])
    useLayoutEffect(() => {
        const fetchScrollOffsetY = async () => {
            try {
                const fetchedScrollOffsetY = await AsyncStorage.getItem(`${route.key}`);
                const state = fetchedScrollOffsetY ? JSON.parse(fetchedScrollOffsetY) : undefined;
                if (state !== undefined) {
                    setInitialScrollOffsetY(state)
                }
                setIsLoading(false)
            } catch (error) {
                return <ErrorOverlay message={error.message} />
            }
        }
        fetchScrollOffsetY()
    }, [])
    if (isLoading) {
        return <LoadingOverlay />
    }
    const handleCheckBoxChange = ((sectionId) => {
        numOfCompleted = 0
        let updatedSection = chapter.sections.map((section) => {
            if (section.id === sectionId) {
                if (!section.isCompleted) {
                    numOfCompleted += 1
                }
                return { ...section, isCompleted: !section.isCompleted }
            } else {
                if (section.isCompleted) {
                    numOfCompleted += 1
                }
                return section
            }
        })
        chapter.sections = updatedSection
        chapter.progress = Math.round((numOfCompleted / chapter.sections.length) * 100)
        appCtx.updateChapter(chapter, chapterId)
        updateChapter(chapter, chapterId)
    })
    function handleScroll(e) {
        AsyncStorage.setItem(`${route.key}`, JSON.stringify(e.nativeEvent.contentOffset.y))
    }

    return (
        <ScrollView
            onMomentumScrollEnd={handleScroll}
            contentOffset={{ y: initalScrollOffSetY }}
        >
            {chapter?.sections?.map((item) => (
                <View key={item.id}>
                    <Section id={item.id} isCompleted={item.isCompleted} title={item.title} image={item.image} description={item.description} handleCheckBoxChange={handleCheckBoxChange} />
                </View>
            ))}
        </ScrollView>
    )
}

export default Chapter

const styles = StyleSheet.create({

})