import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import axios from "react-native-axios";

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);

    const handleClear = () => {
        Keyboard.dismiss();
        inputRef.current.clear();
    };

    const [data, setData] = useState([]);
    const [isAppending, setIsAppending] = useState(false);

    const getProducts = (
        limit = 10,
        skip = 0,
        onSuccess = (value) => { console.log(value); },
        onFailure = (err) => { console.error(err); },
    ) => {
        console.log('GET Products');
        axios.get('https://dummyjson.com/products', {
            params: {
                limit: limit,
                skip: skip,
            }
        })
            .then((resp) => {
                onSuccess(resp?.data?.products);
            })
            .catch((err) => {
                onFailure(err);
            });
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={.75} onPress={() => handleSelect(item)} style={styles.item}>
            <Image
                style={styles.thumbnail}
                source={{ uri: item.thumbnail }}
            />
            <View style={styles.itemDescriptorsContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.itemDescriptorsRow}>
                    <Text style={styles.price}>{item.price}$</Text>
                    <Text style={styles.discountPercentage}>{item.discountPercentage}% Off</Text>
                </View>
                <View style={styles.itemDescriptorsRow}>
                    <Text style={styles.rating}>&#11088; {item.rating}</Text>
                    <Text style={styles.stock}>{item.stock > 0 ? `${item.stock} items remaining.` : "No Stock Available."}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const handleEndReached = () => {
        setIsAppending(true);
        getProducts(
            limit = 10,
            skip = data.length,
            onSuccess = (value) => {
                setData([...data, ...value]);
                setIsAppending(false);
            },
            onFailure = (err) => {
                console.error(err);
                setIsAppending(false);
            },
        );
    };

    useEffect(() => {
        getProducts(
            limit = 10,
            skip = 0,
            onSuccess = (value) => { setData(value) }
        );
    }, [])


    return (
        <View style={styles.root}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                style={styles.list}
                keyboardShouldPersistTaps={'always'}
                ItemSeparatorComponent={<View height={16} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.searchBar}>
                        <TextInput
                            ref={inputRef}
                            onChangeText={setSearchTerm}
                            value={searchTerm}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                            <Text style={styles.clear}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                }
                ListFooterComponent={() => {
                    return (
                        <View style={styles.listFooter}>
                            {isAppending && (
                                <ActivityIndicator size={"large"} style={styles.activityIndicator} />
                            )}
                        </View>
                    );
                }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },

    searchBar: {
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    input: { flex: 0.8 },
    clearButton: {
        alignItems: 'flex-end',
        flex: 0.2,
    },
    clear: {
        color: '#ce261c',
        fontSize: 14,
        fontWeight: "600",
    },

    list: {
        marginTop: 24,
    },
    item: {
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#F0F0F0',
    },
    thumbnail: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        width: '100%',
        aspectRatio: 2,
    },
    itemDescriptorsContainer: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
    },
    description: {
        color: '#0F0F0F',
        fontSize: 16,
    },
    itemDescriptorsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        color: '#118c4f',
        fontSize: 16,
        fontWeight: "600",
        marginTop: 12,
    },
    discountPercentage: {
        color: '#912292',
        fontSize: 16,
        fontWeight: "600",
        marginTop: 12,
    },
    rating: {
        color: '#F8D00F',
        fontSize: 16,
        fontWeight: "600",
        marginTop: 12,
    },
    stock: {
        color: '#000',
        fontSize: 16,
        fontWeight: "600",
        marginTop: 12,
    },

    listFooter: {
        minHeight: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    activityIndicator: { padding: 20, }

});

export default ProductSearch