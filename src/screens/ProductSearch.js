import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProductSearch = () => {
    return (
        <View style={styles.root}>
            <Text>Product Search</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: "space-between",
        padding: 20,
    },
});

export default ProductSearch