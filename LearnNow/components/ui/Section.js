import { Image, StyleSheet, Text, View } from "react-native"
import Checkbox from 'expo-checkbox'
import { Colors } from "../../constants/styles"


function Section({ title, image, description,handleCheckBoxChange,id,isCompleted}) {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View  style={styles.checkBox}>
                    <Text style={{ fontFamily: 'source-sans-light', fontSize: 12, marginBottom: 3 }}>Completed?</Text>
                    <Checkbox color={Colors.primary500} value={isCompleted} onValueChange={()=> handleCheckBoxChange(id)}/>
                </View>
            </View>
            <Image style={styles.sectionImage} source={{
                uri: `${image}`,
            }} />
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

export default Section

const styles = StyleSheet.create({
    sectionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        postion: 'relative',
        paddingVertical: 14,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    sectionContainer: {
        width: "100%",
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginTop: 20
    },
    checkBox: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0
    },
    sectionTitle: {
        fontFamily: 'source-sans-semi',
        fontSize: 18,
        width: '85%',
    },
    sectionImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 5
    },
    description: {
        marginTop: 18,
        fontFamily: 'source-sans',
        fontSize: 14,
    }

})