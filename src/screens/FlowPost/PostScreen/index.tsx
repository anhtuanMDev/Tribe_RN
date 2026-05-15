import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { pallet } from '../../../config/pallet';
import {
  Typography,
  Button,
  TextInput,
  Icon,
  TextArea,
  KeyboardAwareView,
  Chip,
} from '../../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useActivityTypes } from '../hooks/useActivityTypes';

const PostScreen = () => {
  const { data: activityTypes } = useActivityTypes();
  return (
    <KeyboardAwareView style={[styles.container]}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Typography level="headlineSmall">Plan Activity</Typography>

        <Button level="primary" title="Post" />
      </SafeAreaView>

      <View style={styles.activityTitle}>
        <Icon name="flower" size={24} color={pallet.primary} />
        <Typography level="bodyMedium">Create your next adventure</Typography>
      </View>

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
        <TextArea
          minLines={4}
          maxLines={12}
          placeholder={`Looking for 3 people to join me for a moderate 5-mile hike...`}
        />
      </View>

      <View style={[styles.textBlock, styles.activityWrapper]}>
        <View style={styles.activityType}>
          <Icon name="hike" size={24} />
          <Typography style={styles.inputLabel} level="labelLarge">
            Activity Type
          </Typography>
        </View>

        <View style={styles.activitySection}>
          {activityTypes?.map(activity => (
            <Chip key={activity.id} title={activity.name} selected={false} />
          ))}
        </View>
      </View>

      <View style={[styles.textBlock, styles.activityWrapper]}>
        <View style={styles.activityType}>
          <Icon name="people" size={20} color={pallet.primary} />
          <Typography style={styles.inputLabel} level="labelLarge">
            Participants needed
          </Typography>
        </View>

        <View style={styles.activitySection}>
          {activityTypes?.map(activity => (
            <Chip key={activity.id} title={activity.name} selected={false} />
          ))}
        </View>
      </View>
    </KeyboardAwareView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallet.background,
    flex: 1,
    paddingBottom: 50,
  },

  activityTitle: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 17,
    backgroundColor: pallet.variant.neutral['0'],
  },

  textBlock: {
    rowGap: 8,
    marginTop: 24,
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

  activityWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: pallet.variant.secondary['100'],
    borderRadius: 16,
  },

  activityType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  activitySection: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});
