import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pallet } from '../../config/pallet';
import { PineTreeSVG } from '../../assets/svg';
import Typography from '../../components/Typography';
import { fonts } from '../../config/constants';

function WalkThroughScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nameWrapper}>
          <PineTreeSVG />
          <Typography style={styles.name} level={'headlineSmall'}>
            Tribe
          </Typography>
        </View>

        <Pressable style={styles.button}>
          <Typography style={styles.buttonText} level="button">
            Skip
          </Typography>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallet.background,
  },

  name: { fontWeight: '900', color: pallet.primary },

  nameWrapper: { flexDirection: 'row', alignItems: 'center', columnGap: 4 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  buttonText: {
    color: pallet.variant.neutral['600'],
    fontFamily: fonts.literata.regular,
  },
});

export default WalkThroughScreen;
