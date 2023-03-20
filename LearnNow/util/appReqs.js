import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BACKEND_URL = 'https://learnnow-3db1b-default-rtdb.firebaseio.com'
export async function getChapters() {
    try {
        const authToken = AsyncStorage.getItem('token')
        const response = await axios.get(BACKEND_URL + '/chapters.json?' + '?auth=' + authToken)

        //Transforming the data from firebase, i regret using firebase :(
        const chaptersData = []
        for (const key in response.data) {
            const chapterObj = {
                id: key,
                title: response.data[key].title,
                sections: response.data[key].sections,
                progress: response.data[key].progress,
            }
            chaptersData.push(chapterObj);
        }
        return chaptersData
    } catch (error) {
        throw new Error('Error in getting chapters')
    }
}
export async function updateChapter( updatedChapter,chapterId) {
    try {
        const authToken = AsyncStorage.getItem('token')
        await axios.put(BACKEND_URL + '/chapters/' + `${chapterId}.json?` + '?auth=' + authToken, updatedChapter)
    } catch (error) {
        throw new Error('Error in updating chapter')
    }
}





