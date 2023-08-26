import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);

    const handleClear = () => {
        inputRef.current.clear();
    };

    return (
        <View style={styles.root}>
            <View style={styles.searchBar}>
                <TextInput
                    ref={inputRef}
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <Text>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: "space-between",
        padding: 20,
    },

    searchBar: {
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    input: { flex: 0.8 },
    clearButton: {
        alignItems: 'flex-end',
        flex: 0.2,
    },
});

export default ProductSearch