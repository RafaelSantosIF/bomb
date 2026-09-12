import AllLists, { NewListType } from "@/src/components/AllLists";
import NewList from "@/src/components/NewList";
import { colors, spacing } from "@/src/constants/theme";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { consumeListUpdate } from "../../hooks/listUpdates";

const initialLists: NewListType[] = [];

export default function ListLib() {
    const [lists, setLists] = useState<NewListType[]>(initialLists);
    const [newListActive, setNewListActive] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const update = consumeListUpdate();

            if (update) {
                setLists(currentLists =>
                    currentLists.map(list =>
                        list.id === update.listId
                            ? { ...list, values: update.values }
                            : list
                    )
                );
            }
        }, [])
    );

    function addList(name: string) {
        setLists(currentLists => [
            ...currentLists,
            {
                id: `${Date.now()}`,
                name,
                completed: false,
                values: [],
            },
        ]);
    }

    if (lists.length === 0) {
       return (        
        <>
            <Pressable
                style={styles.container}
                onPress={() => setNewListActive(false)}
            >
                <Text style={styles.sectionRotule}>MINHAS LISTAS</Text>
                <View style={styles.container2}>
                    <Image source={require('../../../assets/images/list-icon.png')} style={styles.image} />
                    <Text style={styles.title2}>Nenhuma Lista encontrada</Text>
                    <Text style={styles.text}>Clique no botão abaixo para criar sua primeira lista</Text>
                </View>
            </Pressable>
            <NewList
                active={newListActive}
                onActivate={() => setNewListActive(true)}
                onDeactivate={() => setNewListActive(false)}
                onAdd={addList}
            />
        </>
        )      
    }
    
    return (        
        <>
            <Pressable
                style={styles.container}
                onPress={() => setNewListActive(false)}
            >
                <Text style={styles.sectionRotule}>MINHAS LISTAS</Text>

                <AllLists
                    lists={lists}
                    onToggle={() => {}}
                    onOpen={(list) => {
                        router.push({
                            pathname: "/buyList",
                            params: {
                                listId: list.id,
                                listTitle: list.name,
                                list: JSON.stringify(list.values),
                            },
                        });
                    }}
                    onRemove={(id) => {
                        setLists(currentLists =>
                        currentLists.filter(list => list.id !== id)
                        );
                    }}
                />                
            </Pressable>

            <NewList
                active={newListActive}
                onActivate={() => setNewListActive(true)}
                onDeactivate={() => setNewListActive(false)}
                onAdd={addList}
            />
        </>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",    
        backgroundColor: colors.bg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        paddingBottom: 102,
        width: '100%',    
        position: 'relative',    
    },
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        width: '95%',  
        alignSelf: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.bg,
        marginBottom: 60,
    },
    title: {
        fontSize: 31,
        fontWeight: 700,
        color: colors.text,
        marginBottom: spacing.md
    },
    sectionRotule: {
        fontSize: 14,
        fontWeight: 400,
        color: colors.acc,
        fontFamily: 'monospace',
    },
    title2: {
        fontSize: 25,
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.sm
    },
    text: {
        fontSize: 17,
        fontWeight: 400,
        color: colors.text2,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: spacing.sm
    },
    
})