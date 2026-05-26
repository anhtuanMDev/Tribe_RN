import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput as NativeTextInput,
  View,
  Pressable,
} from 'react-native';
import {
  Avatar,
  KeyboardAwareView,
  TextArea,
  TextInput,
} from '../../../components';
import { pallet } from '../../../config/pallet';
import { useActivityTypes } from '../hooks/useActivityTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { fonts } from '../../../config/constants';
import { useValue } from '@legendapp/state/react';
import { appStore } from '../../../store';
import Animated, { SlideInDown } from 'react-native-reanimated';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data: activityTypes } = useActivityTypes();
  const inputRef = useRef<NativeTextInput>(null);

  const user = useValue(appStore.user);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
        <Text style={styles.title}>Create post</Text>
        <Pressable style={[styles.postBtn]}>
          <Text style={styles.postBtnText}>Post</Text>
        </Pressable>
      </View>

      <KeyboardAwareView style={[styles.container]}>
        <View style={styles.content}>
          <View style={styles.authorRow}>
            <Avatar uri={user?.avatar} size={44} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{user?.username}</Text>
            </View>
          </View>

          <TextInput
            ref={inputRef}
            style={[styles.input]}
            placeholder={'What is the name of your plan?'}
            multiline
            maxLength={63206}
            textAlignVertical="top"
          />

          <TextArea label="Tell us more about it!" style={[styles.input]} />
        </View>
      </KeyboardAwareView>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: pallet.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: pallet.variant.neutral['100'],
  },
  closeBtn: { padding: 16 },
  closeBtnText: { fontSize: 18, color: pallet.primary },
  title: { fontSize: 22, fontFamily: fonts.literata.semiBold },
  postBtn: {
    backgroundColor: pallet.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  postBtnDisabled: {
    backgroundColor: pallet.variant.neutral['100'],
  },
  postBtnText: {
    color: pallet.variant.neutral['0'],
    fontFamily: fonts.nunito.regular,
    fontSize: 16,
  },
  scroll: { flex: 1 },
  content: { gap: 16 },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 16,
  },
  authorInfo: { flex: 1 },
  authorName: {
    fontSize: 20,
    fontWeight: 700,
    color: pallet.variant.neutral['900'],
  },
  privacyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: pallet.variant.neutral['100'],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  privacyBtnText: {
    fontSize: 14,
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['900'],
  },
  inputArea: { paddingHorizontal: 12 },
  input: {
    marginHorizontal: 12,
  },
  inputBg: {
    color: pallet.variant.neutral['900'],
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.nunito.bold,
  },
  feelingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    backgroundColor: pallet.variant.primary['50'],
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  feelingTagText: {
    fontSize: 16,
    fontFamily: fonts.nunito.regular,
    color: pallet.primary,
  },
  feelingTagRemove: {
    fontSize: 14,
    fontFamily: fonts.nunito.bold,
    color: pallet.primary,
  },
  mediaPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
  },
  mediaThumb: { position: 'relative', width: 80, height: 80 },
  mediaThumbImg: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeMedia: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: pallet.variant.neutral['500'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeMediaText: {
    color: pallet.variant.neutral['0'],
    fontSize: 10,
    fontFamily: fonts.nunito.bold,
  },
  addMoreMedia: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: pallet.variant.neutral['0'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: pallet.variant.neutral['100'],
    borderStyle: 'dashed',
  },
  addMoreMediaText: {
    fontSize: 28,
    color: pallet.variant.neutral['900'],
  },
  bgColorRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  bgColorBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgColorBtnNull: {
    borderWidth: 2,
    borderColor: pallet.variant.neutral['100'],
  },
  bgColorBtnActive: { borderWidth: 3, borderColor: pallet.primary },
  bgColorBtnNullText: {
    fontSize: 12,
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['500'],
  },
  feelingsPanel: {
    padding: 12,
    backgroundColor: pallet.variant.neutral['0'],
    borderTopWidth: 1,
    borderTopColor: pallet.variant.neutral['100'],
  },
  feelingsPanelTitle: {
    fontSize: 16,
    fontFamily: fonts.nunito.bold,
    marginBottom: 12,
  },
  feelingsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  feelingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: pallet.background,
  },
  feelingBtnActive: { backgroundColor: pallet.variant.primary['50'] },
  feelingEmoji: { fontSize: 18 },
  feelingLabel: {
    fontSize: 14,
    fontFamily: fonts.nunito.regular,
    color: pallet.variant.neutral['900'],
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: pallet.variant.neutral['0'],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: pallet.variant.neutral['100'],
    padding: 12,
  },
  actionBarLabel: {
    fontSize: 14,
    fontFamily: fonts.nunito.regular,
    color: pallet.variant.neutral['500'],
    marginBottom: 8,
  },
  actionBtns: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: pallet.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnIcon: { fontSize: 20 },
});
