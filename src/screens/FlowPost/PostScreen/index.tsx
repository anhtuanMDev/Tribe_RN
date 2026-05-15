import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { pallet } from '../../../config/pallet';
import { Typography, Button, TextInput } from '../../../components';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostScreen = () => {
  return (
    <View style={[styles.container]}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Typography level="headlineSmall">Create Activity</Typography>

        <Button level="primary" title="Post" />
      </SafeAreaView>

      <View style={styles.textBlock}>
        <Typography style={styles.inputLabel} level="labelLarge">
          Activity Title
        </Typography>
        <TextInput placeholder={`What's next?`} />
      </View>

      <View style={styles.textBlock}>
        <Typography style={styles.inputLabel} level="labelLarge">
          Description
        </Typography>
        <TextInput
          style={styles.textArea}
          placeholder={`Looking for 3 people to join me for a moderate 5-mile hike...`}
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallet.background,
    rowGap: 24,
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 17,
    backgroundColor: pallet.variant.neutral['0'],
  },

  textBlock: {
    paddingHorizontal: 16,
    rowGap: 8,
    marginHorizontal: 16,
  },

  inputLabel: {
    color: pallet.primary,
  },

  textArea: {
    height: 140,
    textAlignVertical: 'top',
    paddingVertical: 16,
  },
});
